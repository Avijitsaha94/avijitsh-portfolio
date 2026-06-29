"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Twitter , Mail } from "lucide-react";
import AvailableBadge from "@/components/ui/AvailableBadge";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerChildren } from "@/lib/utils";

const SOCIAL_LINKS = [
  { icon: Github, href: `https://github.com/${siteConfig.author.github}`, label: "GitHub" },
  { icon: Linkedin, href: `https://linkedin.com/in/${siteConfig.author.linkedin}`, label: "LinkedIn" },
  { icon: Twitter, href: `https://twitter.com/${siteConfig.author.twitter || ""}`, label: "Twitter" },
  
  { icon: Mail, href: `mailto:${siteConfig.author.email}`, label: "Email" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />

      <div className="container-max section-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <AvailableBadge />
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={fadeInUp}
              className="font-mono text-sm text-primary mb-3 tracking-widest uppercase"
            >
              Hi, I'm
            </motion.p>

            {/* Big name — Furqan style */}
            <motion.h1
              variants={fadeInUp}
              className="font-display font-extrabold leading-[0.95] tracking-tight mb-4"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
            >
              <span className="text-foreground">Avijit</span>
              <br />
              <span className="gradient-text text-glow">Saha.</span>
            </motion.h1>

            {/* Designation */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-primary font-mono font-medium mb-4"
            >
              Full Stack Developer
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base text-muted-foreground max-w-lg leading-relaxed mb-8"
            >
              Building high-performance web applications using Next.js, TypeScript,
              and Node.js — from clean architecture to seamless deployment.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                href="/projects"
                className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all glow-primary"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="/resume/avijit-saha-resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border/70 hover:border-primary/50 hover:bg-secondary/80 font-semibold transition-all"
              >
                <Download className="w-4 h-4 text-primary" />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110 animate-pulse-glow" />

              {/* Photo container */}
              <div className="relative w-96 h-96 rounded-full border-2 border-primary/30 overflow-hidden glow-primary">
                <Image
                  src="/profile.jpg"
                  alt={siteConfig.author.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Fallback if no photo */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                  <span className="font-display font-black text-primary/20"
                    style={{ fontSize: "8rem" }}>
                    A
                  </span>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -left-16 top-1/4 glass rounded-xl px-4 py-3 border border-primary/20"
              >
                <p className="font-display font-bold text-2xl text-primary">3+</p>
                <p className="text-xs text-muted-foreground font-mono">Years Exp.</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-16 bottom-1/4 glass rounded-xl px-4 py-3 border border-primary/20"
              >
                <p className="font-display font-bold text-2xl text-primary">10+</p>
                <p className="text-xs text-muted-foreground font-mono">Projects</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
