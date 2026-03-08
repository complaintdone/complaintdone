import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-primary">
            Complaint<span className="text-accent">Done</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: 8 March 2026</p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">1. Introduction</h2>
              <p className="text-foreground/80 leading-relaxed">
                ComplaintDone ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our service at www.complaintdone.com.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We comply with the UK General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">2. Information We Collect</h2>
              <p className="text-foreground/80 leading-relaxed">
                When you use ComplaintDone, we collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Email address</strong>: Used solely to deliver your generated complaint letter</li>
                <li><strong>Name (optional)</strong>: Used to personalize your complaint letter</li>
                <li><strong>Company name</strong>: The subject of your complaint</li>
                <li><strong>Complaint description</strong>: The details you provide about your issue</li>
                <li><strong>Payment information</strong>: Processed securely by Stripe (we never see or store your card details)</li>
                <li><strong>IP address</strong>: Used for rate limiting and fraud prevention (automatically deleted after 24 hours)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">3. How We Use Your Information</h2>
              <p className="text-foreground/80 leading-relaxed">
                We use your information exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Generate your AI-powered complaint letter</li>
                <li>Deliver the letter to your email address</li>
                <li>Process your payment via Stripe</li>
                <li>Prevent abuse through rate limiting (5 requests per hour per IP address)</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-3">
                <strong>We do not:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Store your email address or complaint details after 30 days</li>
                <li>Sell, rent, or share your personal information with third parties</li>
                <li>Use your data for marketing purposes</li>
                <li>Track you across other websites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">4. Data Storage and Retention</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Email delivery records</strong>: Stored by Resend for 30 days, then automatically deleted</li>
                <li><strong>Payment records</strong>: Stored by Stripe in accordance with their privacy policy and financial regulations</li>
                <li><strong>IP addresses</strong>: Automatically deleted after 24 hours</li>
                <li><strong>Analytics data</strong>: We store anonymized metadata (company name, market, tone, outcome) without any personally identifiable information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">5. Third-Party Services</h2>
              <p className="text-foreground/80 leading-relaxed">
                We use the following trusted third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Stripe</strong>: Payment processing (subject to <a href="https://stripe.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Stripe's Privacy Policy</a>)</li>
                <li><strong>Anthropic</strong>: AI letter generation (subject to <a href="https://www.anthropic.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Anthropic's Privacy Policy</a>)</li>
                <li><strong>Resend</strong>: Email delivery (subject to <a href="https://resend.com/legal/privacy-policy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Resend's Privacy Policy</a>)</li>
                <li><strong>Vercel</strong>: Website hosting (subject to <a href="https://vercel.com/legal/privacy-policy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</a>)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">6. Your Rights (GDPR & CCPA)</h2>
              <p className="text-foreground/80 leading-relaxed">
                Under GDPR (UK) and CCPA (California), you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Access</strong>: Request a copy of the personal data we hold about you</li>
                <li><strong>Rectification</strong>: Request correction of inaccurate data</li>
                <li><strong>Erasure</strong>: Request deletion of your personal data (right to be forgotten)</li>
                <li><strong>Opt-out</strong>: Opt out of the sale of personal information (note: we never sell your data)</li>
                <li><strong>Data portability</strong>: Request your data in a machine-readable format</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-3">
                To exercise any of these rights, contact us at <a href="mailto:privacy@complaintdone.com" className="text-accent hover:underline">privacy@complaintdone.com</a>. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">7. Security</h2>
              <p className="text-foreground/80 leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>All data transmitted via HTTPS encryption</li>
                <li>Payment processing through PCI-compliant Stripe</li>
                <li>Rate limiting to prevent abuse</li>
                <li>Webhook signature verification to prevent unauthorized access</li>
                <li>Regular security audits and updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">8. Cookies and Tracking</h2>
              <p className="text-foreground/80 leading-relaxed">
                ComplaintDone does not use cookies or tracking pixels. We do not track your browsing activity across other websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">9. Children's Privacy</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our service is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">10. Changes to This Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">11. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <p className="text-foreground/80 leading-relaxed mt-3">
                Email: <a href="mailto:privacy@complaintdone.com" className="text-accent hover:underline">privacy@complaintdone.com</a>
              </p>
            </section>

            <section className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Summary:</strong> We only use your email to send you the complaint letter. We don't store your personal data long-term, we don't sell it, and we don't track you. Your privacy matters to us.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
