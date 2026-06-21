"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionValue,
  useReducedMotion as useFramerReducedMotion,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motion";

export interface RevealStage {
  src: string;
  level: string;
  /** Desktop rail position as a left-% (non-uniform: fast-early, gentle-late). */
  pos: number;
  title: string;
  /** Journey-time / effort label (e.g. "Week one") - never the baby's age. */
  note: string;
}

interface RevealTrackProps {
  stages: readonly RevealStage[];
}

/** The rail spans these insets; nodes + comet are positioned in the same frame. */
const RAIL_START = 8; // %
const RAIL_SPAN = 84; // %  (8% -> 92%)

/** Decorative XP motes drifting behind the rail (desktop only). */
const MOTES = [
  { l: "14%", t: "8%", d: "5.5s", delay: "0s" },
  { l: "33%", t: "78%", d: "6.5s", delay: "0.8s" },
  { l: "52%", t: "12%", d: "5s", delay: "1.6s" },
  { l: "67%", t: "82%", d: "7s", delay: "0.4s" },
  { l: "82%", t: "16%", d: "6s", delay: "1.1s" },
  { l: "92%", t: "70%", d: "5.8s", delay: "2s" },
] as const;

/**
 * S3's "leveling journey" reimagined as a live XP console: a single energy rail
 * that *charges* as the section scrolls into view, with a glowing comet riding
 * the fill tip. Each hero stage powers on - desaturated -> full colour, badge
 * pops, label rises - exactly as the energy reaches its node, so the headline
 * ("the XP is real life") is dramatised, not just stated.
 *
 * Pacing is non-uniform (`pos`), early nodes bunched and Lv.50 far right, per the
 * curve in docs/planning/00c-xp-economy.md §4. Fill is compositor-only (`scaleX`).
 *
 * Reduced / low-power: `fill` is pinned to 1, so the rail is full, every hero is
 * lit, and all looping flourishes are gated off - a complete static composition.
 */
