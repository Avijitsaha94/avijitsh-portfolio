"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setTimeout(() => setLoading(false), 400); return 100; }
        return prev + Math.random() * 15;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <span className="font-display text-5xl font-extrabold gradient-text">AS</span>
            <p className="mt-2 font-mono text-xs text-muted-foreground tracking-widest uppercase">Initializing...</p>
          </motion.div>
          <div className="w-48 h-px bg-border relative overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-4 font-mono text-xs text-primary">{Math.round(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
