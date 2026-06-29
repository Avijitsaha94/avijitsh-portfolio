"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/shared/ProjectCard";
import { fadeInUp, staggerChildren } from "@/lib/utils";
import type { Project } from "@/types";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;
  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// projects</p>
              <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                What I've<span className="gradient-text block">shipped.</span>
              </h2>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
          <motion.div variants={fadeInUp} className="text-center mt-8 md:hidden">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