export function RevealTrack({ stages }: RevealTrackProps) {
  const reducedMotion = useReducedMotion();
  const framerReduced = useFramerReducedMotion();
  const still = Boolean(reducedMotion || framerReduced);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });
  const rawFill = useTransform(scrollYProgress, [0, 1], [0.04, 1]);
  const springFill = useSpring(rawFill, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });
  const full = useMotionValue(1);
  const fill = still ? full : springFill;

  // Comet head + counter-scale for the sheen (so it stays crisp at any fill).
  const cometLeft = useTransform(
    fill,
    (f) => `calc(${RAIL_START}% + ${(f * RAIL_SPAN).toFixed(2)}%)`,
  );
  const inverseFill = useTransform(fill, (f) => 1 / Math.max(f, 0.04));

  return (
    <div ref={ref} className="relative">
      {/* Ambient XP motes (desktop). */}
      {!still && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        >
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[var(--accent-tertiary)] opacity-0 shadow-[0_0_8px_var(--accent-tertiary)] motion-safe:animate-[twinkle_var(--d)_ease-in-out_infinite]"
              style={
                {
                  left: m.l,
                  top: m.t,
                  "--d": m.d,
                  animationDelay: m.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Desktop XP rail - the energy track the nodes sit on. */}
      <div
        aria-hidden="true"
        className="absolute left-[8%] right-[8%] top-[4.25rem] hidden -translate-y-1/2 lg:block"
      >
        {/* Groove. */}
        <div className="relative h-2.5 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_12%,#ffffff)] shadow-[inset_0_1px_3px_rgba(22,32,47,0.2)]">
          {/* Energy fill. */}
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left overflow-hidden rounded-full bg-grad-xp shadow-[0_0_22px_rgba(47,117,255,0.45)]"
            style={{ scaleX: fill }}
          >
            {/* Static top gloss. */}
            <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
            {/* Sweeping specular sheen (counter-scaled to stay crisp). */}
            {!still && (
              <motion.div
                className="absolute inset-0 origin-left"
                style={{ scaleX: inverseFill }}
              >
                <span className="absolute inset-y-0 left-0 w-1/3 motion-safe:animate-[xp-sheen_3.4s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Comet head riding the fill tip. */}
        {!still && (
          <motion.span
            className="absolute top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_6px_color-mix(in_srgb,var(--accent-primary)_55%,transparent)]"
            style={{ left: cometLeft }}
          >
            <span className="absolute inset-[2px] rounded-full bg-grad-xp" />
            <span className="absolute -inset-2 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_45%,transparent)] motion-safe:animate-[comet-pulse_1.7s_ease-out_infinite]" />
          </motion.span>
        )}
      </div>

      {/* Mobile: equal snap-scroll cards (labels carry the pacing story there).
          Desktop: nodes are absolutely placed at their non-uniform `pos` %. */}
      <ol className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] lg:block lg:h-64 lg:gap-0 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {stages.map((stage, index) => (
          <StageNode
            key={stage.level}
            stage={stage}
            isFinal={index === stages.length - 1}
            fill={fill}
            threshold={(stage.pos - RAIL_START) / RAIL_SPAN}
            still={still}
          />
        ))}
      </ol>
    </div>
  );
}

interface StageNodeProps {
  stage: RevealStage;
  isFinal: boolean;
  fill: MotionValue<number>;
  threshold: number;
  still: boolean;
}

function StageNode({ stage, isFinal, fill, threshold, still }: StageNodeProps) {
  const accent = isFinal ? "var(--accent-tertiary)" : "var(--accent-primary)";

  // Activation 0 -> 1 as the energy fill reaches this node's position.
  const a = useTransform(fill, [threshold - 0.05, threshold + 0.03], [0, 1], {
    clamp: true,
  });
  const platformScale = useTransform(a, [0, 1], [0.9, 1]);
  const charOpacity = useTransform(a, [0, 1], [0.42, 1]);
  const charFilter = useTransform(
    a,
    (v) =>
      `grayscale(${((1 - v) * 0.9).toFixed(2)}) saturate(${(0.55 + v * 0.65).toFixed(2)})`,
  );
  const platformShadow = useTransform(
    a,
    (v) =>
      `0 0 0 ${(v * 4).toFixed(1)}px color-mix(in srgb, ${accent} ${(v * 28).toFixed(0)}%, transparent), ${
        isFinal ? "var(--shadow-colored)" : "var(--shadow-card)"
      }`,
  );
  const badgeScale = useTransform(a, [0.4, 1], [0.5, 1]);
  const badgeOpacity = useTransform(a, [0.3, 0.65], [0, 1]);
  const labelOpacity = useTransform(a, [0.55, 1], [0, 1]);
  const labelY = useTransform(a, [0.55, 1], [12, 0]);

  return (
    <li
      style={{ "--pos": `${stage.pos}%` } as CSSProperties}
      className="group relative flex w-40 shrink-0 snap-center flex-col items-center text-center lg:absolute lg:top-2 lg:left-[var(--pos)] lg:-ml-16 lg:w-32"
    >
      {/* Character platform - sits on the rail, glows + scales as it powers on. */}
      <motion.div
        className="relative grid h-[7.5rem] w-[7.5rem] place-items-center rounded-full bg-white"
        style={{
          scale: platformScale,
          boxShadow: platformShadow,
          border: isFinal
            ? "2px solid color-mix(in srgb, var(--accent-tertiary) 70%, #ffffff)"
            : "2px solid var(--border-card)",
        }}
      >
        {/* Legend radiant aura. */}
        {isFinal && !still && (
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent-tertiary)_50%,transparent),transparent_70%)] motion-safe:animate-[aura-pulse_2.8s_ease-in-out_infinite]"
          />
        )}

        {/* Hover ring (desktop) - no transform on the platform, so it never
            fights the activation scale above. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full ring-0 ring-[color-mix(in_srgb,var(--accent-primary)_40%,transparent)] transition-all duration-300 ease-[var(--ease-out-premium)] lg:group-hover:ring-[6px]"
        />

        <motion.div
          className="relative motion-safe:lg:group-hover:animate-[idle-bob_2.6s_ease-in-out_infinite]"
          style={{ opacity: charOpacity, filter: charFilter }}
        >
          <Image
            src={stage.src}
            alt={`${stage.title} - the baby hero at ${stage.level}`}
            width={132}
            height={132}
            className="h-[5.75rem] w-[5.75rem] object-contain"
          />
        </motion.div>

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
      </motion.div>

      {/* Level badge straddling the platform's lower edge. */}
      <motion.span
        className={`relative z-20 -mt-3 rounded-[var(--radius-pill)] px-3 py-1 font-display text-sm font-bold text-white ${
          isFinal ? "bg-[var(--accent-pink)]" : "bg-[var(--accent-primary)]"
        }`}
        style={{
          scale: badgeScale,
          opacity: badgeOpacity,
          boxShadow: "0 4px 12px rgba(22,32,47,0.18)",
        }}
      >
        {stage.level}
      </motion.span>

      <motion.div style={{ opacity: labelOpacity, y: labelY }}>
        <h3 className="mt-3 font-display text-lg font-bold text-[var(--text-primary)]">
          {stage.title}
        </h3>
        <p className="text-sm text-[var(--text-caption)]">{stage.note}</p>
      </motion.div>
    </li>
  );
}
