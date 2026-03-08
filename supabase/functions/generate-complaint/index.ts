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
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY")?.trim();

    if (!anthropicKey) {
      return new Response(JSON.stringify({ error: "Anthropic key not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const { name, company, description, tone, outcome, market } = await req.json();

    // Build market-aware legal references
    const legalReferences = market === "usa"
      ? "I am aware of my rights under federal consumer protection laws and may escalate this matter to the Federal Trade Commission (FTC), Consumer Financial Protection Bureau (CFPB), or Better Business Bureau (BBB) if necessary."
      : "I am aware of my rights under the Consumer Rights Act 2015 and may escalate this matter to the Financial Ombudsman Service, Trading Standards, or relevant regulatory body if necessary.";

    // Build outcome statement if provided
    const outcomeMap: Record<string, string> = {
      full_refund: "a full refund",
      partial_refund: "a partial refund",
      written_apology: "a written apology",
      account_credit: "account credit",
      formal_investigation: "a formal investigation into this matter",
      other: "a resolution"
    };
    const outcomeStatement = outcome && outcomeMap[outcome]
      ? `I am seeking ${outcomeMap[outcome]}.`
      : "";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Write a professional complaint letter on behalf of ${name} to ${company}.
Tone: ${tone}.
Details: ${description}.
${outcomeStatement ? `Desired outcome: ${outcomeStatement}` : ""}
Format it as a proper letter with date, greeting, body paragraphs, and sign-off.
Include this legal reference in the final paragraph: "${legalReferences}"
Sign it from ${name}.`,
          },
        ],
      }),
    });

    const data = await response.json();
    const letter = data.content[0].text;

    return new Response(JSON.stringify({ letter }), {
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
