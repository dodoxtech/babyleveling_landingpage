import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { RevealTrack, type RevealStage } from "./RevealTrack.client";

interface RevealProps {
  locale: Locale;
}

/**
 * Art, level number, and desktop rail position per stage. The `pos` (left %)
 * is deliberately non-uniform: the first three nodes bunch in the opening third
 * and Lv.50 sits far right, so the rail reads "fast early, gentle later" per the
 * level curve in docs/planning/00c-xp-economy.md §4 - never an equal, age-driven
 * climb. Title + journey-time note are localized (zipped by index below).
 */
const stageMeta = [
  { src: "/assets/timeline/lv01-newborn.png", level: "Lv. 1", pos: 8 },
  { src: "/assets/timeline/lv05-explorer.png", level: "Lv. 5", pos: 19 },
  { src: "/assets/timeline/lv10-little-star.png", level: "Lv. 10", pos: 31 },
  { src: "/assets/timeline/lv20-adventurer.png", level: "Lv. 20", pos: 52 },
  { src: "/assets/timeline/lv50-legend.png", level: "Lv. 50", pos: 92 },
] as const;

export function Reveal({ locale }: RevealProps) {
  const { reveal } = getDictionary(locale).home;
  const stages: RevealStage[] = stageMeta.map((meta, i) => ({
    ...meta,
    title: reveal.stages[i]?.title ?? "",
    note: reveal.stages[i]?.note ?? "",
  }));

  return (
    <section
      id="reveal"
      aria-label="The leveling journey"
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[var(--accent-tertiary)] opacity-[0.14] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[var(--accent-primary)] opacity-[0.08] blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border bg-white/70 px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)] shadow-[0_4px_0_rgba(23,32,42,0.05)] backdrop-blur"
            style={{ borderColor: "var(--border-card)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
            </span>
            {reveal.eyebrow}
          </span>
          <h2 className="mt-4 text-h2">{reveal.headline}</h2>
          <p className="mx-auto mt-5 max-w-[40rem] text-lg leading-8 text-[var(--text-secondary)]">
            {reveal.body}
          </p>
        </header>

        {/* The journey itself: five hero stages on one XP rail that charges as
            the section scrolls in, lighting each hero in turn. The rail lives in
            a glass "console" frame so it reads as a live game HUD, not a chart. */}
        <div
          className="relative mt-11 overflow-hidden rounded-[var(--radius-xl)] border px-5 pb-7 pt-5 sm:px-8 lg:mt-14 lg:px-10 lg:pb-9"
          style={{
            borderColor: "var(--border-card)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.28))",
            boxShadow: "var(--shadow-card)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Inner glow pooled under the rail. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-10 -z-0 mx-auto h-40 max-w-4xl rounded-full bg-[var(--accent-secondary)] opacity-[0.18] blur-3xl"
          />
          {/* Console label row. */}
          <div className="mb-6 flex items-center justify-between text-[var(--text-caption)]">
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em]">
              {reveal.railLabel}
            </span>
            <span className="font-display text-xs font-bold uppercase tracking-[0.16em] tabular-nums">
              Lv.1 → Lv.50
            </span>
          </div>

          <div className="relative">
            <RevealTrack stages={stages} />
          </div>
        </div>

        {/* Payoff - an "achievement unlocked" banner: the celebration up top, the
            real feed/sleep/growth log promised right beneath. */}
        <div className="mx-auto mt-7 flex max-w-3xl flex-col items-center gap-5 rounded-[var(--radius-xl)] border px-6 py-5 text-center sm:flex-row sm:gap-6 sm:text-left lg:mt-9"
          style={{
            borderColor: "var(--border-card)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.74))",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-[var(--radius-lg)] bg-grad-xp shadow-[var(--shadow-colored)]">
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-[var(--radius-lg)] bg-[var(--accent-tertiary)] opacity-30 blur-md motion-safe:animate-[aura-pulse_3s_ease-in-out_infinite]"
            />
            <Image
              src="/assets/icons/trophy.png"
              alt=""
              width={40}
              height={40}
              aria-hidden="true"
              className="relative h-9 w-9 motion-safe:animate-[wiggle_3.2s_ease-in-out_infinite]"
            />
          </div>
          <p className="flex-1 text-base leading-7 text-[var(--text-secondary)]">
            <span className="block font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
              {reveal.achievement}
            </span>
            <span className="font-display text-lg font-bold text-[var(--text-primary)]">
              {reveal.payoffLead}
            </span>{" "}
            {reveal.payoffBody}
          </p>
          <Link
            href="#rpg-system"
            className="group inline-flex shrink-0 items-center gap-1.5 font-display text-base font-bold text-[var(--accent-primary)] transition-colors hover:text-[color-mix(in_srgb,var(--accent-primary)_78%,#16202f)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)]"
          >
            <span className="transition-transform duration-300 ease-[var(--ease-press)] group-hover:translate-x-0.5">
              {reveal.cta}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
