"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Mail, Github, Linkedin, Phone, MessageCircle, Loader2, Twitter, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { fadeInUp, staggerChildren } from "@/lib/utils";
import type { ContactForm } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  projectType: z.string().optional(),
});

const PROJECT_TYPES = ["Web App", "API / Backend", "Full Stack", "Consulting", "Other"];

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send. Please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.author.email,
      href: `mailto:${siteConfig.author.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.author.phone || "+880 1629404625",
      href: `tel:${siteConfig.author.phone?.replace(/\s|-/g, "") || ""}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.author.whatsapp || "+8801629404625",
      href: `https://wa.me/${siteConfig.author.whatsapp?.replace(/\+|\s|-/g, "") || ""}`,
    },
    {
      icon: Github,
      label: "GitHub",
      value: `github.com/${siteConfig.author.github}`,
      href: `https://github.com/${siteConfig.author.github}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: `linkedin.com/in/${siteConfig.author.linkedin}`,
      href: `https://linkedin.com/in/${siteConfig.author.linkedin}`,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Left */}
          <motion.div variants={fadeInUp}>
            <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">
              // contact
            </p>
            <h2
              className="font-display font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
            >
              Let's build
              <span className="gradient-text block">something.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Have a project in mind? Looking to hire? Or just want to connect?
              I'd love to hear from you. I typically respond within 24 hours.
            </p>

            {/* Contact info list */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 glass rounded-xl border border-border/50 hover:border-primary/40 card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div variants={fadeInUp}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-2xl p-6 sm:p-8 space-y-5 border border-border/50"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/70 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/70 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        {...register("projectType")}
                        type="radio"
                        value={type}
                        className="sr-only peer"
                      />
                      <span className="px-3 py-1.5 text-xs rounded-lg border border-border/50 peer-checked:border-primary/60 peer-checked:bg-primary/10 peer-checked:text-primary hover:border-border text-muted-foreground inline-block transition-all cursor-pointer">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Subject *
                </label>
                <input
                  {...register("subject")}
                  placeholder="What's this about?"
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/70 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                />
                {errors.subject && (
                  <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/70 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed glow-primary"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
