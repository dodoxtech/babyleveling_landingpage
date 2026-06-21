import Image from "next/image";
import { HeroMascot } from "@/components/sections/HeroMascot.client";
import { ThemeToggle } from "@/components/ui/ThemeToggle.client";
import { SITE_DESCRIPTOR } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = getDictionary(locale).home.hero;

  const questTiles = [
    { label: t.questFeed, icon: "/assets/icons/bottle.png", xp: "+40 XP" },
    { label: t.questSleep, icon: "/assets/icons/moon-star.png", xp: "+60 XP" },
    {
      label: t.questGrowth,
      icon: "/assets/icons/growth-chart.png",
      xp: "+90 XP",
    },
  ];

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate overflow-hidden px-4 pb-10 pt-6 sm:px-6 sm:py-8 lg:min-h-[calc(100dvh-4.5rem)] lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 sm:gap-8 lg:min-h-[calc(100dvh-8rem)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-1 min-w-0 lg:order-1">
          <div className="min-w-0 max-w-full sm:max-w-2xl">
            <p
              className="mb-4 inline-flex rounded-[var(--radius-md)] border px-3 py-1 text-sm font-bold"
              style={{
                color: "var(--accent-primary)",
                borderColor: "var(--border-card)",
                background: "rgba(255,255,255,0.76)",
              }}
            >
              {t.eyebrow}
            </p>
            <h1 className="text-display break-words">
              {t.headlineLead}{" "}
              <span className="block text-[var(--accent-primary)]">
                {t.headlineEmphasis}
              </span>
            </h1>
            <h2 className="sr-only">{SITE_DESCRIPTOR}</h2>
            <p className="mt-5 max-w-full text-lg leading-8 text-[var(--text-secondary)] sm:max-w-[34rem]">
              {t.tagline}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#waitlist" className="btn-primary w-full sm:w-auto">
                {t.ctaPrimary}
              </a>
            </div>

            <div className="mt-7 hidden flex-wrap items-center gap-4 sm:flex">
              <ThemeToggle />
              <div className="rounded-[var(--radius-md)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] shadow-[0_3px_0_rgba(23,32,42,0.1)]">
                {t.platformNote}
              </div>
            </div>
          </div>
        </div>

        <div className="order-2 min-w-0 lg:order-2">
          <div className="w-full sm:hidden">
            <MobileCharacterSheet
              platformNote={t.platformNote}
              status={t.cardLevelStatus}
              title={t.cardQuickLog}
              tiles={questTiles}
            />
          </div>

          {/* Desktop (sm+): the original floating collage. */}
          <div className="relative mx-auto hidden aspect-[1.02] w-full max-w-[calc(100vw-2rem)] sm:block sm:max-w-[38rem]">
            <div
              className="absolute inset-8 rounded-[2rem]"
              style={{ background: "var(--bg-playfield)" }}
            />
            <div className="absolute left-2 top-4 h-28 w-28 rounded-full bg-[var(--accent-secondary)] opacity-20" />
            <div className="absolute bottom-8 right-4 h-24 w-24 rounded-full bg-[var(--accent-pink)] opacity-20" />

            <div className="card-duolingo absolute left-0 top-7 w-[15rem] rotate-[-5deg] p-4">
              <LevelCardBody status={t.cardLevelStatus} />
            </div>

            <div className="card-duolingo absolute bottom-7 right-0 w-[16rem] rotate-[4deg] p-4">
              <QuickLogCardBody title={t.cardQuickLog} tiles={questTiles} />
            </div>

            <HeroMascot />
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileCharacterSheet({
  platformNote,
  status,
  title,
  tiles,
}: {
  platformNote: string;
  status: string;
  title: string;
  tiles: { label: string; icon: string; xp: string }[];
}) {
  return (
    <div className="card-duolingo w-full max-w-full overflow-hidden p-3">
      <div
        className="relative grid min-h-[15rem] grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[1.6rem] p-3"
        style={{ background: "var(--bg-playfield)" }}
      >
        <div className="absolute left-5 top-5 h-20 w-20 rounded-full bg-[var(--accent-secondary)] opacity-20" />
        <div className="absolute bottom-4 right-4 h-24 w-24 rounded-full bg-[var(--accent-pink)] opacity-20" />

        <div className="relative z-10 flex min-w-0 flex-col justify-between gap-3">
          <div className="rounded-[var(--radius-lg)] bg-white/78 p-3 shadow-[0_4px_0_rgba(23,32,42,0.07)] backdrop-blur">
            <LevelCardBody status={status} compact />
          </div>
          <div className="rounded-[var(--radius-lg)] bg-white/70 p-3 text-center font-display text-xs font-bold text-[var(--text-secondary)] shadow-[0_4px_0_rgba(23,32,42,0.06)] backdrop-blur">
            {platformNote}
          </div>
        </div>

        <div className="relative z-10 flex min-w-0 items-end justify-center">
          <HeroMascot className="w-[115%] max-w-[14.5rem] translate-y-2 motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="mt-3">
        <QuickLogCardBody title={title} tiles={tiles} compact />
      </div>

      <div className="mt-3 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
}

/** Inner content of the "Lv. 5" progress card, shared by the mobile stack and
 * the desktop collage so only the wrapper (position/rotation) differs. */
function LevelCardBody({
  status,
  compact = false,
}: {
  status: string;
  compact?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Image
          src="/assets/icons/xp-badge.png"
          alt=""
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          aria-hidden="true"
        />
        <div>
          <p
            className={`font-display font-bold ${compact ? "text-base" : "text-lg"}`}
          >
            Lv. 5
          </p>
          <p
            className={`${compact ? "text-xs leading-4" : "text-sm"} text-[var(--text-secondary)]`}
          >
            {status}
          </p>
        </div>
      </div>
      <div
        className={`${compact ? "mt-2 h-2.5" : "mt-3 h-3"} overflow-hidden rounded-full bg-[#e9e7df]`}
      >
        <div className="h-full w-[68%] rounded-full bg-grad-xp" />
      </div>
    </>
  );
}

/** Inner content of the "Quick Log" quest-tile card, shared across layouts. */
function QuickLogCardBody({
  title,
  tiles,
  compact = false,
}: {
  title: string;
  tiles: { label: string; icon: string; xp: string }[];
  compact?: boolean;
}) {
  return (
    <>
      <p
        className={`font-display font-bold ${compact ? "text-sm" : "text-base"}`}
      >
        {title}
      </p>
      <div className={`${compact ? "mt-2" : "mt-3"} grid grid-cols-3 gap-2`}>
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-[var(--radius-md)] bg-[var(--bg-section-alt)] p-2 text-center"
          >
            <Image
              src={tile.icon}
              alt=""
              width={compact ? 26 : 30}
              height={compact ? 26 : 30}
              className="mx-auto"
              aria-hidden="true"
            />
            <p className="mt-1 text-[0.7rem] font-bold">{tile.label}</p>
            <p className="text-[0.65rem] text-[var(--accent-primary)]">
              {tile.xp}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
