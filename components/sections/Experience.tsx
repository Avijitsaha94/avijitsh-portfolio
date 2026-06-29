"use client";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experiences } from "@/lib/data";
import { fadeInUp, staggerChildren } from "@/lib/utils";

const TYPE_CONFIG = {
  "full-time": { label: "Full-time", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  freelance: { label: "Freelance", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  internship: { label: "Internship", color: "bg-primary/10 text-primary border-primary/20" },
  contract: { label: "Contract", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
};

export default function Experience() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// experience</p>
            <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Where I've<span className="gradient-text block">worked.</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border/60" />
            <div className="space-y-8">
              {experiences.map((exp) => (
                <motion.div key={exp.id} variants={fadeInUp} className="relative pl-14">
                  <div className={`absolute left-[18px] top-3 w-2.5 h-2.5 rounded-full border-2 border-background ${exp.current ? "bg-primary" : "bg-muted-foreground/60"}`} />
                  {exp.current && <div className="absolute left-[18px] top-3 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-40" />}

                  <div className="glass rounded-2xl p-6 border border-border/50 card-hover">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                        <p className="text-primary font-semibold mt-0.5">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        <span className={`px-2.5 py-0.5 text-xs font-mono rounded-full border ${TYPE_CONFIG[exp.type].color}`}>
                          {exp.current ? "Current" : exp.type}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                        </div>
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
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
