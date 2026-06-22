"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

interface ParentModeLockRevealProps {
  src: string;
  className?: string;
  size: number;
}

/**
 * Animates the shield/privacy icon into view with a trust-archetype motion:
 * fade up from 8px (400ms power2.out), then a brief scale snap (1→1.1→1)
 * to simulate a lock clicking shut. Reduced motion: static render.
 */
export function ParentModeLockReveal({ src, className, size }: ParentModeLockRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        aria-hidden="true"
        className={className}
      />
    );
  }

  return (
    <motion.div
      className="inline-flex shrink-0"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 0.85 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ delay: 0.38, type: "spring", damping: 8, stiffness: 260 }}
      >
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          aria-hidden="true"
          className={className}
        />
      </motion.div>
    </motion.div>
  );
}
