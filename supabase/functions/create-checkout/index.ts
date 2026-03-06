import Stripe from "https://esm.sh/stripe@14.21.0";

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
