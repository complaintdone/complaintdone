// ✅ SECURITY: No CORS headers - internal function only (called by stripe-webhook)
const corsHeaders = {
  "Access-Control-Allow-Origin": "",  // Internal only - no browser access
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ✅ SECURITY: HTML escape function to prevent XSS (defense-in-depth)
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resendKey = Deno.env.get("RESEND_API_KEY")?.trim();

    if (!resendKey) {
      return new Response(JSON.stringify({ error: "Resend key not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const { email, name, letter } = await req.json();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "ComplaintDone <noreply@complaintdone.com>",
        to: email,
        subject: "Your Complaint Letter is Ready",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1B3A5C;">Your complaint letter is ready, ${escapeHtml(name || "there")}</h2>
            <p>Thank you for using ComplaintDone. Here is your professionally written complaint letter:</p>
            <div style="background: #f9f9f9; border-left: 4px solid #F97316; padding: 20px; margin: 20px 0; white-space: pre-wrap; font-family: Georgia, serif;">
              ${escapeHtml(letter).replace(/\n/g, "<br>")}
            </div>
            <p style="color: #6B7280; font-size: 14px;">Copy and paste this letter, or save it for your records.</p>
            <p style="color: #6B7280; font-size: 14px;">ComplaintDone — Professional complaint letters in seconds.</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Send email error:", error.message, error.stack);  // ✅ SECURITY: Log details server-side only
    return new Response(JSON.stringify({ error: "An error occurred while sending your complaint letter" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
