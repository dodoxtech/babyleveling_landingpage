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
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="rounded-[2rem] bg-white p-5 shadow-[0_6px_0_rgba(23,32,42,0.1)]">
          <div className="grid gap-4 sm:grid-cols-2">
            {quotes.map((item) => (
              <blockquote key={item.author} className="rounded-[var(--radius-xl)] bg-[var(--bg-section-alt)] p-6">
                <p className="font-display text-2xl font-bold leading-tight">
                  &quot;{item.quote}&quot;
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-primary)] font-display font-bold text-white">
                    {item.author.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{item.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div>
          <Image
            src="/assets/icons/heart-pulse.png"
            alt=""
            width={72}
            height={72}
            aria-hidden="true"
          />
          <h2 className="mt-5 text-h2">For tired parents, not perfect ones.</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            The tone is cheerful, but the product stays practical: fast entry,
            shared context, and a clear record when the day gets blurry.
          </p>
        </div>
      </div>
    </section>
  );
}
