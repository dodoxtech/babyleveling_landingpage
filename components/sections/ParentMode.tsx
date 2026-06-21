import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface ParentModeProps {
  locale: Locale;
}

const trustIcons = [
  "/assets/icons/heart-pulse.png",
  "/assets/icons/shield.png",
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

        {/* Trust bento — divider list on mobile, 2-col bento on desktop.
            Card 0 spans full width (featured); cards 1+2 are side-by-side. */}
        <ul className="divide-y divide-[var(--border-card)] lg:order-first lg:grid lg:grid-cols-2 lg:gap-3 lg:divide-y-0">
          {trust.map((item, i) => {
            const featured = i === 0;
            const last = i === trust.length - 1;

            return (
              <li
                key={item.title}
                className={[
                  /* Mobile: compact row */
                  "flex items-start gap-4",
                  i === 0 ? "pb-4" : last ? "pt-4" : "py-4",
                  /* Desktop: bento card */
                  featured ? "lg:col-span-2" : "lg:col-span-1",
                  "lg:flex lg:rounded-[var(--radius-xl)] lg:border lg:border-[var(--border-card)] lg:[box-shadow:var(--shadow-card)]",
                  featured
                    ? [
                        "lg:items-center lg:gap-6 lg:p-6",
                        "lg:bg-[var(--bg-section-alt)]",
                        /* accent left-border to lift the featured card */
                        "lg:[border-left:3px_solid_var(--accent-primary)]",
                      ].join(" ")
                    : [
                        "lg:flex-col lg:gap-3 lg:p-5",
                        "lg:[background:linear-gradient(160deg,rgba(255,255,255,0.92),rgba(255,255,255,0.74))]",
                        "lg:backdrop-blur-[16px]",
                      ].join(" "),
                ].join(" ")}
              >
                <Image
                  src={trustIcons[i]}
                  alt=""
                  width={48}
                  height={48}
                  aria-hidden="true"
                  className={[
                    "shrink-0",
                    featured
                      ? "mt-0.5 h-10 w-10 lg:mt-0 lg:h-14 lg:w-14 lg:shrink-0"
                      : "mt-0.5 h-9 w-9 lg:mt-0 lg:h-10 lg:w-10",
                  ].join(" ")}
                />

                <div className="min-w-0">
                  <h3
                    className={[
                      "font-display font-bold leading-tight",
                      featured ? "text-base lg:text-[1.15rem]" : "text-base lg:text-sm",
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={[
                      "text-sm leading-6 text-[var(--text-secondary)]",
                      featured
                        ? "mt-1 lg:mt-2 lg:text-[0.9375rem] lg:leading-7"
                        : "mt-1 lg:mt-1.5 lg:text-xs lg:leading-[1.5]",
                    ].join(" ")}
                  >
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
