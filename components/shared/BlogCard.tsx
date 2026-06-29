"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ post, index = 0, compact = false }: { post: BlogPost; index?: number; compact?: boolean; featured?: boolean }) {
  if (compact) {
    return (
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
        <Link href={`/blog/${post.slug}`} className="group flex items-start justify-between gap-4 glass rounded-xl px-5 py-4 border border-border/50 hover:border-primary/30 card-hover">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-primary/10 text-primary border border-primary/15">{tag}</span>
              ))}
            </div>
            <h3 className="font-display text-base font-bold group-hover:text-primary transition-colors truncate">{post.title}</h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime}</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
      <Link href={`/blog/${post.slug}`}>
        <div className="glass rounded-2xl p-6 border border-border/50 card-hover h-full flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
            ))}
          </div>
          <h2 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1 mb-5">{post.summary}</p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readingTime}</span>
            </div>
            <span className="flex items-center gap-1 text-xs text-primary font-semibold">Read <ArrowRight className="w-3.5 h-3.5" /></span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
