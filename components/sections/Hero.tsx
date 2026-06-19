import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle.client";
import { SITE_DESCRIPTOR } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

interface HeroProps {
  locale: Locale;
}

const questTiles = [
  { label: "Feed", icon: "/assets/icons/bottle.png", xp: "+40 XP" },
  { label: "Sleep", icon: "/assets/icons/moon-star.png", xp: "+60 XP" },
  { label: "Growth", icon: "/assets/icons/growth-chart.png", xp: "+90 XP" },
];

export function Hero({ locale }: HeroProps) {
  void locale;

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate min-h-[calc(100dvh-4.5rem)] overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid min-h-[calc(100dvh-8rem)] w-full max-w-[calc(100vw-2rem)] items-center gap-8 sm:max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-1 min-w-0 lg:order-1">
          <div className="min-w-0 max-w-[calc(100vw-2rem)] sm:max-w-2xl">
            <p
              className="mb-4 inline-flex rounded-[var(--radius-md)] border px-3 py-1 text-sm font-bold"
              style={{
                color: "var(--accent-primary)",
                borderColor: "var(--border-card)",
                background: "rgba(255,255,255,0.76)",
              }}
            >
              Baby care as tiny quests
            </p>
            <h1 className="text-display">
              Raise your baby&apos;s{" "}
              <span className="block text-[var(--accent-primary)]">
                little hero.
              </span>
            </h1>
            <h2 className="sr-only">{SITE_DESCRIPTOR}</h2>
            <p className="mt-5 max-w-full text-lg leading-8 text-[var(--text-secondary)] sm:max-w-[34rem]">
              Track feeds, sleep, diapers, growth, and milestones with XP,
              quests, and a mascot parents actually love.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#waitlist" className="btn-primary w-full sm:w-auto">
                Join the Waitlist
              </a>
              <a href="#rpg-system" className="btn-secondary w-full sm:w-auto">
                See the Loop
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <ThemeToggle />
              <div className="rounded-[var(--radius-md)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] shadow-[0_3px_0_rgba(23,32,42,0.1)]">
                iOS and watchOS planned
              </div>
            </div>
          </div>
        </div>

        <div className="order-2 min-w-0 lg:order-2">
          <div className="relative mx-auto aspect-[1.02] w-full max-w-[calc(100vw-2rem)] sm:max-w-[38rem]">
            <div
              className="absolute inset-8 rounded-[2rem]"
              style={{ background: "var(--bg-playfield)" }}
            />
            <div className="absolute left-2 top-4 h-28 w-28 rounded-full bg-[var(--accent-secondary)] opacity-20" />
            <div className="absolute bottom-8 right-4 h-24 w-24 rounded-full bg-[var(--accent-pink)] opacity-20" />

            <div className="card-duolingo absolute left-0 top-7 w-[15rem] rotate-[-5deg] p-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/xp-badge.png"
                  alt=""
                  width={44}
                  height={44}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-lg font-bold">Lv. 5</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Explorer unlocked
                  </p>
                </div>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e9e7df]">
                <div className="h-full w-[68%] rounded-full bg-grad-xp" />
              </div>
            </div>

            <div className="card-duolingo absolute bottom-7 right-0 w-[16rem] rotate-[4deg] p-4">
              <p className="font-display text-base font-bold">
                Today&apos;s quick log
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {questTiles.map((tile) => (
                  <div
                    key={tile.label}
                    className="rounded-[var(--radius-md)] bg-[var(--bg-section-alt)] p-2 text-center"
                  >
                    <Image
                      src={tile.icon}
                      alt=""
                      width={30}
                      height={30}
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
            </div>

            <Image
              src="/assets/characters/warrior-baby-shield.png"
              alt="BabyLeveling baby hero mascot holding a star shield"
              width={420}
              height={420}
              priority
              className="absolute left-1/2 top-1/2 z-10 w-[72%] max-w-[26rem] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
