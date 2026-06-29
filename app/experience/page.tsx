import type { Metadata } from "next";
import { MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import { experiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional work history and education.",
};

// ← তোমার real education দাও
const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Daffodil Institute of IT",
    year: "2018 – 2023",
    location: "Dhaka, Bangladesh",
    description: "Focused on algorithms, data structures, software engineering, and web development.",
  },
];

const TYPE_CONFIG = {
  "full-time": { label: "Full-time", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  freelance: { label: "Freelance", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  internship: { label: "Internship", color: "bg-primary/10 text-primary border-primary/20" },
  contract: { label: "Contract", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
};

export default function ExperiencePage() {
  return (
    <>
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// experience</p>
            <h1 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              Where I've<span className="gradient-text block">worked.</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />Work Experience
              </h2>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-border/60" />
                <div className="space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-14">
                      <div className={`absolute left-[18px] top-3 w-2.5 h-2.5 rounded-full border-2 border-background ${exp.current ? "bg-primary" : "bg-muted-foreground/60"}`} />
                      {exp.current && <div className="absolute left-[18px] top-3 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-40" />}
                      <div className="glass rounded-2xl p-6 border border-border/50 card-hover">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div>
                            <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                            <p className="text-primary font-semibold mt-0.5">{exp.company}</p>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                            <span className={`px-2.5 py-0.5 text-xs font-mono rounded-full border ${TYPE_CONFIG[exp.type].color}`}>{TYPE_CONFIG[exp.type].label}</span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="w-3 h-3" />{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" />{exp.location}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                        <ul className="space-y-2 mb-5">
                          {exp.achievements.map((a, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm">
                              <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                              <span className="text-muted-foreground">{a}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-primary/10 text-primary border border-primary/20">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" />Education
                </h2>
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="glass rounded-xl p-5 border border-border/50 card-hover">
                    <h3 className="font-display text-base font-bold leading-snug mb-1">{edu.degree}</h3>
                    <p className="text-primary text-sm font-semibold">{edu.institution}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{edu.year}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{edu.location}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">At a Glance</h2>
                <div className="space-y-3">
                  {[
                    { label: "Years of Experience", value: "3+" },
                    { label: "Projects Completed", value: "10+" },
                    { label: "Technologies", value: "20+" },
                    { label: "Cups of Tea", value: "∞" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl px-4 py-3 flex items-center justify-between border border-border/50">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="font-display font-bold text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-5 border border-primary/20 text-center">
                <p className="text-sm font-semibold mb-1">Want the full picture?</p>
                <p className="text-xs text-muted-foreground mb-4">Download my resume for a complete overview.</p>
                <a href="/resume/avijit-saha-resume.pdf" download
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
