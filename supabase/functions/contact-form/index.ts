import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.complaintdone.com",  // ✅ SECURITY: Restricted to production domain only
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting - 3 submissions per IP per hour
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
    } else if (count !== null && count >= 3) {
      console.warn(`Contact form rate limit exceeded for IP: ${ip} (${count} requests in last hour)`);
      return new Response(JSON.stringify({
        error: "Too many contact form submissions. Please try again later.",
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

    // Rate limiting passed - process contact form
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return new Response(JSON.stringify({ error: "Email and message are required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY")?.trim();

    if (!resendKey) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "contact@complaintdone.com",
        to: "support@complaintdone.com",
        subject: `ComplaintDone Contact Form — ${name || "Anonymous"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Sent from complaintdone.com contact form</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error("Failed to send email");
    }

    console.log(`Contact form email sent from ${email}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Contact form error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
