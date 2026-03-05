import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Success = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="font-heading text-xl font-bold text-primary">
            Complaint<span className="text-accent">Done</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-3">Payment successful!</h1>
          <p className="text-lg text-muted-foreground mb-2">Your ComplaintDone letter is on its way.</p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Check your inbox within 60 seconds</span>
          </div>
          <Link to="/">
            <Button variant="outline" size="lg">Back to Home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
