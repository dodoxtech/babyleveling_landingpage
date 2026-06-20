import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { RevealTrack, type RevealStage } from "./RevealTrack.client";

interface RevealProps {
  locale: Locale;
}

const stages: readonly RevealStage[] = [
  { src: "/assets/timeline/lv01-newborn.png", level: "Lv. 1", title: "Newborn", age: "0-1 mo" },
  { src: "/assets/timeline/lv05-explorer.png", level: "Lv. 5", title: "Explorer", age: "3-4 mo" },
  { src: "/assets/timeline/lv10-little-star.png", level: "Lv. 10", title: "Little Star", age: "6-9 mo" },
  { src: "/assets/timeline/lv20-adventurer.png", level: "Lv. 20", title: "Adventurer", age: "12-18 mo" },
  { src: "/assets/timeline/lv50-legend.png", level: "Lv. 50", title: "Legend", age: "2+ yr" },
];

export function Reveal({ locale }: RevealProps) {
  const { reveal } = getDictionary(locale).home;

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
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            The leveling journey
          </p>
          <h2 className="mt-3 text-h2">{reveal.headline}</h2>
          <p className="mx-auto mt-5 max-w-[40rem] text-lg leading-8 text-[var(--text-secondary)]">
            {reveal.body}
          </p>
        </header>

        {/* The journey itself: five stages on one XP rail that fills on scroll-in. */}
        <div className="mt-12 lg:mt-16">
          <RevealTrack stages={stages} />
        </div>

        {/* Payoff - the old trophy aside, folded back into the narrative instead
            of floating beside it: the celebration up top, the real log beneath. */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 rounded-[var(--radius-xl)] border bg-white/70 px-6 py-5 text-center sm:flex-row sm:text-left"
          style={{ borderColor: "var(--border-card)" }}
        >
          <Image
            src="/assets/icons/trophy.png"
            alt=""
            width={52}
            height={52}
            aria-hidden="true"
            className="h-12 w-12 shrink-0"
          />
          <p className="flex-1 text-base leading-7 text-[var(--text-secondary)]">
            <span className="font-display font-bold text-[var(--text-primary)]">
              First smile becomes a trophy.
            </span>{" "}
            Every level is something to celebrate, and the full feed, sleep, and
            growth log stays right underneath.
          </p>
          <Link
            href="#rpg-system"
            className="group inline-flex shrink-0 items-center gap-1.5 font-display text-base font-bold text-[var(--accent-primary)] transition-colors hover:text-[color-mix(in_srgb,var(--accent-primary)_78%,#16202f)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)]"
          >
            {reveal.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
