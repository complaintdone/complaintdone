import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

interface CompanyPageProps {
  companyName: string;
  companySlug: string;
  industry: string;
  commonIssues: string[];
  legalRights: string[];
  escalationInfo: {
    internalProcess: string;
    ombudsman?: string;
    regulator?: string;
  };
  sampleLetterPreview: string;
}

export const CompanyPage = ({
  companyName,
  companySlug,
  industry,
  commonIssues,
  legalRights,
  escalationInfo,
  sampleLetterPreview,
}: CompanyPageProps) => {
  const market = industry.includes("UK") ? "uk" : "usa";
  const price = market === "uk" ? "£3" : "$5";

  return (
    <>
      <SEO
        title={`${companyName} Complaint Letter Generator - ${price}`}
        description={`Generate professional complaint letters for ${companyName}. Covers ${commonIssues.slice(0, 3).join(", ")}. Legal references included. Instant delivery.`}
        keywords={`${companyName} complaint, ${companyName} complaint letter, ${companySlug} refund, ${industry} complaint, formal complaint ${companyName}`}
      />
      <div className="min-h-screen bg-background">
        {/* Nav */}
        <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="font-heading text-xl font-bold text-primary">
              Complaint<span className="text-accent">Done</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="text-foreground/70 hover:text-foreground">Home</Link>
              <Link to="/examples" className="text-foreground/70 hover:text-foreground">Examples</Link>
              <Link to="/about" className="text-foreground/70 hover:text-foreground">About</Link>
            </div>
            <Link to={`/complaint?market=${market}`}>
              <Button variant="cta" size="sm">Start Now</Button>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(27 100% 55% / 0.3), transparent 50%), radial-gradient(circle at 80% 20%, hsl(210 100% 30% / 0.5), transparent 50%)" }} />
          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground leading-tight max-w-3xl mx-auto"
            >
              {companyName} Complaint Letter Generator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Professional, legally-backed complaint letters for {companyName}. Written by AI in 60 seconds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <Link to={`/complaint?market=${market}&company=${encodeURIComponent(companyName)}`}>
                <Button variant="ctaLarge" size="xl" className="text-lg px-8 py-6">
                  Generate Letter — {price} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            Common {companyName} Complaints We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {commonIssues.map((issue, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <FileText className="h-6 w-6 text-accent mb-3" />
                <p className="text-foreground font-medium">{issue}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Your Legal Rights */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Your Legal Rights When Complaining to {companyName}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {legalRights.map((right, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border"
                >
                  <Shield className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-foreground">{right}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Escalation Process */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            How to Escalate Your {companyName} Complaint
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">1</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">Internal Complaint</h3>
              </div>
              <p className="text-muted-foreground pl-11">{escalationInfo.internalProcess}</p>
            </div>

            {escalationInfo.ombudsman && (
              <div className="p-6 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground">Ombudsman</h3>
                </div>
                <p className="text-muted-foreground pl-11">{escalationInfo.ombudsman}</p>
              </div>
            )}

            {escalationInfo.regulator && (
              <div className="p-6 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground">Regulator</h3>
                </div>
                <p className="text-muted-foreground pl-11">{escalationInfo.regulator}</p>
              </div>
            )}
          </div>
        </section>

        {/* Sample Letter Preview */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Sample {companyName} Complaint Letter
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-background border border-border rounded-lg p-8">
                <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                  {sampleLetterPreview}
                </pre>
              </div>
              <div className="mt-6 text-center">
                <Link to={`/complaint?market=${market}&company=${encodeURIComponent(companyName)}`}>
                  <Button variant="cta" size="lg">
                    Generate Your Custom Letter — {price}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-primary rounded-2xl p-12 text-center">
            <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
              Ready in Under 60 Seconds
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Generate your professionally written {companyName} complaint letter now. Pay {price}, receive instantly.
            </p>
            <Link to={`/complaint?market=${market}&company=${encodeURIComponent(companyName)}`}>
              <Button variant="ctaLarge" size="xl" className="text-lg px-8 py-6">
                Start My Complaint — {price}
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/examples" className="hover:text-foreground">Examples</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            </div>
            <p>&copy; 2026 ComplaintDone. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};
