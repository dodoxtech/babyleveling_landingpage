import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface ParentModeProps {
  locale: Locale;
}

const quotes = [
  {
    quote: "It made the 3 a.m. logs feel less lonely.",
    author: "Mina R.",
    role: "Parent of a 5 month old",
  },
  {
    quote: "My partner checks the quest log before asking what happened.",
    author: "Caleb N.",
    role: "Dad of twins",
  },
] as const;

export function ParentMode({ locale: _locale }: ParentModeProps) {
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

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_6px_0_rgba(23,32,42,0.1)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {quotes.map((item) => (
              <blockquote
                key={item.author}
                className="rounded-[var(--radius-xl)] bg-[var(--bg-section-alt)] p-6"
              >
                <p className="font-display text-2xl font-bold leading-tight">
                  &quot;{item.quote}&quot;
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-primary)] font-display font-bold text-white">
                    {item.author.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {item.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            Built for real days
          </p>
          <Image
            src="/assets/icons/heart-pulse.png"
            alt=""
            width={72}
            height={72}
            aria-hidden="true"
            className="mt-4"
          />
          <h2 className="mt-5 text-h2">For tired parents, not perfect ones.</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            The tone is cheerful, but the product stays practical: fast entry,
            shared context, and a clear record when the day gets blurry.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            {[
              ["3 s", "to log a care action"],
              ["3 a.m.", "friendly, dark, one-handed"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-[var(--radius-md)] bg-white/70 p-4 shadow-[0_4px_0_rgba(23,32,42,0.06)]"
              >
                <dt className="font-display text-2xl font-bold tabular-nums text-[var(--accent-primary)]">
                  {value}
                </dt>
                <dd className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
