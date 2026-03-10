import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="font-heading text-xl font-bold text-primary">
          Complaint<span className="text-accent">Done</span>
        </Link>
      </div>
    </nav>
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Terms of Service & Disclaimer</h1>
      <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground">Service Description</h2>
          <p>ComplaintDone provides AI-generated complaint letters based on information you supply. Each letter costs a one-time fee of £3.00 (UK) or $5.00 (USA). There are no subscriptions or recurring charges.</p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground">Disclaimer</h2>
          <p><strong>AI-generated content is for informational purposes only and does not constitute legal advice.</strong> ComplaintDone is not a law firm. We do not guarantee any specific outcome from using our letters. The escalation contacts provided are suggestions based on publicly available information and may not be current.</p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground">AI-Generated Content</h2>
          <p>Letters are generated using artificial intelligence and incorporate references to relevant UK regulations (such as the Consumer Rights Act 2015, Ofcom guidelines, FCA regulations, and ICO guidance) where applicable. These references are provided for informational purposes and should not be relied upon as legal counsel.</p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground">Payments & Refunds</h2>
          <p>Payments are processed securely via Stripe. As the service delivers a digital product immediately upon payment, refunds are generally not available. If you experience a technical issue preventing delivery, please contact us.</p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground">Data & Privacy</h2>
          <p>Data is processed in accordance with UK GDPR. We store your submission details (email, company name, complaint description) solely to deliver the service. <strong>Submissions are deleted after 30 days.</strong> We do not sell your data. Complaint details are processed by AI and are not reviewed by humans unless required for support.</p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground">Contact</h2>
          <p>For questions or support, email <a href="mailto:support@complaintdone.com" className="text-accent underline">support@complaintdone.com</a>.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Terms;
