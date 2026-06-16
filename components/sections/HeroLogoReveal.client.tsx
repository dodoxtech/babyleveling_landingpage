"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

interface HeroLogoRevealProps {
  text: string;
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035 },
  },
};

const letter = {
  hidden: { y: "-0.6em", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, damping: 9, stiffness: 200 },
  },
};

/**
 * The "logo animates in (letters drop with bounce)" beat from the hero
 * feature doc, applied to the headline's first line.
 *
 * Important: Framer Motion resolves `initial` state to inline styles during
 * SSR (there's no JS yet to compute it otherwise), so a naive
 * `initial="hidden" animate="visible"` would server-render the headline at
 * `opacity:0` — invisible text that would actively hurt LCP (the opposite of
 * R-2). To avoid that, this renders the **plain static text** (fully
 * opaque, no Framer Motion involved) until after mount, then swaps in the
 * animated per-character version for the drop-in flourish. The text node
 * that's present at first paint is always fully visible.
 *
 * Under reduced motion / low-power, stays on the plain static text forever —
 * no stagger, no spring, no bounce.
 */
export function HeroLogoReveal({ text }: HeroLogoRevealProps) {
  const reducedMotion = useReducedMotion();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    // Next frame: swap to the animated version. The plain text has already
    // painted by now, so this can't regress LCP — it only adds the flourish.
    const raf = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  if (!animateIn) {
    return <span className="block">{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={container}
      className="block"
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block whitespace-nowrap"
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              variants={letter}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
