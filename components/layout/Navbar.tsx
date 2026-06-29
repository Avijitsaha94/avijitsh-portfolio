"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "glass border-b border-border/50 py-3"
            : "py-5 bg-transparent"
        )}
      >
        <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors glow-primary-sm">
              <span className="font-display font-bold text-primary text-sm">A</span>
            </div>
            <span className="font-display font-bold text-foreground hidden sm:block">
              {siteConfig.author.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href="/resume/avijit-saha-resume.pdf"
              download
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all glow-primary-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border/50 hover:bg-secondary/80 hover:border-primary/30 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-4 h-4 text-primary" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-30 glass rounded-2xl border border-border/50 p-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/resume/avijit-saha-resume.pdf"
                download
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
