import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Complaint from "./pages/Complaint";
import Success from "./pages/Success";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Examples from "./pages/Examples";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BritishGas from "./pages/companies/BritishGas";
import Sky from "./pages/companies/Sky";
import BT from "./pages/companies/BT";
import Vodafone from "./pages/companies/Vodafone";
import VirginMedia from "./pages/companies/VirginMedia";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/success" element={<Success />} />
            <Route path="/about" element={<About />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/companies/british-gas" element={<BritishGas />} />
            <Route path="/companies/sky" element={<Sky />} />
            <Route path="/companies/bt" element={<BT />} />
            <Route path="/companies/vodafone" element={<Vodafone />} />
            <Route path="/companies/virgin-media" element={<VirginMedia />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
