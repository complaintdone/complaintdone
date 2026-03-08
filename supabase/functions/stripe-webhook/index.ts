import Stripe from "https://esm.sh/stripe@14.21.0";

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

    console.log("[webhook] Received request");

    // Verify Stripe signature
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("[webhook] No stripe-signature header");
      return new Response(JSON.stringify({ error: "No signature" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    const body = await req.text();

    let event;
    try {
      const stripe = new Stripe(stripeKey || "", {
        apiVersion: "2023-10-16",
      });
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret || "");
      console.log("[webhook] Signature verified, event type:", event.type);
    } catch (err) {
      console.error("[webhook] Signature verification failed:", err.message);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata;
      const email = session.customer_email;

      console.log("[webhook] Processing payment for:", email);

      // Reassemble description if it was split into chunks
      let description = metadata.description || "";
      if (metadata.description_chunks) {
        const chunks = parseInt(metadata.description_chunks);
        const parts: string[] = [];
        for (let i = 0; i < chunks; i++) {
          parts.push(metadata[`description_${i}`] || "");
        }
        description = parts.join("");
      }

      const { name, company, tone } = metadata;

      // Step 1: Generate complaint letter
      console.log("[webhook] Calling generate-complaint...");
      const generateRes = await fetch(`${supabaseUrl}/functions/v1/generate-complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ name, company, description, tone }),
      });

      if (!generateRes.ok) {
        const errorData = await generateRes.text();
        console.error("[webhook] generate-complaint failed:", generateRes.status, errorData);
        throw new Error(`generate-complaint failed: ${errorData}`);
      }

      const generateData = await generateRes.json();
      const { letter } = generateData;

      if (!letter) {
        console.error("[webhook] No letter in response:", generateData);
        throw new Error("No letter generated");
      }

      console.log("[webhook] Letter generated successfully, length:", letter.length);

      // Step 2: Send email
      console.log("[webhook] Calling send-email...");
      const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ email, name, letter }),
      });

      if (!emailRes.ok) {
        const errorData = await emailRes.text();
        console.error("[webhook] send-email failed:", emailRes.status, errorData);
        throw new Error(`send-email failed: ${errorData}`);
      }

      const emailData = await emailRes.json();
      console.log("[webhook] Email sent successfully, id:", emailData.id);

      return new Response(JSON.stringify({
        received: true,
        processed: true,
        email_id: emailData.id
      }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    console.log("[webhook] Event type not handled, returning received");
    return new Response(JSON.stringify({ received: true, processed: false }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("[webhook] Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
