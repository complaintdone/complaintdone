import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Complaint = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.company || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // TODO: Create Stripe checkout session via edge function
    toast.info("Stripe checkout will be integrated shortly.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-primary">
            Complaint<span className="text-accent">Done</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Describe your complaint</h1>
          <p className="text-muted-foreground mb-8">We'll generate a professional complaint letter and find the right escalation contacts.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Your name (optional)</Label>
              <Input id="name" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="company">Company you're complaining about *</Label>
              <Input id="company" name="company" placeholder="e.g. British Gas, Sky, Vodafone" value={form.company} onChange={handleChange} required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="description">What happened? *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the issue in detail — what happened, when, and what resolution you're looking for..."
                value={form.description}
                onChange={handleChange}
                required
                rows={6}
                className="mt-1.5 resize-none"
              />
            </div>

            <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Generate & Pay — £1.49"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Secure payment via Stripe. AI-generated, not legal advice.{" "}
              <Link to="/terms" className="underline">Terms</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Complaint;
