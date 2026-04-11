import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { blogPosts } from "@/lib/blog-posts";

const Blog = () => {
  return (
    <>
      <SEO
        title="Consumer Rights Blog — UK Complaint Guides & Templates"
        description="Free guides on UK consumer rights, complaint letters, and how to get refunds. Written for people who want results without a lawyer."
        keywords="consumer rights UK, complaint letter guides, UK refund rights, ombudsman guide, consumer law 2026"
        canonical="https://complaintdone.com/blog"
        type="website"
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

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Consumer Rights Guides
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Free guides on UK consumer rights, complaint letters, and how to get what you're owed.
            </p>
          </motion.div>

          <div className="space-y-8">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="border border-border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
              >
                <Link to={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-xl font-heading font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        <footer className="border-t border-border py-8 mt-16">
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

export default Blog;
