import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface HowItWorksProps {
  locale: Locale;
}

/** Icons stay locale-independent; copy is zipped in by index from the dictionary. */
const stepIcons = [
  "/assets/icons/bottle.png",
  "/assets/icons/xp-badge.png",
  "/assets/icons/achievement.png",
] as const;

export function HowItWorks({ locale }: HowItWorksProps) {
  const t = getDictionary(locale).home.loop;
  const loop = t.steps.map((step, i) => ({ ...step, icon: stepIcons[i] }));

  return (
    <section
      id="rpg-system"
      aria-label="RPG care loop"
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <AmbientField />

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-h2">{t.title}</h2>
          <p className="mt-5 max-w-[35rem] text-lg leading-8 text-[var(--text-secondary)]">
            {t.body}
          </p>

          <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
            {t.stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-[var(--radius-md)] bg-white/70 p-4 text-center shadow-[0_4px_0_rgba(23,32,42,0.06)]"
              >
                <dt className="font-display text-3xl font-bold tabular-nums text-[var(--accent-primary)]">
                  {value}
                </dt>
                <dd className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="relative grid gap-5">
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[2.25rem] top-10 hidden w-px bg-[var(--border-card)] sm:block"
          />
          {loop.map((step, index) => (
            <li key={step.title}>
              <article className="card-duolingo relative grid gap-4 p-6 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--bg-section-alt)] ring-4 ring-white">
                  <Image
                    src={step.icon}
                    alt=""
                    width={44}
                    height={44}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                    {step.desc}
                  </p>
                </div>
                <span className="font-display text-5xl font-bold tabular-nums text-[var(--accent-primary)]/85 sm:text-4xl">
                  {index + 1}
                </span>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Soft ambient gradient field that gives full-height sections depth instead
 *  of stranding centred content in empty space. Decorative only. */
function AmbientField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[var(--accent-secondary)] opacity-[0.16] blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[var(--accent-pink)] opacity-[0.10] blur-3xl" />
    </div>
  );
}
