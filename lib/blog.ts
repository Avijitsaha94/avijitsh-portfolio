import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).length;
    return { ...data, content, readingTime: `${Math.ceil(words / 200)} min read` } as BlogPost;
  });
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).length;
    return { ...data, content, readingTime: `${Math.ceil(words / 200)} min read` } as BlogPost;
  } catch { return null; }
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}
