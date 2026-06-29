import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import BlogCard from "@/components/shared/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on web development, TypeScript, Next.js, and lessons from real projects.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// blog</p>
            <h1 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              Writing<span className="gradient-text block">& Thoughts.</span>
            </h1>
            <p className="text-muted-foreground max-w-lg text-lg">Things I've learned, opinions I've formed, problems I've solved.</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">✍️</p>
              <p className="text-muted-foreground">Posts coming soon. Stay tuned.</p>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <section className="mb-14">
                  <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Featured</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featured.map((post, i) => <BlogCard key={post.slug} post={post} index={i} featured />)}
                  </div>
                </section>
              )}
              {rest.length > 0 && (
                <section>
                  <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">All Posts</h2>
                  <div className="space-y-4">
                    {rest.map((post, i) => <BlogCard key={post.slug} post={post} index={i} compact />)}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
