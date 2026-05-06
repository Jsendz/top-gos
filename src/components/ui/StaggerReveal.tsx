"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function StaggerReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.12,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const offsets = {
    up:    { x: 0,   y: 28 },
    left:  { x: 36,  y: 0 },
    right: { x: -36, y: 0 },
    none:  { x: 0,   y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offsets[direction] },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
