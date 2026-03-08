import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO
        title="About ComplaintDone"
        description="Learn the story behind ComplaintDone - created from 15 years of customer service experience to help you get the refunds and resolutions you deserve."
        canonical="https://complaintdone.com/about"
      />
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
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8">About ComplaintDone</h1>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Story</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  ComplaintDone started from 15 years of working in customer service and management at a senior level.
                </p>
                <p>
                  In that time, I saw two things repeatedly. First: customers who had a completely legitimate complaint, but didn't know how to articulate it in a way that got results. They'd give up, feel ignored, or accept an outcome that wasn't fair.
                </p>
                <p>
                  Second: businesses — including ones I worked for — that had internal processes designed to make complaints harder to resolve than they needed to be. Not always maliciously, but systematically. Delays, deflections, and the quiet hope that the customer would eventually go away.
                </p>
                <p>
                  The law doesn't work that way. Consumer rights are clear, they exist for a reason, and they should be just as accessible to someone writing their first complaint as they are to someone who works in the industry.
                </p>
                <p>
                  ComplaintDone exists to close that gap. You tell us what happened. We write the letter — properly, with the right tone, the right legal references, and addressed to the right level of the business. You get a professional complaint without having to become an expert in consumer law first.
                </p>
              </div>
            </section>

            <section className="pt-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">What We Do</h2>
              <p className="text-foreground/80 leading-relaxed">
                We generate AI-drafted complaint letters with market-specific legal references for the UK and USA. You choose the tone (polite, firm, or assertive), provide your complaint details, and receive a professionally formatted letter via email in under 60 seconds. No subscriptions, no upsells — just one letter, delivered instantly.
              </p>
            </section>

            <section className="pt-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Values</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-heading font-bold text-foreground mb-1">Clarity over complexity</h3>
                  <p className="text-foreground/70 text-sm">
                    Your complaint should be clear, direct, and easy to understand.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-heading font-bold text-foreground mb-1">Your rights, made accessible</h3>
                  <p className="text-foreground/70 text-sm">
                    Consumer law exists to protect you. We make it easier to use.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-heading font-bold text-foreground mb-1">No fluff, no upsell, no subscription</h3>
                  <p className="text-foreground/70 text-sm">
                    Pay once, get your letter, done.
                  </p>
                </div>
              </div>
            </section>

            <section className="pt-12 border-t border-border mt-12">
              <div className="text-center">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Ready to write your complaint?</h2>
                <p className="text-muted-foreground mb-6">
                  Get your professionally written complaint letter in under 60 seconds
                </p>
                <Link to="/complaint">
                  <Button variant="cta" size="lg">
                    Start Your Complaint <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default About;
