"use client";

import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import {
  applyTheme,
  THEMES,
  type ThemeDefinition,
} from "@/lib/theme/registry";

interface ThemeGalleryProps {
  locale: Locale;
}

/** Mini live preview of a theme's image and palette. */
function PalettePreview({ theme }: { theme: ThemeDefinition }) {
  const { swatch } = theme;
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-[var(--radius-xl)] p-5"
      style={{ background: swatch.bg }}
    >
      <div
        className="grid aspect-square place-items-center rounded-[var(--radius-md)] p-5 shadow-[0_12px_28px_rgba(20,24,40,0.1)]"
        style={{ background: swatch.surface }}
      >
        <Image
          src={theme.image.src}
          alt=""
          width={144}
          height={144}
          className="h-full max-h-36 w-full max-w-36 object-contain"
        />
      </div>

      {/* Accent dots */}
      <div className="mt-4 flex items-center gap-2">
        {[swatch.button, swatch.accent, swatch.pop].map((c, i) => (
          <span
            key={i}
            className="h-5 w-5 rounded-full ring-2 ring-white/70"
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}

export function ThemeGallery({ locale: _locale }: ThemeGalleryProps) {
  return (
    <section
      id="themes"
      aria-label="Themes"
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[var(--accent-tertiary)] opacity-[0.16] blur-3xl" />
        <div className="absolute -left-20 bottom-4 h-72 w-72 rounded-full bg-[var(--accent-secondary)] opacity-[0.12] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            Three ways to play
          </p>
          <h2 className="mt-3 text-h2">
            One app, three moods. Pick the world your family lives in.
          </h2>
          <p className="mt-5 max-w-[40rem] text-lg leading-8 text-[var(--text-secondary)]">
            Same logs, same data — a different coat of paint. Tap a theme and the
            whole page repaints instantly, so you can feel each one before you
            commit.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((theme) => (
            <article
              key={theme.id}
              className="card-duolingo flex flex-col gap-5 p-6"
            >
              <PalettePreview theme={theme} />

              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold">{theme.name}</h3>
                <span className="rounded-full bg-[var(--bg-section-alt)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-primary)]">
                  {theme.persona}
                </span>
              </div>

              <p className="-mt-2 leading-7 text-[var(--text-secondary)]">
                {theme.blurb}
              </p>

              <ul className="flex flex-wrap gap-2">
                {theme.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[var(--radius-sm)] bg-white/70 px-3 py-1 text-xs font-bold text-[var(--text-secondary)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => applyTheme(theme.id)}
                className="btn-secondary mt-auto inline-flex items-center justify-center gap-2"
              >
                <Image
                  src={theme.image.src}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
                Try {theme.name}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
