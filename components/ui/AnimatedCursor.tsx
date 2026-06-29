"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer" || target.tagName === "A" || target.tagName === "BUTTON");
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", () => setIsHidden(true));
    document.addEventListener("mouseenter", () => setIsHidden(false));
    return () => { document.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  return (
    <>
      <motion.div className="fixed pointer-events-none z-[9998] rounded-full border border-primary/50"
        animate={{ x: position.x - 16, y: position.y - 16, width: isPointer ? 44 : 32, height: isPointer ? 44 : 32, opacity: isHidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} />
      <motion.div className="fixed pointer-events-none z-[9998] rounded-full bg-primary"
        animate={{ x: position.x - 3, y: position.y - 3, opacity: isHidden ? 0 : 1 }}
        style={{ width: 6, height: 6 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
    </>
  );
}
