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

        <ol className="relative grid gap-4">
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[2.25rem] top-10 hidden w-px bg-[var(--border-card)] sm:block"
          />
          {loop.map((step, index) => (
            <li key={step.title}>
              <article className="card-duolingo relative flex items-center gap-3 p-4 sm:grid sm:grid-cols-[4.5rem_1fr_auto] sm:gap-4 sm:p-6">
                {/* Icon */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--bg-section-alt)] ring-4 ring-white sm:h-16 sm:w-16">
                  <Image
                    src={step.icon}
                    alt=""
                    width={44}
                    height={44}
                    aria-hidden="true"
                    className="h-8 w-8 sm:h-11 sm:w-11"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {/* Step badge — mobile only */}
                    <span className="shrink-0 rounded-full bg-[var(--accent-primary)] px-2 py-0.5 text-[10px] font-bold text-white sm:hidden">
                      {index + 1}
                    </span>
                    <h3 className="font-display text-base font-bold sm:text-2xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-[var(--text-secondary)] sm:mt-1 sm:text-sm sm:leading-6">
                    {step.desc}
                  </p>
                </div>

                {/* Big step number — desktop only */}
                <span className="hidden font-display text-4xl font-bold tabular-nums text-[var(--accent-primary)]/85 sm:block">
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
