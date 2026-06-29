import Link from "next/link";
import { Github, Linkedin, Twitter, Facebook, Mail, Heart } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg text-foreground">
              {siteConfig.author.name}
            </p>
            <p className="text-sm text-muted-foreground mt-1 font-mono">
              Full Stack Developer · Dhaka, Bangladesh
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: `https://github.com/${siteConfig.author.github}`, label: "GitHub" },
              { icon: Linkedin, href: `https://linkedin.com/in/${siteConfig.author.linkedin}`, label: "LinkedIn" },
              { icon: Twitter, href: `https://twitter.com/${siteConfig.author.twitter || ""}`, label: "Twitter" },
              { icon: Facebook, href: `https://facebook.com/${siteConfig.author.facebook || ""}`, label: "Facebook" },
              { icon: Mail, href: `mailto:${siteConfig.author.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> · {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
