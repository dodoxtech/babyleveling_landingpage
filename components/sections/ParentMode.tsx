"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAppModes } from "@/lib/content/modes";
import { useReducedMotion } from "@/lib/motion";
import { spritePath } from "@/lib/content/sprites";
import { StatNumber } from "@/components/sections/StatNumber.client";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

type ModeId = "rpg" | "parent";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface ParentModeProps {
  locale: Locale;
}

function buildStats(modes: Dictionary["home"]["modes"]) {
  const rpgStats: Stat[] = [
    { label: modes.statLevel, value: 14 },
    { label: modes.statTotalXp, value: 1240 },
    { label: modes.statDayStreak, value: 12 },
  ];

  const parentStats: Stat[] = [
    { label: modes.statFeedsLogged, value: 182 },
    { label: modes.statSleepTracked, value: 96, suffix: "%" },
    { label: modes.statWeight, value: 14, suffix: " lb" },
  ];

  return { rpgStats, parentStats };
}

/**
 * S6 — Parent Mode: The Real Tracker (Act III). The entire section is one
 * top-level `"use client"` component (not split into a server shell + island)
 * since every pixel of the panel depends on which mode is selected — the
 * same reasoning `docs/architecture/modules.md` records for `WaitlistSignup`.
 *
 * The toggle morphs the panel between a quest card (RPG) and a clinical
 * chart (Parent). `layout` + `AnimatePresence` gives a FLIP-style resize/
 * cross-fade between the two very different panel heights rather than a
 * true shared-element morph between unrelated DOM trees, which would need
 * matching every element 1:1 for little visual gain over a clean cross-fade.
 *
 * Reduced motion: panel swap and the resize both go to ~0 duration (instant
 * swap, per §7.3), and `StatNumber` skips its count-up to show the final
 * value directly.
 */
export function ParentMode({ locale }: ParentModeProps) {
  const [mode, setMode] = useState<ModeId>("rpg");
  const reducedMotion = useReducedMotion();
  const dict = getDictionary(locale);
  const appModes = getAppModes(locale);
  const active = appModes.find((m) => m.id === mode) ?? appModes[0];
  const transitionDuration = reducedMotion ? 0 : 0.35;
  const { rpgStats, parentStats } = buildStats(dict.home.modes);

  return (
    <section
      id="parents"
      aria-label="S6 · Parent Mode"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
          {dict.home.modes.eyebrow}
        </p>
        <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
          {dict.home.modes.title}
        </h2>

        <div
          role="tablist"
          aria-label={dict.home.modes.tablistLabel}
          className="glass mx-auto mt-10 inline-flex rounded-full p-1"
        >
          {appModes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)] ${
                mode === m.id
                  ? "bg-grad-plasma text-white"
                  : "text-lo hover:text-hi"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="relative mt-10 text-left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              layout
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{
                duration: transitionDuration,
                layout: { duration: transitionDuration },
              }}
              className="glass rounded-3xl p-8"
            >
              <p className="text-base text-lo">{active.promise}</p>
              <ul className="mt-6 space-y-2">
                {active.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm text-hi"
                  >
                    <span aria-hidden="true" className="mt-0.5 text-lo">
                      •
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {mode === "parent" ? (
                <ChartPanel
                  reducedMotion={reducedMotion}
                  stats={parentStats}
                  chartAlt={dict.home.modes.chartAlt}
                />
              ) : (
                <QuestPanel reducedMotion={reducedMotion} stats={rpgStats} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/** RPG-mode panel: sprite + the quest-card stat trio. */
function QuestPanel({
  reducedMotion,
  stats,
}: {
  reducedMotion: boolean;
  stats: Stat[];
}) {
  return (
    <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon inside an interactive panel */}
      <img src={spritePath("babyGirl.excited")} alt="" width={48} height={48} />
      <div className="grid flex-1 grid-cols-3 gap-3 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <StatNumber
              value={stat.value}
              suffix={stat.suffix}
              reducedMotion={reducedMotion}
            />
            <p className="mt-1 text-xs text-lo">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Parent-mode panel: a clean, flatter chart + the same stats read as health data. */
function ChartPanel({
  reducedMotion,
  stats,
  chartAlt,
}: {
  reducedMotion: boolean;
  stats: Stat[];
  chartAlt: string;
}) {
  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <svg
        viewBox="0 0 240 64"
        className="h-16 w-full"
        role="img"
        aria-label={chartAlt}
      >
        <motion.polyline
          points="0,52 40,46 80,40 120,34 160,22 200,16 240,8"
          fill="none"
          stroke="var(--accent-growth)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reducedMotion ? false : { pathLength: 0 }}
          whileInView={reducedMotion ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <StatNumber
              value={stat.value}
              suffix={stat.suffix}
              reducedMotion={reducedMotion}
            />
            <p className="mt-1 text-xs text-lo">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
