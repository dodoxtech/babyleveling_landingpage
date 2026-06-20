"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  applyTheme,
  getStoredTheme,
  THEMES,
  type ThemeId,
} from "@/lib/theme/registry";

// Re-export for backwards-compatible imports.
export type Theme = ThemeId;

interface ThemeToggleProps {
  className?: string;
}

/**
 * Compact segmented control for the three visual themes (Bloom / Focus / Calm).
 * Reads localStorage on mount, writes on change, and sets data-theme on <html>
 * via the shared registry helpers. SSR-safe: renders the default theme
 * server-side; useEffect corrects on mount.
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeId>("cute");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Suppress transition flash on first paint.
    const html = document.documentElement;
    html.classList.add("no-transition");

    const initial = getStoredTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html.classList.remove("no-transition");
      });
    });
  }, []);

  // Stay in sync when another control (e.g. the in-page gallery) changes theme.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ theme: ThemeId }>).detail;
      if (detail?.theme && detail.theme !== theme) setTheme(detail.theme);
    };
    document.documentElement.addEventListener("theme-change", handler);
    return () =>
      document.documentElement.removeEventListener("theme-change", handler);
  }, [theme]);

  const select = (next: ThemeId) => {
    if (next === theme) return;
    setTheme(next);
    applyTheme(next);
  };

  const activeIndex = THEMES.findIndex((t) => t.id === theme);
  const segment = 100 / THEMES.length;

  return (
    <div
      role="radiogroup"
      aria-label="Visual theme"
      className={`relative inline-flex h-10 items-center rounded-full border border-[var(--accent-primary)] bg-[var(--bg-raised)] p-1 shadow-[0_10px_22px_rgba(22,32,47,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md transition-opacity ${className}`}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {/* Sliding active pill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 rounded-full transition-[left] duration-300 ease-[var(--ease-out-premium)]"
        style={{
          width: `calc(${segment}% - 0.5rem)`,
          left: `calc(${activeIndex * segment}% + 0.25rem)`,
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--accent-primary) 88%, #ffffff), var(--accent-primary))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.38), 0 8px 18px color-mix(in srgb, var(--accent-primary) 28%, transparent)",
        }}
      />

      {THEMES.map((t) => {
        const active = t.id === theme;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${t.name} theme — ${t.persona}`}
            title={`${t.name} · ${t.persona}`}
            onClick={() => select(t.id)}
            className="relative z-10 flex h-8 min-w-[3.25rem] flex-1 items-center justify-center gap-1.5 rounded-full px-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)]"
            style={{ color: active ? "#fff" : "var(--text-secondary)" }}
          >
            <span className="relative h-6 w-6 overflow-hidden rounded-full bg-white/80 ring-1 ring-black/5">
              <Image
                src={t.image.src}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden sm:inline">{t.name}</span>
          </button>
        );
      })}
    </div>
  );
}
