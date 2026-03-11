// supabase/functions/stripe-webhook/index.ts

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",  // ✅ SECURITY: Wildcard OK here - Stripe needs external access, protected by HMAC signature
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

// ✅ SECURITY: Mask email addresses in logs (GDPR compliance)
function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***';
  const [local, domain] = email.split('@');
  const maskedLocal = local.length <= 2 ? '**' : local.substring(0, 2) + '***';
  return `${maskedLocal}@${domain}`;
}

// Native HMAC-SHA256 verification using Deno's built-in crypto.subtle
// No imports needed - avoids EarlyDrop crashes from Stripe SDK
async function verifyStripeSignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const elements = signature.split(",");
  const timestampEl = elements.find((e) => e.startsWith("t="));
  const sigEl = elements.find((e) => e.startsWith("v1="));

  if (!timestampEl || !sigEl) return false;

  const timestamp = timestampEl.split("=")[1];
  const receivedSig = sigEl.split("=")[1];

  // Replay attack prevention: reject if > 5 minutes old
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - parseInt(timestamp) > 300) {
    console.error("Webhook timestamp too old - possible replay attack");
    return false;
  }

  const signedPayload = `${timestamp}.${body}`;

  // Import the secret as a CryptoKey
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Sign the payload
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signedPayload)
  );

  // Convert to hex string
  const expectedSig = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Timing-safe comparison (prevents timing attacks)
  if (expectedSig.length !== receivedSig.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    mismatch |= expectedSig.charCodeAt(i) ^ receivedSig.charCodeAt(i);
  }
  return mismatch === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    // Verify signature before doing anything else
    if (!signature || !webhookSecret) {
      console.error("Missing signature or webhook secret");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isValid = await verifyStripeSignature(body, signature, webhookSecret);
    if (!isValid) {
      console.error("Invalid Stripe signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Signature verified — safe to process
    const event = JSON.parse(body);
    console.log("Verified Stripe event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email;
      const metadata = session.metadata || {};

      // Reassemble chunked description from metadata
      let description = "";
      let i = 0;
      while (metadata[`description_${i}`]) {
        description += metadata[`description_${i}`];
        i++;
      }

      const name = metadata.name || "";
      const company = metadata.company || "";
      const tone = metadata.tone || "firm";
      const market = metadata.market || "uk";
      const outcome = metadata.outcome || null;

      console.log(`Processing complaint: ${company} for ${maskEmail(email)}`);

      // Call generate-complaint function
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

      const generateResponse = await fetch(
        `${supabaseUrl}/functions/v1/generate-complaint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ name, email, company, description, tone, market, outcome }),
        }
      );

      if (!generateResponse.ok) {
        const err = await generateResponse.text();
        console.error("generate-complaint failed:", err);
        throw new Error(`Letter generation failed: ${err}`);
      }

      const { letter } = await generateResponse.json();
      console.log("Letter generated successfully");

      // Call send-email function
      const emailResponse = await fetch(
        `${supabaseUrl}/functions/v1/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ name, email, company, letter }),
        }
      );

      if (!emailResponse.ok) {
        const err = await emailResponse.text();
        console.error("send-email failed:", err);
        throw new Error(`Email delivery failed: ${err}`);
      }

      console.log(`Email sent successfully to ${maskEmail(email)}`);

      // Log to complaints table (no PII - just metadata for analytics)
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error: insertError } = await supabase
          .from("complaints")
          .insert({
            company,
            market,
            tone,
            outcome,
            status: "delivered"
          });

        if (insertError) {
          console.error("Failed to log complaint:", insertError);
          // Don't throw - logging failure shouldn't break the webhook
        } else {
          console.log("Complaint logged to database");
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error.message, error.stack);  // ✅ SECURITY: Log details server-side only
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), {  // ✅ SECURITY: Generic error message
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
