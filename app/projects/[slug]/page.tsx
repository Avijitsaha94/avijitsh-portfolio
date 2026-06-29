import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft, Calendar, Tag, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <article className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Calendar className="w-3 h-3" />{project.year}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground capitalize">
                <Tag className="w-3 h-3" />{project.category}
              </span>
              {project.status === "live" && (
                <span className="flex items-center gap-1.5 text-xs font-mono text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Live
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{project.tagline}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors glow-primary-sm">
                  <ExternalLink className="w-4 h-4" />Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-border/60 rounded-xl text-sm font-semibold hover:border-primary/40 hover:bg-secondary/80 transition-colors">
                  <Github className="w-4 h-4" />Source Code
                </a>
              )}
            </div>
          </header>

          {/* Thumbnail */}
          <div className="relative aspect-video bg-secondary/50 rounded-2xl overflow-hidden mb-12 border border-border/50">
            {project.thumbnail ? (
              <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-black text-primary/10"
                  style={{ fontSize: "8rem" }}>{project.title.charAt(0)}</span>
              </div>
            )}
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {project.metrics.map((m) => (
                <div key={m.label} className="glass rounded-xl p-4 text-center border border-border/50 card-hover">
                  <TrendingUp className="w-4 h-4 text-primary mx-auto mb-2" />
                  <p className="font-display font-bold text-2xl text-primary">{m.value}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Problem → Solution → Result */}
          <div className="space-y-8 mb-12">
            {[
              { emoji: "🔴", label: "The Problem", content: project.problem },
              { emoji: "🟢", label: "The Solution", content: project.solution },
              { emoji: "✅", label: "The Result", content: project.result },
            ].map((section) => (
              <section key={section.label} className="glass rounded-xl p-6 border border-border/50">
                <h2 className="font-display text-xl font-bold mb-3 flex items-center gap-3">
                  <span>{section.emoji}</span>{section.label}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>

          {/* Tech Stack */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-5">⚙️ Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech}
                  className="px-3 py-1.5 text-sm font-mono rounded-lg bg-primary/10 text-primary border border-primary/20">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-5 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                Challenges Faced
              </h2>
              <div className="glass rounded-xl p-6 border border-yellow-500/20 space-y-3">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold font-mono mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <p className="text-muted-foreground text-sm leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Future Plans */}
          {project.futurePlans && project.futurePlans.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-5 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-primary" />
                Future Plans
              </h2>
              <div className="glass rounded-xl p-6 border border-primary/20 space-y-3">
                {project.futurePlans.map((plan, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary flex-shrink-0 mt-0.5">▸</span>
                    <p className="text-muted-foreground text-sm leading-relaxed">{plan}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots */}
          {project.images && project.images.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-6">📸 Screenshots</h2>
              <div className="grid gap-4">
                {project.images.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border/50 bg-secondary/30">
                    <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Lessons */}
          {project.lessons && project.lessons.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-5">💡 What I Learned</h2>
              <ul className="space-y-3">
                {project.lessons.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Next Project */}
          {nextProject && nextProject.slug !== slug && (
            <div className="border-t border-border/50 pt-10">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Next Project
              </p>
              <Link href={`/projects/${nextProject.slug}`}
                className="group flex items-center justify-between p-5 glass rounded-xl hover:border-primary/30 transition-all border border-border/50 card-hover">
                <div>
                  <p className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{nextProject.tagline}</p>
                </div>
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform text-muted-foreground" />
              </Link>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
