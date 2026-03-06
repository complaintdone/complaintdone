Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    console.log("[webhook] Received request");

    const body = await req.text();
    const event = JSON.parse(body);

    console.log("[webhook] Event type:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { name, company, description, tone } = session.metadata;
      const email = session.customer_email;

      console.log("[webhook] Processing payment for:", email);

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
