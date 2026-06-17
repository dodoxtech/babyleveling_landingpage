"use client";

import { useState } from "react";
import { getThemes } from "@/lib/content/themes";
import { useReducedMotion } from "@/lib/motion";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface ThemeGalleryProps {
  locale: Locale;
}

/**
 * S8 — Theme Gallery (Act IV). A single top-level `"use client"` component
 * (same reasoning as `ParentMode`/`WaitlistSignup`): the live preview is the
 * entire point of the section, so there's no meaningful server-rendered
 * fallback to split out.
 *
 * "CSS-var swap, no remount" (per the UX notes): the preview panel below is
 * never `key`ed on the active theme — only its `style` attribute changes —
 * so React patches the existing node's inline custom properties instead of
 * tearing it down and rebuilding it.
 *
 * Reduced motion: the decorative sweep overlay is skipped entirely, leaving
 * only the plain `transition-colors` already on the preview panel — a
 * cross-fade instead of a sweep, per §7.3. (A low-power device gets a real,
 * visible cross-fade; under the OS `prefers-reduced-motion` media feature,
 * `globals.css`'s blanket rule additionally collapses that transition's
 * duration too, which is the more conservative — and correct — outcome for
 * visitors who opted out of motion at the OS level.)
 */
export function ThemeGallery({ locale }: ThemeGalleryProps) {
  const themes = getThemes(locale);
  const { themes: themesCopy } = getDictionary(locale).home;
  const [activeId, setActiveId] = useState(themes[0].id);
  const reducedMotion = useReducedMotion();
  const active = themes.find((theme) => theme.id === activeId) ?? themes[0];

  return (
    <section
      id="themes"
      aria-label="S8 · Theme Gallery"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
          {themesCopy.eyebrow}
        </p>
        <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
          {themesCopy.title}
        </h2>

        <div
          role="tablist"
          aria-label={themesCopy.tablistLabel}
          className="glass mx-auto mt-10 inline-flex gap-1 rounded-full p-1"
        >
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              role="tab"
              aria-selected={activeId === theme.id}
              onClick={() => setActiveId(theme.id)}
              className="rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]"
              style={
                activeId === theme.id
                  ? {
                      backgroundColor: theme.palette.accent,
                      color: theme.palette.bg,
                    }
                  : { color: "var(--text-lo)" }
              }
            >
              {theme.name}
            </button>
          ))}
        </div>

        <div
          className="relative mt-10 overflow-hidden rounded-3xl border p-10 transition-colors duration-500"
          style={{
            backgroundColor: active.palette.bg,
            borderColor: `${active.palette.accent}55`,
          }}
        >
          {!reducedMotion && (
            <div
              key={activeId}
              aria-hidden="true"
              className="animate-[theme-sweep_0.6s_ease-out] pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(100deg, transparent 30%, ${active.palette.highlight}55 50%, transparent 70%)`,
              }}
            />
          )}

          <div
            aria-hidden="true"
            className="mx-auto h-24 w-24 rounded-full blur-2xl transition-colors duration-500"
            style={{ background: active.palette.accent }}
          />

          <p
            className="font-display relative z-10 mt-6 text-2xl transition-colors duration-500"
            style={{ color: active.palette.highlight }}
          >
            {active.tagline}
          </p>

          <div className="relative z-10 mt-6 flex items-center justify-center gap-3">
            {Object.values(active.palette).map((color, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="h-6 w-6 rounded-full border border-white/20 transition-colors duration-500"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Swatch row: doubles as the mobile swipeable theme picker (per the UX
            notes — "themes display as a swipeable/stacked set"); on wide
            viewports all three fit without needing to scroll. */}
        <div className="[scrollbar-width:none] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setActiveId(theme.id)}
              aria-label={themesCopy.previewLabel.replace("{name}", theme.name)}
              aria-pressed={activeId === theme.id}
              className={`glass flex w-40 shrink-0 snap-center flex-col gap-2 rounded-2xl p-4 text-left transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)] ${
                activeId === theme.id
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <div
                aria-hidden="true"
                className="h-10 w-full rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.highlight})`,
                }}
              />
              <p className="text-sm font-semibold text-hi">{theme.name}</p>
              <p className="text-xs text-lo">{theme.tagline}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
