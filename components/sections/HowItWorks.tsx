import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface HowItWorksProps {
  locale: Locale;
}

const loop = [
  {
    title: "Tap a care action",
    desc: "Feed, nap, diaper, medicine, play, and growth logs stay one thumb away.",
    icon: "/assets/icons/bottle.png",
  },
  {
    title: "Earn baby XP",
    desc: "Each log adds XP, protects streaks, and makes consistency feel rewarding.",
    icon: "/assets/icons/xp-badge.png",
  },
  {
    title: "Unlock a memory",
    desc: "Milestones turn into achievements your family can revisit later.",
    icon: "/assets/icons/achievement.png",
  },
] as const;

export function HowItWorks({ locale: _locale }: HowItWorksProps) {
  return (
    <section
      id="rpg-system"
      aria-label="RPG care loop"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <h2 className="text-h2">The RPG loop is the care loop.</h2>
          <p className="mt-4 max-w-[35rem] text-lg leading-8 text-[var(--text-secondary)]">
            BabyLeveling does not gamify pressure. It makes the tiny care
            actions easier to notice, repeat, and celebrate.
          </p>
        </div>

        <div className="grid gap-4">
          {loop.map((step, index) => (
            <article
              key={step.title}
              className="card-duolingo grid gap-4 p-5 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--bg-section-alt)]">
                <Image src={step.icon} alt="" width={44} height={44} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                  {step.desc}
                </p>
              </div>
              <span className="font-display text-4xl font-bold text-[var(--accent-primary)]">
                {index + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
