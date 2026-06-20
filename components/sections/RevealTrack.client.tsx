"use client";

import Image from "next/image";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

export interface RevealStage {
  src: string;
  level: string;
  title: string;
  age: string;
}

interface RevealTrackProps {
  stages: readonly RevealStage[];
}

/**
 * S3's "leveling journey" - the five growth stages laid out on a single XP
 * rail that fills on scroll-in, so the section's headline ("the XP is real
 * life") is shown, not just stated. The fill is a `scaleX` transform on a
 * full-width track (origin-left), compositor-only, not an animated `width`
 * (same perf reasoning as `HeroCharacterXpBar.client.tsx`).
 *
 * Reduced / low-power: the rail renders full and nodes render in place, no
 * entrance stagger - a static composition, not a frozen mid-animation frame.
 */
export function RevealTrack({ stages }: RevealTrackProps) {
  const reducedMotion = useReducedMotion();
  // Framer's own reduced-motion read gates the layout-animation props below so
  // they never fire even on the first client frame before our hook resolves.
  const framerReduced = useFramerReducedMotion();
  const still = reducedMotion || framerReduced;

  return (
    <div className="relative">
      {/* Desktop XP rail - lives behind the node circles, centered on them. */}
      <div
        aria-hidden="true"
        className="absolute left-[10%] right-[10%] top-[3.75rem] hidden h-2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_14%,#ffffff)] lg:block"
      >
        <motion.div
          className="bg-grad-xp h-full w-full origin-left rounded-full shadow-[0_0_18px_rgba(47,117,255,0.45)]"
          initial={still ? false : { scaleX: 0.06 }}
          whileInView={still ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: still ? "scaleX(1)" : undefined }}
        />
      </div>

      <ol className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {stages.map((stage, index) => {
          const isFinal = index === stages.length - 1;
          return (
            <motion.li
              key={stage.level}
              className="relative flex w-40 shrink-0 snap-center flex-col items-center text-center lg:w-auto"
              initial={still ? false : { opacity: 0, y: 22 }}
              whileInView={still ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Character platform - sits on the rail. */}
              <div
                className={`relative z-10 grid h-[7.5rem] w-[7.5rem] place-items-center rounded-full ${
                  isFinal
                    ? "bg-grad-xp shadow-[var(--shadow-colored)]"
                    : "bg-white shadow-[var(--shadow-card)]"
                }`}
                style={{
                  border: isFinal
                    ? "2px solid color-mix(in srgb, var(--accent-tertiary) 70%, #ffffff)"
                    : "2px solid var(--border-card)",
                }}
              >
                <Image
                  src={stage.src}
                  alt={`${stage.title} - the baby hero at ${stage.level}`}
                  width={132}
                  height={132}
                  className="h-[5.75rem] w-[5.75rem] object-contain"
                />
                {isFinal && (
                  <Image
                    src="/assets/icons/trophy.png"
                    alt=""
                    width={40}
                    height={40}
                    aria-hidden="true"
                    className="absolute -right-2 -top-2 h-10 w-10 drop-shadow-md motion-safe:animate-[wiggle_2.8s_ease-in-out_infinite]"
                  />
                )}
              </div>

              {/* Level badge straddling the platform's lower edge. */}
              <span
                className={`relative z-20 -mt-3 rounded-[var(--radius-pill)] px-3 py-1 font-display text-sm font-bold text-white ${
                  isFinal ? "bg-[var(--accent-pink)]" : "bg-[var(--accent-primary)]"
                }`}
                style={{ boxShadow: "0 4px 12px rgba(22,32,47,0.18)" }}
              >
                {stage.level}
              </span>

              <h3 className="mt-3 font-display text-lg font-bold text-[var(--text-primary)]">
                {stage.title}
              </h3>
              <p className="text-sm text-[var(--text-caption)] tabular-nums">
                {stage.age}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
