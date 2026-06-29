"use client";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, BookOpen } from "lucide-react";
import type { GitHubStats } from "@/types";
import { fadeInUp, staggerChildren } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export default function GitHubStats({ stats }: { stats: GitHubStats | null }) {
  if (!stats) return null;
  const statCards = [
    { label: "Repositories", value: stats.totalRepos, icon: BookOpen },
    { label: "Stars Earned", value: stats.totalStars, icon: Star },
    { label: "Forks", value: stats.totalForks, icon: GitFork },
    { label: "Followers", value: stats.followers, icon: Users },
  ];
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-max">
        <motion.div variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// github</p>
              <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                GitHub<span className="gradient-text block">Activity.</span>
              </h2>
            </div>
            <a href={`https://github.com/${siteConfig.author.github}`} target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-secondary transition-colors text-sm">
              <Github className="w-4 h-4" />View Profile
            </a>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeInUp} custom={i} className="glass rounded-xl p-5 text-center card-hover border border-border/50">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <p className="font-display text-3xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          {stats.topLanguages.length > 0 && (
            <motion.div variants={fadeInUp} className="glass rounded-xl p-6 border border-border/50">
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Top Languages</h3>
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-4">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name} style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }} className="rounded-sm" />
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
                    <span className="text-sm font-mono text-muted-foreground">{lang.name} <span className="text-foreground">{lang.percentage}%</span></span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
