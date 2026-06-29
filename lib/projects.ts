import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/types";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { ...data, content } as Project;
  });
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.year - a.year;
  });
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { ...data, content } as Project;
  } catch { return null; }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}
