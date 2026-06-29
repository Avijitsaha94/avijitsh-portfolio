"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function AvailableBadge() {
  if (!siteConfig.availableForWork) return null;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/20 text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="text-primary font-mono text-xs font-medium">Available for work</span>
    </motion.div>
  );
}
