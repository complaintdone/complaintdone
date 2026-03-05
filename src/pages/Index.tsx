import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: FileText, title: "Describe your issue", description: "Tell us what happened — the company, the problem, and what you want fixed." },
  { icon: Zap, title: "Pay £1.49", description: "One-time payment. No subscriptions. No hidden fees." },
  { icon: CheckCircle, title: "Get your letter + escalation info", description: "Professional complaint letter and executive contacts sent to your inbox in under 60 seconds." },
];

const trustItems = [
  { icon: Shield, text: "Secure payment via Stripe" },
  { icon: Zap, text: "Delivered in under 60 seconds" },
  { icon: FileText, text: "No subscription required" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-primary">
            Complaint<span className="text-accent">Done</span>
          </Link>
          <Link to="/complaint">
            <Button variant="cta" size="sm">Start Now</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(27 100% 55% / 0.3), transparent 50%), radial-gradient(circle at 80% 20%, hsl(210 100% 30% / 0.5), transparent 50%)" }} />
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight max-w-3xl mx-auto"
          >
            Get Your Complaint Done{" "}
            <span className="text-accent">in Minutes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto"
          >
            Your complaint. Written. Escalated. Done.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <Link to="/complaint">
              <Button variant="ctaLarge" size="xl">
                Start Now — £1.49 <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground">
          How it works
        </h2>
        <div className="mt-14 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <step.icon className="h-7 w-7 text-accent" />
              </div>
              <div className="text-sm font-semibold text-accent mb-2">Step {i + 1}</div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-foreground">
                <item.icon className="h-5 w-5 text-accent" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Ready to get your complaint sorted?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
          Professional AI-generated complaint letter with escalation contacts. Just £1.49, no subscription.
        </p>
        <div className="mt-8">
          <Link to="/complaint">
            <Button variant="ctaLarge" size="xl">
              Start Now <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-heading font-bold text-foreground">
            Complaint<span className="text-accent">Done</span>
          </span>
          <p className="text-center">AI-generated content for informational purposes only. Not legal advice.</p>
          <Link to="/terms" className="underline hover:text-foreground">Terms & Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
