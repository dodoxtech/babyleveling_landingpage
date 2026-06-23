import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { ParentModeTrustBento } from "@/components/sections/ParentModeTrustBento.client";

interface ParentModeProps {
  locale: Locale;
}

const trustIcons = [
  "/assets/icons/heart-pulse.png",
  "/assets/motion/privacy-lock.png", // richer branded illustration for privacy trust card
  "/assets/icons/family.png",
] as const;

export function ParentMode({ locale }: ParentModeProps) {
  const t = getDictionary(locale).home.parents;
  const trust = t.trust;

  return (
    <section
      id="parents"
      aria-label="Parent reassurance"
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 top-8 h-80 w-80 rounded-full bg-[var(--accent-secondary)] opacity-[0.14] blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[var(--accent-pink)] opacity-[0.10] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        {/* Heading — first in DOM for mobile; right column on desktop. */}
        <div className="lg:order-last">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-h2">{t.title}</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            {t.body}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-3">
            {t.stats.map(({ value, label }) => (
              <div key={label} className="card-duolingo px-5 py-4">
                <dt className="font-display text-3xl font-bold tabular-nums text-[var(--accent-primary)]">
                  {value}
                </dt>
                <dd className="mt-1 text-xs font-semibold leading-4 text-[var(--text-secondary)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Trust bento — calm scroll-reveal with locale-aware timing.
            Card 0 spans full width (featured); cards 1+2 are side-by-side.
            Motion is slower than reward sections: settled, not bouncing. */}
        <ParentModeTrustBento
          locale={locale}
          items={trust.map((item, i) => ({
            ...item,
            icon: trustIcons[i],
            isPrivacy: i === 1,
          }))}
        />
      </div>
    </section>
  );
}
