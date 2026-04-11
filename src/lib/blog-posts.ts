export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  publishedAt: string;
  readingTime: string;
  sections: { heading: string; body: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-write-a-complaint-letter-uk",
    title: "How to Write a Complaint Letter That Gets Results (UK Guide 2026)",
    description: "Learn how to write an effective formal complaint letter in the UK. Covers structure, legal references, tone, and what to include to maximise your chances of a refund.",
    keywords: "how to write a complaint letter, complaint letter UK, formal complaint letter template, consumer rights UK 2026",
    publishedAt: "2026-04-11",
    readingTime: "5 min read",
    sections: [
      {
        heading: "Why a Written Complaint Letter Works Better Than a Phone Call",
        body: `Most people phone up when something goes wrong. That's understandable — it feels faster. But phone calls leave no paper trail. A company can deny the conversation happened, claim you said something different, or simply lose the record entirely.\n\nA formal written complaint letter is different. It creates a legal paper trail. It forces the company to respond in writing. It starts the 8-week clock before you can escalate to an ombudsman. And it signals to the company that you are serious — most people who complain in writing have done their homework.`,
      },
      {
        heading: "The Structure of an Effective Complaint Letter",
        body: `Every strong complaint letter follows the same structure:\n\n1. Your address and the date (top right or top left)\n2. The company's address (below yours, on the left)\n3. A clear subject line: "RE: FORMAL COMPLAINT – [brief description]" and your reference number\n4. Opening paragraph: state clearly what happened and when\n5. Middle paragraph: explain the impact and what you've already done to resolve it\n6. Closing paragraph: state what you want (refund, repair, apology, compensation) and your deadline\n7. Legal reference: quote the relevant law (Consumer Rights Act 2015 is the most commonly used)\n8. Sign off: "Yours faithfully" if you don't know the recipient's name`,
      },
      {
        heading: "What Tone to Use",
        body: `Firm, not angry. Polite, not apologetic.\n\nAngry letters often get dismissed or escalated to a specialist team that is trained to deflect them. Overly polite letters can result in a token gesture that doesn't address your actual loss.\n\nThe sweet spot is formal and businesslike. Phrases like "I am writing to formally notify you" and "I expect a response within 10 working days" carry authority without aggression.\n\nAvoid: "This is absolutely disgraceful, I want to speak to your manager immediately."\nPrefer: "I am seeking a full refund of £X. If not received by [date], I will escalate this matter."`,
      },
      {
        heading: "The Legal References That Actually Matter",
        body: `Including the right legal references tells the company you know your rights. Here are the three most useful for UK consumers:\n\n- **Consumer Rights Act 2015** — covers goods that are faulty, not as described, or unfit for purpose. Applies to most retail, energy, and telecoms complaints.\n- **Consumer Contracts Regulations 2013** — gives you 14 days to cancel most online purchases without needing a reason.\n- **Section 75 Consumer Credit Act** — if you paid over £100 by credit card, your card provider is jointly liable with the retailer.\n\nFor regulated industries: reference the Energy Ombudsman (energy), Communications Ombudsman (telecoms), or Financial Ombudsman Service (banking/insurance).`,
      },
      {
        heading: "What to Do If They Don't Respond",
        body: `If a company doesn't respond within 8 weeks of your formal complaint, you have the right to take your case to the relevant ombudsman — usually for free.\n\nFor most industries:\n- Energy: Energy Ombudsman (ombudsman-services.org/energy)\n- Telecoms: Communications Ombudsman (commsombudsman.org)\n- Banking: Financial Ombudsman Service (financial-ombudsman.org.uk)\n- Retail/general: Retail Ombudsman or the courts (small claims up to £10,000)\n\nFor amounts under £10,000, the small claims process in England and Wales is simple and doesn't require a lawyer.`,
      },
      {
        heading: "Save Time With ComplaintDone",
        body: `Writing a complaint letter from scratch takes 30–60 minutes, especially if you're trying to get the legal language right.\n\nComplaintDone generates a professionally formatted, legally-referenced complaint letter in under 60 seconds. You provide the details; we produce the letter. £3 for UK complaints, $5 for US.\n\nThe letter arrives in your inbox ready to send — or copy-paste into an email.`,
      },
    ],
  },
  {
    slug: "consumer-rights-act-2015-refund-guide",
    title: "Consumer Rights Act 2015: Your Complete Refund Guide",
    description: "Everything UK consumers need to know about getting refunds under the Consumer Rights Act 2015. Covers 30-day right to reject, repairs, replacements, and what companies can't legally refuse.",
    keywords: "Consumer Rights Act 2015, refund rights UK, 30 day return policy, faulty goods refund, statutory rights UK",
    publishedAt: "2026-04-11",
    readingTime: "6 min read",
    sections: [
      {
        heading: "What the Consumer Rights Act 2015 Actually Says",
        body: `The Consumer Rights Act 2015 (CRA) replaced a patchwork of older laws and is now the primary legislation protecting UK consumers who buy goods, services, or digital content.\n\nFor goods, the Act requires that items must be:\n- **Of satisfactory quality** (free from defects, durable, safe)\n- **Fit for purpose** (does what it's supposed to do)\n- **As described** (matches the description, sample, or model shown)\n\nIf any of these aren't met, you have rights — regardless of what the retailer's own returns policy says. The law overrides company policy.`,
      },
      {
        heading: "The 30-Day Right to Reject",
        body: `This is the most powerful right in the Act. Within the first 30 days of purchase, if a product is faulty, you can reject it and demand a full refund — no repair, no replacement, just your money back.\n\nThe retailer cannot:\n- Make you accept a repair instead\n- Reduce the refund because you used the item\n- Blame the manufacturer\n\nImportant: the 30-day clock starts from the day you receive the item, not the day you notice the fault.`,
      },
      {
        heading: "30 Days to 6 Months: Repair or Replace",
        body: `After 30 days but within 6 months of purchase, the retailer must first attempt a repair or replacement. If that fails (or they refuse), you're entitled to a refund — though they can make a small deduction for use.\n\nCrucially: the **burden of proof is reversed** in this period. The retailer must prove the fault wasn't present when sold. You don't have to prove it was.`,
      },
      {
        heading: "After 6 Months: Still Have Rights",
        body: `Many people don't realise: your rights don't expire at 6 months. Beyond 6 months, the burden shifts back to you — you need to show the fault was present at the time of sale (often via an independent report or by demonstrating it's a design fault common to that model).\n\nUnder the Limitation Act 1980, you can claim up to 6 years after purchase for goods that develop faults — a route that's especially relevant for expensive items like appliances and electronics.`,
      },
      {
        heading: "What Retailers Cannot Do",
        body: `Several tactics are common but illegal:\n\n- "You need to contact the manufacturer" — False. For goods under 6 months old, your contract is with the retailer, not the manufacturer. The retailer is responsible.\n- "We'll only issue a credit note, not a cash refund" — Not acceptable within the 30-day right to reject. You're entitled to a refund to the original payment method.\n- "Our policy is no returns after 28 days" — Company policy cannot override statutory rights. The CRA is the floor, not the ceiling.\n- Charging a restocking fee on faulty goods — illegal.`,
      },
      {
        heading: "How to Exercise Your Rights",
        body: `1. Write a formal complaint letter referencing the Consumer Rights Act 2015 and the specific right you're exercising (30-day right to reject, repair/replace, etc.)\n2. Send via email (keeps a timestamp) or recorded post\n3. Give a 14-day deadline for a response\n4. If ignored or refused, escalate to Trading Standards or the relevant ombudsman\n\nComplaintDone generates these letters in 60 seconds with the correct legal language already included.`,
      },
    ],
  },
  {
    slug: "how-to-escalate-complaint-to-ombudsman-uk",
    title: "How to Escalate a Complaint to the Ombudsman (UK Step-by-Step)",
    description: "Step-by-step guide to escalating an unresolved UK complaint to the correct ombudsman. Covers energy, telecoms, banking, and retail. Free process, no lawyer needed.",
    keywords: "how to escalate complaint UK, ombudsman complaint UK, energy ombudsman, communications ombudsman, financial ombudsman",
    publishedAt: "2026-04-11",
    readingTime: "5 min read",
    sections: [
      {
        heading: "What Is an Ombudsman and Why It's Free",
        body: `An ombudsman is an independent organisation that resolves disputes between consumers and businesses in a specific industry. They are free for consumers and legally binding for the companies involved.\n\nUnlike going to court, there are no fees, no lawyers required, and the process is designed to be straightforward. If the ombudsman rules in your favour, the company must comply.\n\nCompanies pay to fund the ombudsman schemes — not consumers. That's why they prefer to settle disputes before you get to this stage.`,
      },
      {
        heading: "When Can You Go to the Ombudsman?",
        body: `You can escalate to an ombudsman when either:\n\n1. **8 weeks have passed** since you made your formal complaint and the company hasn't resolved it, OR\n2. The company has issued a **deadlock letter** — a written response saying they've done all they're willing to do\n\nYou must have made a formal complaint first. An informal call or chat message doesn't count. You need a written record — a letter or email — with a date.`,
      },
      {
        heading: "Which Ombudsman to Contact",
        body: `Use the right ombudsman for your industry:\n\n- **Energy** (gas, electricity): Energy Ombudsman — ombudsman-services.org/energy\n- **Telecoms** (broadband, mobile, phone): Communications Ombudsman — commsombudsman.org\n- **Banking/insurance/mortgages**: Financial Ombudsman Service — financial-ombudsman.org.uk\n- **Postal services**: POSTRS (Postal Redress Service) — cedr.com/postrs\n- **Estate agents**: The Property Ombudsman — tpos.co.uk\n- **Retail** (general): Retail Ombudsman or Citizens Advice (for small claims guidance)\n\nIf you're unsure which scheme covers your complaint, Citizens Advice (citizensadvice.org.uk) can direct you.`,
      },
      {
        heading: "How to Submit Your Case",
        body: `Most ombudsman schemes have an online form. You'll need:\n\n- Your formal complaint letter (or email) with the date sent\n- Any response from the company\n- Evidence of the problem (bills, screenshots, photos of damage)\n- Your desired outcome\n\nBe specific. "I want a refund of £342.17" is stronger than "I want compensation." Ombudsmen can award refunds, compensation, and require companies to change their processes.`,
      },
      {
        heading: "What Happens Next",
        body: `After submission, the ombudsman will:\n1. Notify the company and ask for their side of the story\n2. Review both sides and make a preliminary decision\n3. Give both parties time to accept or reject it\n4. Issue a final decision — which is legally binding on the company if you accept it\n\nTimescales vary, but most cases are resolved within 3–6 months. Energy and telecoms cases are usually faster.\n\nIf the ombudsman rules against you, you still have the option to pursue through the courts.`,
      },
      {
        heading: "Start With a Strong Complaint Letter",
        body: `The stronger your initial complaint letter, the better your ombudsman case. Companies take you more seriously when you reference the correct law, set clear deadlines, and state your desired outcome precisely.\n\nComplaintDone generates professional complaint letters in 60 seconds — with legal references and a firm tone — for £3 (UK). Most people who use a properly worded letter get a resolution before they ever need an ombudsman.`,
      },
    ],
  },
  {
    slug: "british-gas-complaint-guide-2026",
    title: "How to Complain to British Gas and Get Results (2026 Guide)",
    description: "Complete guide to making an effective complaint to British Gas. Covers billing errors, smart meter issues, refunds, and how to escalate to the Energy Ombudsman.",
    keywords: "British Gas complaint, British Gas complaint letter, British Gas refund, British Gas billing error, energy ombudsman British Gas",
    publishedAt: "2026-04-11",
    readingTime: "5 min read",
    sections: [
      {
        heading: "The Most Common British Gas Complaints",
        body: `British Gas consistently ranks among the most complained-about energy suppliers in Ofgem's data. The most frequent issues are:\n\n- Billing errors and overcharging\n- Direct debit increases without adequate notice\n- Smart meter installation failures and inaccurate readings\n- Refunds of credit balances taking weeks\n- Poor customer service and long hold times\n- Final bills after switching that don't reflect actual meter readings`,
      },
      {
        heading: "Your Rights With British Gas",
        body: `Several key rules protect you when dealing with British Gas:\n\n- **Accurate billing**: Ofgem rules require British Gas to bill you based on actual reads, not repeated estimates. If they've overcharged based on estimates, you're entitled to a correction and refund.\n- **Credit refunds**: If you're in credit, British Gas must refund your balance within 10 working days of a request.\n- **Switching**: You can switch supplier at any time without penalty on a standard variable tariff. British Gas cannot block you.\n- **8-week rule**: They must resolve your formal complaint within 8 weeks. After that, you can go to the Energy Ombudsman for free.`,
      },
      {
        heading: "How to Contact British Gas",
        body: `British Gas complaints channels:\n\n- **Online**: My Account or livechat at britishgas.co.uk\n- **Phone**: 0333 202 9802 (residential customers)\n- **Written**: Customer Relations, British Gas, Millstream, Maidenhead Road, Windsor, SL4 5GD\n\nAlways follow up any call with a written email or letter. Write "FORMAL COMPLAINT" in the subject line. This starts the official 8-week clock and creates a paper trail.`,
      },
      {
        heading: "What to Include in Your Complaint",
        body: `A strong British Gas complaint letter should include:\n\n1. Your account number\n2. The specific issue and date it started\n3. What British Gas has (or hasn't) done so far\n4. The financial impact (e.g., "I have been overcharged by £X")\n5. What you want: refund, correction, compensation\n6. A deadline (14 working days is standard)\n7. A reference to Ofgem regulations and/or the Consumer Rights Act 2015\n8. A note that you'll escalate to the Energy Ombudsman if unresolved`,
      },
      {
        heading: "Escalating to the Energy Ombudsman",
        body: `If British Gas doesn't resolve your complaint within 8 weeks, or issues a deadlock letter, you can escalate to the Energy Ombudsman for free.\n\nThe Energy Ombudsman can award:\n- A full or partial refund\n- Compensation (often £30–£150 for poor service, more for significant financial loss)\n- A requirement for British Gas to change a process or fix an error\n\nSubmit your case at ombudsman-services.org/energy. You'll need your original complaint letter and any responses from British Gas.`,
      },
      {
        heading: "Generate Your British Gas Complaint Letter",
        body: `Writing the perfect complaint letter takes time. ComplaintDone does it in 60 seconds.\n\nYour letter will include the correct legal references, a firm professional tone, your desired outcome, and an escalation warning — everything British Gas needs to take your complaint seriously.\n\nCost: £3. Delivered to your inbox instantly.`,
      },
    ],
  },
  {
    slug: "formal-complaint-letter-template-uk",
    title: "Free Formal Complaint Letter Template (UK) — Ready to Use in 2026",
    description: "Free UK formal complaint letter template you can use right now. Includes structure, legal references, and example wording for retail, energy, and telecoms complaints.",
    keywords: "formal complaint letter template UK, complaint letter template free, consumer complaint letter example, complaint letter format UK",
    publishedAt: "2026-04-11",
    readingTime: "4 min read",
    sections: [
      {
        heading: "The Universal UK Complaint Letter Template",
        body: `Use this template for most UK consumer complaints. Replace the items in [square brackets] with your details.\n\n---\n\n[Your Name]\n[Your Address]\n[Date]\n\nCustomer Relations Department\n[Company Name]\n[Company Address]\n\nDear Sir or Madam,\n\nRE: FORMAL COMPLAINT — [BRIEF DESCRIPTION]\n[Account/Order/Reference Number, if applicable]\n\nI am writing to formally complain about [describe the issue briefly: e.g., an incorrect charge on my bill / a faulty product / failure to deliver my order].\n\nOn [date], [describe what happened: e.g., I received a bill for £X, which is £Y more than expected based on my meter readings]. Despite [contacting your customer service on date / waiting X weeks], this has not been resolved.\n\nI am seeking [your outcome: e.g., a full refund of £X / correction of the charge / a written apology] within 14 working days of the date of this letter.\n\nI am aware of my rights under the Consumer Rights Act 2015 [and/or relevant regulation] and may escalate this matter to [relevant ombudsman/Trading Standards/my credit card provider] if it is not resolved within the stated timeframe.\n\nYours faithfully,\n[Your Name]\n[Your Phone/Email — optional]\n\n---`,
      },
      {
        heading: "Tips for Using the Template Effectively",
        body: `**Do:**\n- Use "Yours faithfully" when you don't know the recipient's name (formal letters to a department)\n- Use "Yours sincerely" if you're writing to a named person\n- Include a specific pound amount you're seeking — vague requests get vague responses\n- Set a firm deadline (14 working days is standard)\n- Keep it to one page if possible\n\n**Don't:**\n- Write in anger — keep it factual and businesslike\n- Use slang or informal language\n- Exaggerate — stick to provable facts\n- Forget to include your reference/order/account number`,
      },
      {
        heading: "Adapting the Template for Different Industries",
        body: `**Energy (British Gas, EDF, etc.):**\nAdd: "I am aware of my rights under Ofgem regulations and may escalate to the Energy Ombudsman after 8 weeks."\n\n**Telecoms (O2, BT, Sky, Virgin Media):**\nAdd: "I may escalate to the Communications Ombudsman if not resolved within 8 weeks."\n\n**Banking/Insurance:**\nAdd: "I am aware I may refer this matter to the Financial Ombudsman Service after 8 weeks."\n\n**Retail (Currys, Amazon, etc.):**\nAdd: "Under the Consumer Rights Act 2015, I have the right to a full refund as this item is not of satisfactory quality."`,
      },
      {
        heading: "When to Send by Post vs Email",
        body: `**Email** is usually better because:\n- Creates an automatic timestamp\n- Harder to claim they didn't receive it\n- Easier to forward to an ombudsman as evidence\n\nIf you do send by post, use **Royal Mail Recorded Delivery** and keep the receipt. This proves the letter was delivered.\n\nSend to the company's official complaints address — not a general email or social media. The complaints address is usually in the company's terms and conditions.`,
      },
      {
        heading: "Skip the Template — Let AI Write It For You",
        body: `Templates are useful, but they're generic. Your complaint is specific.\n\nComplaintDone takes your details — company, issue, desired outcome, tone — and generates a personalised complaint letter with the correct legal references in under 60 seconds. £3 for UK, $5 for US. Delivered straight to your inbox.\n\nMost users get a better result with a customised letter than a template because it's harder for companies to dismiss as a copy-paste job.`,
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
