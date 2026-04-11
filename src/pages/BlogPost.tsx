import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { getBlogPost } from "@/lib/blog-posts";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        keywords={post.keywords}
        canonical={`https://complaintdone.com/blog/${post.slug}`}
        type="article"
      />
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="font-heading text-xl font-bold text-primary">
              Complaint<span className="text-accent">Done</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="text-foreground/70 hover:text-foreground">Home</Link>
              <Link to="/blog" className="text-foreground font-medium">Blog</Link>
              <Link to="/examples" className="text-foreground/70 hover:text-foreground">Examples</Link>
            </div>
            <Link to="/complaint">
              <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors">
                Generate Letter — £3
              </button>
            </Link>
          </div>
        </nav>

        <article className="container mx-auto px-4 py-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="h-4 w-4" />
              All guides
            </Link>

            <h1 className="text-4xl font-heading font-bold text-foreground leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>

            <div className="space-y-10">
              {post.sections.map((section, idx) => (
                <motion.section
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                    {section.heading}
                  </h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.body}
                  </div>
                </motion.section>
              ))}
            </div>

            <div className="mt-16 bg-primary rounded-2xl p-10 text-center">
              <h2 className="text-2xl font-heading font-bold text-primary-foreground mb-3">
                Ready to Send Your Complaint?
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Generate a professional, legally-referenced complaint letter in 60 seconds. £3 UK / $5 USA.
              </p>
              <Link to="/complaint">
                <Button variant="ctaLarge" size="lg" className="px-8">
                  Generate My Letter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </article>

        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/blog" className="hover:text-foreground">Blog</Link>
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

export default BlogPost;
