"use client";
import { motion } from "framer-motion";
import { Quote, Star, Linkedin } from "lucide-react";
import { testimonials } from "@/lib/data";
import { fadeInUp, staggerChildren } from "@/lib/utils";

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-max">
        <motion.div variants={staggerChildren} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// testimonials</p>
            <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              What people<span className="gradient-text block">say.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} variants={fadeInUp} custom={i} className="glass rounded-2xl p-6 border border-border/50 flex flex-col card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-primary/20 mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6 italic">"{t.content}"</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-bold text-primary text-sm">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  {t.linkedinUrl && (
                    <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
