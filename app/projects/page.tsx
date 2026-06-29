import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import ProjectCard from "@/components/shared/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of real-world projects built with Next.js, Node.js, and TypeScript.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// projects</p>
            <h1 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              Things I've<span className="gradient-text block">Built.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">Real problems, real solutions, real lessons. Each project has a full case study.</p>
          </div>

          {featured.length > 0 && (
            <section className="mb-16">
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Featured Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section>
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Other Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
              </div>
            </section>
          )}

          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-4">Want to see more?</p>
            <a href={`https://github.com/${siteConfig.author.github}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-secondary transition-all font-semibold">
              View All on GitHub →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
