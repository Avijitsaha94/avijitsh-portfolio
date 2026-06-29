"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { fadeInUp, staggerChildren } from "@/lib/utils";
import type { Skill } from "@/types";

const CATEGORY_LABELS: Record<Skill["category"], string> = {
  frontend: "Frontend", backend: "Backend", database: "Database",
  devops: "DevOps & Cloud", tools: "Tools",
};

const LEVEL_CONFIG: Record<Skill["level"], { label: string; bars: number }> = {
  expert: { label: "Expert", bars: 4 },
  advanced: { label: "Advanced", bars: 3 },
  intermediate: { label: "Intermediate", bars: 2 },
  learning: { label: "Learning", bars: 1 },
};

const categories = ["frontend", "backend", "database", "devops", "tools"] as const;

export default function Skills() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-max">
        <motion.div variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// skills</p>
            <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Tools I<span className="gradient-text block">master daily.</span>
            </h2>
          </motion.div>

          <div className="space-y-10">
            {categories.map((category) => {
              const cat = skills.filter((s) => s.category === category);
              if (!cat.length) return null;
              return (
                <motion.div key={category} variants={fadeInUp}>
                  <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {cat.map((skill, i) => (
                      <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                        className="glass rounded-xl p-4 flex flex-col gap-2 card-hover border border-border/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground truncate">{skill.name}</span>
                          <div className="flex gap-0.5 flex-shrink-0">
                            {[1,2,3,4].map((bar) => (
                              <div key={bar} className={`w-1 h-3 rounded-full ${bar <= LEVEL_CONFIG[skill.level].bars ? "bg-primary" : "bg-border"}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {LEVEL_CONFIG[skill.level].label}{skill.yearsOfExperience ? ` · ${skill.yearsOfExperience}y` : ""}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
