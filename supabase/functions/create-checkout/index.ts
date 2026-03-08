import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting - check before any expensive operations
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("x-real-ip") ||
               "unknown";

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase credentials for rate limiting");
      return new Response(JSON.stringify({ error: "Configuration error" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Count requests from this IP in the last 60 minutes
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", oneHourAgo);

    if (countError) {
      console.error("Rate limit check error:", countError);
      // Continue anyway - don't block legitimate users due to DB issues
    } else if (count !== null && count >= 5) {
      console.warn(`Rate limit exceeded for IP: ${ip} (${count} requests in last hour)`);
      return new Response(JSON.stringify({
        error: "Too many requests. Please try again later.",
        retry_after: 3600
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": "3600"
        },
        status: 429,
      });
    }

    // Log this request
    const { error: insertError } = await supabase
      .from("rate_limits")
      .insert({ ip });

    if (insertError) {
      console.error("Failed to log rate limit:", insertError);
      // Continue anyway - logging failure shouldn't block the request
    }

    // Rate limiting passed - continue with normal flow
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")?.trim();

    if (!stripeKey) {
      return new Response(JSON.stringify({ error: "Stripe key not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const { email, name, company, description, tone } = await req.json();

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Split description into chunks (Stripe metadata limit is 500 chars per value)
    const chunkSize = 490;
    const metadata: Record<string, string> = {
      name: name || "",
      company: company || "",
      tone: tone || "firm",
    };

    // Split description into multiple fields if needed
    if (description && description.length > chunkSize) {
      const chunks = Math.ceil(description.length / chunkSize);
      for (let i = 0; i < chunks; i++) {
        const chunk = description.slice(i * chunkSize, (i + 1) * chunkSize);
        metadata[`description_${i}`] = chunk;
      }
      metadata.description_chunks = chunks.toString();
    } else {
      metadata.description = description || "";
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: "price_1T7w2IPt9nNFZaKHsb5S6GUv", quantity: 1 }],
      mode: "payment",
      success_url: `https://www.complaintdone.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://www.complaintdone.com/complaint`,
      customer_email: email,
      metadata,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
