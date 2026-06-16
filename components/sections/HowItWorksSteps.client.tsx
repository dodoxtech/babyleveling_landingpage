"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import { spritePath, type SpriteKey } from "@/lib/content/sprites";
import type { LoopStep } from "@/lib/content/loop";

interface HowItWorksStepsProps {
  steps: LoopStep[];
}

/**
 * S4 — the care->XP mapping rendered as glass chips (real action -> reward),
 * each "popping" with a spring as it scrolls into view (per the storyboard's
 * "reward chip pops with spring + sprite icon spark"). Pure DOM/CSS — no
 * WebGL (a third scene would break R-1) and no GSAP pin, since a four-step
 * pinned scrub here would add scroll-trap risk for little narrative payoff
 * over a per-card `whileInView` reveal; each card still advances in scroll
 * order, so the sequence still reads as scrubbed.
 *
 * Reduced motion: every card renders at its final, fully-visible state with
 * no entrance transition (per §7.3 — "elements appear immediately").
 */
export function HowItWorksSteps({ steps }: HowItWorksStepsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.85, y: 16 }}
          whileInView={
            reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
          }
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            type: "spring",
            damping: 14,
            stiffness: 180,
            delay: reducedMotion ? 0 : index * 0.08,
          }}
          className="glass flex flex-1 basis-56 items-center gap-4 rounded-2xl px-5 py-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon, not the LCP element */}
          <img
            src={spritePath(step.icon as SpriteKey)}
            alt=""
            width={36}
            height={36}
          />
          <div className="text-left">
            <p className="text-sm text-lo">{step.realAction}</p>
            <p className="text-base font-semibold text-hi">{step.gameReward}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
