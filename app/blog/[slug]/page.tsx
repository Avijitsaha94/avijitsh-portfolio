import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex + 1];

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <article className="container-max px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />All Posts
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
              ))}
            </div>
            <h1 className="font-display font-extrabold leading-tight mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>{post.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.summary}</p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-t border-b border-border/50 py-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readingTime}</span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-secondary prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl
            prose-ul:text-muted-foreground prose-li:marker:text-primary">
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } }} />
          </div>

          {nextPost && (
            <div className="mt-20 border-t border-border/50 pt-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Read Next</p>
              <Link href={`/blog/${nextPost.slug}`} className="group flex items-center justify-between p-5 glass rounded-xl border border-border/50 card-hover">
                <div>
                  <p className="font-display text-xl font-bold group-hover:text-primary transition-colors">{nextPost.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{nextPost.summary}</p>
                </div>
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform text-muted-foreground flex-shrink-0 ml-4" />
              </Link>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
