"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  live: { label: "Live", class: "bg-primary/10 text-primary border-primary/20" },
  "in-progress": { label: "In Progress", class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  archived: { label: "Archived", class: "bg-secondary text-muted-foreground border-border" },
};

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group glass rounded-2xl overflow-hidden border border-border/50 card-hover">

      {/* Thumbnail */}
      <div className="relative aspect-video bg-secondary/50 overflow-hidden">
        {project.thumbnail ? (
          <Image src={project.thumbnail} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-black text-primary/10" style={{ fontSize: "5rem" }}>{project.title.charAt(0)}</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 border border-border bg-background/80 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors">
              <Github className="w-3.5 h-3.5" />Code
            </a>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <span className={cn("px-2 py-0.5 text-[10px] font-mono rounded-full border", STATUS_CONFIG[project.status].class)}>
            {STATUS_CONFIG[project.status].label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-background/70 text-muted-foreground border border-border/50">{project.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-primary/10 text-primary border border-primary/20">{tech}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-secondary text-muted-foreground">+{project.tech.length - 4}</span>
          )}
        </div>
        <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5 text-sm text-primary hover:gap-2.5 transition-all font-medium">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}
