import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const COMPANIES = [
  "British Gas", "Sky", "BT", "Vodafone", "Virgin Media", "EDF Energy",
  "Amazon", "Royal Mail", "Currys", "Evri", "DPD", "Barclays", "HSBC",
  "Lloyds", "NatWest", "Santander", "British Airways", "Ryanair", "Easyjet",
  "O2", "Three", "TalkTalk", "Octopus Energy", "E.ON", "Thames Water", "Other",
];

const MAX_CHARS = 2000;

const Complaint = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    tone: "firm",
    market: "uk",
    outcome: ""
  });
  const [loading, setLoading] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);

  const charCount = form.description.length;
  const price = form.market === "usa" ? "$5.00" : "£3.00";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > MAX_CHARS) return;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "company") {
      const filtered = value.length > 0
        ? COMPANIES.filter((c) => c.toLowerCase().includes(value.toLowerCase()))
        : [];
      setCompanySuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
  };

  const selectCompany = (company: string) => {
    setForm((prev) => ({ ...prev, company }));
    setShowSuggestions(false);
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.company || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
  {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(form),
  }
);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Could not start checkout. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
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
            {/* Market selector */}
            <div>
              <Label>Your market *</Label>
              <Select value={form.market} onValueChange={(val) => setForm((prev) => ({ ...prev, market: val }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">🇬🇧 UK — £3.00</SelectItem>
                  <SelectItem value="usa">🇺🇸 USA — $5.00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Your name (optional)</Label>
              <Input id="name" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} required className="mt-1.5" />
            </div>

            {/* Company with auto-suggest */}
            <div ref={companyRef} className="relative">
              <Label htmlFor="company">Company you're complaining about *</Label>
              <Input
                id="company"
                name="company"
                placeholder="Start typing — e.g. British Gas, Sky, Vodafone"
                value={form.company}
                onChange={handleChange}
                onFocus={() => {
                  if (form.company.length > 0) {
                    const filtered = COMPANIES.filter((c) => c.toLowerCase().includes(form.company.toLowerCase()));
                    setCompanySuggestions(filtered);
                    setShowSuggestions(filtered.length > 0);
                  }
                }}
                required
                autoComplete="off"
                className="mt-1.5"
              />
              {showSuggestions && companySuggestions.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {companySuggestions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent/10 text-popover-foreground"
                      onClick={() => selectCompany(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tone selector */}
            <div>
              <Label>Tone *</Label>
              <Select value={form.tone} onValueChange={(val) => setForm((prev) => ({ ...prev, tone: val }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polite">Polite — Friendly but clear</SelectItem>
                  <SelectItem value="firm">Firm — Professional and direct</SelectItem>
                  <SelectItem value="assertive">Assertive — Strong and demanding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desired outcome selector */}
            <div>
              <Label>Desired outcome (optional)</Label>
              <Select value={form.outcome} onValueChange={(val) => setForm((prev) => ({ ...prev, outcome: val }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select desired outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_refund">Full refund</SelectItem>
                  <SelectItem value="partial_refund">Partial refund</SelectItem>
                  <SelectItem value="written_apology">Written apology</SelectItem>
                  <SelectItem value="account_credit">Account credit</SelectItem>
                  <SelectItem value="formal_investigation">Formal investigation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description with character counter */}
            <div>
              <Label htmlFor="description">What happened? *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="E.g., On 1st March 2025, I purchased a washing machine from Currys but it arrived damaged. Despite three calls to customer service and two emails, I have received no resolution. I am seeking a full refund or replacement."
                value={form.description}
                onChange={handleChange}
                required
                rows={6}
                className="mt-1.5 resize-none"
              />
              <div className="flex justify-end mt-1.5">
                <span className={`text-xs ${charCount > MAX_CHARS * 0.9 ? "text-destructive" : "text-muted-foreground"}`}>
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>

            <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : `Generate & Pay — ${price}`}
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
