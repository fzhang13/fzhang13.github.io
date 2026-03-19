"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
}

export default function SectionReveal({ children }: SectionRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
