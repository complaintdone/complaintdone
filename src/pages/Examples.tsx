import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = [
  {
    industry: "UK Telecoms Provider",
    market: "UK",
    tone: "Firm",
    outcome: "Full refund",
    letter: `15 March 2025

Customer Service Department
Telecoms Provider Ltd
[Address]

Dear Sir or Madam,

**RE: FORMAL COMPLAINT – UNAUTHORISED SERVICE INTERRUPTION**
**Account Number: [Insert Account Number]**

I am writing to lodge a formal complaint regarding the unacceptable interruption to my broadband service that occurred on 12 March 2025, which lasted three consecutive days without any prior notification or justification.

This disruption caused considerable inconvenience to my household. I was provided with no advance warning, no explanation for the interruption, and no estimated timeframe for restoration of service. Such conduct falls significantly below the standard of service I am entitled to expect from a utility provider of your standing.

I am seeking a full refund of charges for the period during which I was deprived of service. This is a reasonable and proportionate resolution to the service failure I experienced. I expect a substantive response to this complaint within 10 business days, along with confirmation of how you intend to remedy this matter.

I am aware of my rights under the Consumer Rights Act 2015 and may escalate this matter to the Financial Ombudsman Service, Trading Standards, or relevant regulatory body if necessary.

I await your prompt response.

Yours faithfully,

[Your Name]`
  },
  {
    industry: "USA Retail Store",
    market: "USA",
    tone: "Assertive",
    outcome: "Partial refund",
    letter: `March 15, 2025

Customer Service Department
Retail Store Inc
[Address]

**RE: Formal Complaint Regarding Defective Product and Request for Refund**

Dear Sir or Madam:

I am writing to lodge a formal complaint regarding a defective product purchased from your store on March 1, 2025, and to demand immediate resolution.

On that date, I purchased a kitchen appliance (Model XYZ-123) for $299.99. Upon opening the product at home, I discovered significant damage to the internal components, rendering the appliance completely non-functional. Despite two attempts to contact your customer service department (March 3 and March 8), I have received no meaningful response or resolution.

I am requesting that your company process a partial refund in the amount of $150.00 to reflect the diminished value and inconvenience caused. I expect this matter to be resolved within fourteen (14) business days. Please contact me at [phone number] or [email address] to confirm receipt of this letter and to provide a timeline for the refund.

I am aware of my rights under federal consumer protection laws and may escalate this matter to the Federal Trade Commission (FTC), Consumer Financial Protection Bureau (CFPB), or Better Business Bureau (BBB) if necessary.

I look forward to your prompt response and resolution.

Sincerely,

[Your Name]
[Account Number]`
  },
  {
    industry: "UK Energy Supplier",
    market: "UK",
    tone: "Polite",
    outcome: "Account credit",
    letter: `15 March 2025

Customer Service Team
Energy Supplier Ltd
[Address]

Dear Customer Service Team,

**RE: Billing Error – Request for Account Credit**
**Account Reference: [Insert Account Number]**

I hope this letter finds you well. I am writing regarding a billing discrepancy on my recent energy statement dated 1 March 2025.

I have noticed that my account has been charged £245.67, which appears to be significantly higher than my usual monthly usage. Upon reviewing my meter readings and comparing them with the billed amount, I believe there has been an error in the calculation.

I would be grateful if you could review my account and provide a detailed breakdown of the charges. If, as I suspect, there has been an overcharge, I would appreciate if the excess amount could be credited to my account for future bills.

I have been a customer for several years and have always found your service to be excellent. I am confident this matter can be resolved amicably and look forward to your response within the next 10 business days.

I am aware of my rights under the Consumer Rights Act 2015 and may escalate this matter to the Financial Ombudsman Service, Trading Standards, or relevant regulatory body if necessary.

Thank you for your attention to this matter.

Yours sincerely,

[Your Name]`
  },
  {
    industry: "USA Banking Institution",
    market: "USA",
    tone: "Firm",
    outcome: "Formal investigation",
    letter: `March 15, 2025

Complaints Department
Banking Institution Corp
[Address]

**RE: Formal Complaint – Unauthorized Charges and Request for Investigation**

Dear Complaints Department,

I am writing to formally complain about unauthorized charges totaling $487.32 that appeared on my checking account statement for the period ending March 10, 2025.

On March 11, I discovered three separate charges (Transaction IDs: TX123456, TX123457, TX123458) that I did not authorize. I immediately contacted your fraud department via telephone and was assured the matter would be investigated within 5 business days. As of today, March 15, I have received no communication regarding the status of this investigation.

I am requesting that your institution conduct a formal investigation into these unauthorized transactions and provide me with a full written explanation of how these charges occurred. I expect the disputed amount to be credited to my account pending the outcome of the investigation, as is my right under federal banking regulations.

Please respond to this complaint within 10 business days with a detailed update on the investigation's progress and a timeline for resolution.

I am aware of my rights under federal consumer protection laws and may escalate this matter to the Federal Trade Commission (FTC), Consumer Financial Protection Bureau (CFPB), or Better Business Bureau (BBB) if necessary.

I look forward to your prompt attention to this serious matter.

Sincerely,

[Your Name]
[Account Number]`
  },
  {
    industry: "UK Airline",
    market: "UK",
    tone: "Assertive",
    outcome: "Full refund",
    letter: `15 March 2025

Customer Relations Department
Airline Ltd
[Address]

Dear Sir or Madam,

**RE: FORMAL COMPLAINT – FLIGHT CANCELLATION WITHOUT ADEQUATE COMPENSATION**
**Booking Reference: ABC123XYZ**

I am writing to express my strong dissatisfaction with the handling of my cancelled flight (Flight BA456, scheduled for 10 March 2025, London to Edinburgh) and to demand full compensation as required by law.

The flight was cancelled with less than 14 days' notice, yet I have received no explanation, no alternative flight options, and no compensation offer. This cancellation caused me to miss a critical business meeting, resulting in both professional and financial loss.

Under UK regulations (specifically EU Regulation 261/2004, which remains in force), I am entitled to compensation of £220 for this cancellation, in addition to a full refund of my ticket price (£149.00).

I request that you process this compensation immediately. If I do not receive a satisfactory response within 14 days, I will escalate this matter to the Civil Aviation Authority and pursue legal action if necessary.

I am aware of my rights under the Consumer Rights Act 2015 and may escalate this matter to the Financial Ombudsman Service, Trading Standards, or relevant regulatory body if necessary.

I expect this matter to be resolved without delay.

Yours faithfully,

[Your Name]`
  },
  {
    industry: "USA Internet Service Provider",
    market: "USA",
    tone: "Polite",
    outcome: "Written apology",
    letter: `March 15, 2025

Customer Care Team
Internet Service Provider Inc
[Address]

Dear Customer Care Team,

**RE: Service Disruption and Request for Formal Acknowledgment**

I hope this letter finds you well. I am writing to bring to your attention a service disruption I experienced between March 1 and March 5, 2025, which significantly impacted my ability to work from home.

During this period, my internet service was intermittent and frequently dropped connection entirely, despite multiple troubleshooting attempts on my part and two service calls to your technical support team. While I appreciate the eventual resolution on March 5, the prolonged nature of the issue caused considerable disruption to my professional responsibilities.

I am not seeking financial compensation at this time. However, I would appreciate a written acknowledgment of this service failure and confirmation of what steps have been taken to prevent similar issues in the future. This would provide reassurance that the problem has been properly addressed.

I have been a satisfied customer for three years and value the service you typically provide. I am confident this matter can be resolved through open communication.

I am aware of my rights under federal consumer protection laws and may escalate this matter to the Federal Trade Commission (FTC), Consumer Financial Protection Bureau (CFPB), or Better Business Bureau (BBB) if necessary.

Thank you for your understanding and attention to this matter.

Sincerely,

[Your Name]
[Account Number]`
  }
];

const Examples = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-primary">
            Complaint<span className="text-accent">Done</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Example Letters</h1>
          <p className="text-muted-foreground mb-8 text-lg max-w-3xl">
            See what ComplaintDone generates. These examples show the quality and structure of our AI-drafted complaint letters across different industries and markets.
          </p>

          {/* Disclaimer */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-12">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong>Important:</strong> These are example letters generated by ComplaintDone to illustrate the service. Names, companies, and details are fictional. Your letter will be drafted based on your specific situation.
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-8">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <div className="bg-secondary px-6 py-4 border-b border-border">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="font-heading font-bold text-foreground text-lg">{example.industry}</h3>
                    <div className="flex gap-3 text-sm">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                        {example.market}
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        Tone: {example.tone}
                      </span>
                      <span className="px-3 py-1 bg-muted text-foreground rounded-full font-medium">
                        Outcome: {example.outcome}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-background">
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/80 leading-relaxed">
                      {example.letter}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Get your letter written
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Your complaint will be tailored to your specific situation with the right tone, legal references, and outcome you're seeking.
            </p>
            <Link to="/complaint">
              <Button variant="cta" size="lg">
                Start Your Complaint — from £3 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Examples;
