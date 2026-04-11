import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Zap, Send, Shield, Scale, Megaphone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const Index = () => {
  const [market, setMarket] = useState<"uk" | "usa">("uk");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "submitted">("idle");

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      await fetch(`${supabaseUrl}/functions/v1/capture-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
    } catch (_) {
      // Fail silently — UX still shows success
    }
    setEmailStatus("submitted");
  };
  const price = market === "uk" ? "£3" : "$5";

  return (
    <>
      <SEO
        title="Professional AI Complaint Letters - £3 UK | $5 USA"
        description="Generate legally-backed complaint letters in 60 seconds. Consumer Rights Act references, professional tone, delivered instantly. No subscription."
        keywords="complaint letter UK, consumer complaint, formal complaint letter, British Gas complaint, Sky complaint, refund letter"
      />
      <div className="min-h-screen bg-background">
        {/* Nav */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-primary">
            Complaint<span className="text-accent">Done</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground">How It Works</a>
            <Link to="/blog" className="text-foreground/70 hover:text-foreground">Blog</Link>
            <Link to="/examples" className="text-foreground/70 hover:text-foreground">Examples</Link>
            <Link to="/about" className="text-foreground/70 hover:text-foreground">About</Link>
            <Link to="/contact" className="text-foreground/70 hover:text-foreground">Contact</Link>
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
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Market Toggle */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <button
                onClick={() => setMarket("uk")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  market === "uk"
                    ? "bg-white text-primary shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                🇬🇧 £3
              </button>
              <button
                onClick={() => setMarket("usa")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  market === "usa"
                    ? "bg-white text-primary shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                🇺🇸 $5
              </button>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight max-w-3xl mx-auto"
          >
            Your complaint. Written properly.{" "}
            <span className="text-accent">Delivered fast.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Professional complaint letters drafted by AI, based on your details — ready in under 60 seconds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <Link to={`/complaint?market=${market}`}>
              <Button variant="ctaLarge" size="xl" className="text-lg px-8 py-6">
                Start My Complaint — {price}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-14">
          Three simple steps to a professionally written complaint letter
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
              <FileText className="h-7 w-7 text-accent" />
            </div>
            <div className="text-sm font-semibold text-accent mb-2">Step 1</div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Describe your experience</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tell us what happened, who with, and what you want
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
              <Zap className="h-7 w-7 text-accent" />
            </div>
            <div className="text-sm font-semibold text-accent mb-2">Step 2</div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">We write your letter</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI drafts a professional complaint using consumer law relevant to your country
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
              <Send className="h-7 w-7 text-accent" />
            </div>
            <div className="text-sm font-semibold text-accent mb-2">Step 3</div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">Delivered to your inbox</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your letter arrives within 60 seconds of payment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-6">
            Why It Works
          </h2>
          <p className="text-center text-foreground/80 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
            Complaint letters work when they're specific, reference the right legislation, and are addressed to the right person. Most people don't know where to start. We do.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-2">Cites relevant law</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Consumer Rights Act / FTC / CFPB depending on your location
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Megaphone className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-2">Written in the tone you choose</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Polite, firm, or assertive
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-2">Includes escalation contacts</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Where applicable
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-4">
          Simple Pricing
        </h2>
        <p className="text-center text-muted-foreground mb-14">
          No subscriptions. No hidden fees. Just one letter, delivered instantly.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* UK Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-2 border-border rounded-2xl p-8 hover:border-accent/50 transition-colors"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🇬🇧</div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">UK Complaints</h3>
              <div className="text-4xl font-heading font-bold text-accent mb-4">£3</div>
              <p className="text-muted-foreground mb-6">One letter, delivered instantly</p>
              <Link to="/complaint?market=uk">
                <Button variant="cta" size="lg" className="w-full">
                  Start UK Complaint
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* US Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="border-2 border-border rounded-2xl p-8 hover:border-accent/50 transition-colors"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🇺🇸</div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">US Complaints</h3>
              <div className="text-4xl font-heading font-bold text-accent mb-4">$5</div>
              <p className="text-muted-foreground mb-6">One letter, delivered instantly</p>
              <Link to="/complaint?market=usa">
                <Button variant="cta" size="lg" className="w-full">
                  Start US Complaint
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Mail className="h-10 w-10 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Free Consumer Rights Tips
            </h2>
            <p className="text-muted-foreground mb-6">
              Get a free complaint letter template + weekly UK consumer rights guides. No spam, unsubscribe anytime.
            </p>
            {emailStatus === "submitted" ? (
              <p className="text-accent font-medium">You're in. Check your inbox for your free template.</p>
            ) : (
              <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 max-w-sm px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button type="submit" variant="cta" size="lg">
                  Send Me the Template
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-heading text-xl font-bold text-foreground mb-4">
                Complaint<span className="text-accent">Done</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Professional AI-generated complaint letters. UK and USA.
              </p>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:support@complaintdone.com" className="text-accent hover:underline">support@complaintdone.com</a>
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4 text-sm">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></div>
                <div><a href="#how-it-works" className="text-muted-foreground hover:text-foreground">How It Works</a></div>
                <div><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></div>
                <div><Link to="/examples" className="text-muted-foreground hover:text-foreground">Examples</Link></div>
                <div><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4 text-sm">Legal</h4>
              <div className="space-y-2 text-sm">
                <div><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></div>
                <div><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms & Disclaimer</Link></div>
                <div><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2025 ComplaintDone. All rights reserved.</p>
            <p>AI-generated content for informational purposes only. Not legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Index;
