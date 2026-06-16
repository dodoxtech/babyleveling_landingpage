"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { spritePath, type SpriteKey } from "@/lib/content/sprites";
import type { Feature } from "@/lib/content/features";

interface FeatureCardProps {
  feature: Feature;
  index: number;
  className?: string;
}

/**
 * One S5 glass card: scale+blur-in on scroll (per the storyboard — "staggered
 * scale+blur-in from depth", explicitly not the generic slide-up banned in
 * §7's motion principles) with a per-card accent glow, and a hover/focus
 * XP-bar micro-anim. The bar fill is a plain CSS `transition-transform`
 * (`scaleX` on a full-width, `origin-left` track) rather than an animated
 * `width` — `width` is a layout property and forces reflow on every hover/
 * focus, where `transform` is compositor-only (TASK-0008 perf hardening).
 * It's a hover/focus affordance, not an entrance, so the project-wide
 * `prefers-reduced-motion` CSS block (globals.css) already collapses its
 * duration to ~0 for those users; only the scroll-triggered entrance needs
 * the explicit `useReducedMotion()` gate Framer Motion can't pick up from
 * that media query on its own (it animates inline styles directly,
 * bypassing CSS transitions).
 *
 * `tabIndex={0}` + `focus-visible`/`focus` styling makes the card itself
 * focusable so keyboard users can reach the same hover micro-interaction
 * (the only "interactive" affordance a showcase card has).
 */
export function FeatureCard({ feature, index, className }: FeatureCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      tabIndex={0}
      initial={
        reducedMotion
          ? false
          : { opacity: 0, scale: 0.92, filter: "blur(12px)" }
      }
      whileInView={
        reducedMotion
          ? undefined
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.6,
        delay: reducedMotion ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group glass relative overflow-hidden rounded-2xl p-6 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-25 blur-3xl"
        style={{ background: feature.accent }}
      />

      <div className="relative z-10">
        {/* eslint-disable-next-line @next/next/no-img-element -- small decorative card icon */}
        <img
          src={spritePath(feature.icon as SpriteKey)}
          alt=""
          width={32}
          height={32}
        />
        <h3 className="font-display mt-4 text-xl text-hi">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-lo">{feature.blurb}</p>

        <div
          aria-hidden="true"
          className="mt-5 h-1 w-full origin-left scale-x-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus:scale-x-100"
          style={{ backgroundColor: feature.accent }}
        />
      </div>
    </motion.div>
  );
}
