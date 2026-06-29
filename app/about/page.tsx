import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin, Coffee, Code2, Lightbulb } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedCursor from "@/components/ui/AnimatedCursor";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Avijit Saha — Full Stack Developer from Dhaka, Bangladesh.",
};

const VALUES = [
  { icon: Code2, title: "Clean Code", desc: "I write code that's readable first, optimized second. Future me will thank present me." },
  { icon: Lightbulb, title: "Problem-First", desc: "I start with the problem, not the tech. The best solution is often simpler than you think." },
  { icon: Coffee, title: "Always Learning", desc: "Tech moves fast. I read, build side projects, and break things on purpose to keep learning." },
];

// ← তোমার real journey লেখো
const JOURNEY = [
  { year: "2022", title: "Started Coding", desc: "Wrote my first HTML page. Thought CSS floats made sense. I was wrong." },
  { year: "2023", title: "Fell in Love with JavaScript", desc: "Discovered React and Node.js. Built everything I could think of." },
  { year: "2024", title: "Went Full Stack", desc: "Connected databases, built APIs, deployed to production for the first time." },
  { year: "2025", title: "Leveled Up", desc: "TypeScript, Next.js, scalable architecture, real clients, real problems." },
  { year: "Now", title: "Building & Growing", desc: "Focused on writing cleaner code, taking on harder problems, and sharing what I learn." },
];

export default function AboutPage() {
  return (
    <>
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// about me</p>
              <h1 className="font-display font-extrabold leading-tight mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                Hey, I'm<span className="gradient-text block">Avijit 👋</span>
              </h1>
              {/* ← তোমার real about লেখো */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a Full Stack Developer from <span className="text-foreground font-semibold"><MapPin className="w-3.5 h-3.5 inline" /> Dhaka, Bangladesh</span> who loves building web applications that actually solve problems.
                </p>
                <p>
                  I specialize in the JavaScript ecosystem — <strong className="text-foreground">Next.js</strong>, <strong className="text-foreground">TypeScript</strong>, and <strong className="text-foreground">Node.js</strong> are my main tools. I care about clean architecture, fast performance, and interfaces that feel good to use.
                </p>
                <p>
                  When I'm not coding, I'm reading about system design, experimenting with new libraries, or helping others learn programming.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/projects" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors glow-primary-sm">
                  View My Work <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="/resume/avijit-saha-resume.pdf" download className="flex items-center gap-2 px-5 py-2.5 border border-border/60 rounded-xl text-sm font-semibold hover:border-primary/40 hover:bg-secondary transition-colors">
                  <Download className="w-4 h-4 text-primary" />Download Resume
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-110" />
              <div className="relative w-72 h-72 rounded-2xl overflow-hidden border border-border/50 glass">
                {/* Replace with your photo */}
                {/* <Image src="/profile.jpg" alt="Avijit Saha" fill className="object-cover" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="font-display font-black text-primary/20" style={{ fontSize: "8rem" }}>A</span>
                  <p className="text-xs text-muted-foreground font-mono">Add photo → <code className="text-primary">public/profile.jpg</code></p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <section className="mb-24">
            <h2 className="font-display text-3xl font-bold mb-8">How I Work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="glass rounded-xl p-6 border border-border/50 card-hover">
                  <v.icon className="w-6 h-6 text-primary mb-4" />
                  <h3 className="font-display text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Journey */}
          <section className="mb-24">
            <h2 className="font-display text-3xl font-bold mb-10">My Journey</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60" />
              <div className="space-y-8">
                {JOURNEY.map((item, i) => (
                  <div key={i} className="relative pl-14">
                    <div className={`absolute left-5 top-2 w-2 h-2 rounded-full border-2 border-background ${item.year === "Now" ? "bg-primary animate-pulse" : "bg-muted-foreground/60"}`} />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-1">
                      <span className={`font-mono text-sm font-bold ${item.year === "Now" ? "text-primary" : "text-muted-foreground"}`}>{item.year}</span>
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Fun facts */}
          <section>
            <h2 className="font-display text-3xl font-bold mb-6">Outside of Code</h2>
            <div className="glass rounded-2xl p-8 grid sm:grid-cols-2 gap-6 border border-border/50">
              {/* ← তোমার real hobbies লেখো */}
              {[
                { emoji: "📚", text: "Reading tech books and system design content" },
                { emoji: "☕", text: "Powered by tea — controversial but true" },
                { emoji: "🎯", text: "Solving LeetCode problems (sometimes)" },
                { emoji: "🌏", text: "Dreaming of working with global teams" },
              ].map((fact, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xl">{fact.emoji}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{fact.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
