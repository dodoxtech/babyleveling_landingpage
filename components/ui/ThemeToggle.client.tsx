"use client";

import { useEffect, useState } from "react";

export type Theme = "cute" | "warrior";

const STORAGE_KEY = "babyleveling-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "cute";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "cute" || stored === "warrior") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "warrior"
    : "cute";
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
  html.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
}

interface ThemeToggleProps {
  className?: string;
}

/**
 * Pill-shaped Cute ↔ Warrior mode toggle.
 * Reads localStorage on mount, writes on change, and sets data-theme on <html>.
 * SSR-safe: renders in default (cute) state server-side; useEffect corrects on mount.
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("cute");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Suppress transition flash on first paint
    const html = document.documentElement;
    html.classList.add("no-transition");

    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    // Re-enable transitions after first paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html.classList.remove("no-transition");
      });
    });
  }, []);

  // Listen for external theme changes (e.g. from the Hero inline toggle)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ theme: Theme }>).detail;
      if (detail?.theme && detail.theme !== theme) {
        setTheme(detail.theme);
      }
    };
    document.documentElement.addEventListener("theme-change", handler);
    return () =>
      document.documentElement.removeEventListener("theme-change", handler);
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === "cute" ? "warrior" : "cute";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "warrior"}
      aria-label={`Switch to ${theme === "cute" ? "Warrior" : "Cute"} Mode`}
      onClick={toggle}
      className={`relative inline-flex h-10 w-[9.75rem] items-center rounded-full border shadow-[0_10px_22px_rgba(22,32,47,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-premium)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)] ${
        theme === "warrior"
          ? "border-[var(--accent-primary)] bg-[var(--bg-raised)]"
          : "border-[var(--accent-primary)] bg-[var(--bg-raised)]"
      } ${className}`}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {/* Sliding pill indicator */}
      <span
        aria-hidden="true"
        className="absolute top-1 h-8 w-[4.55rem] rounded-full transition-all duration-300 ease-[var(--ease-out-premium)]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--accent-primary) 88%, #ffffff), var(--accent-primary))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.38), 0 8px 18px color-mix(in srgb, var(--accent-primary) 28%, transparent)",
          left: theme === "cute" ? "4px" : "calc(100% - calc(4.55rem + 4px))",
        }}
      />

      {/* Cute label */}
      <span
        className="relative z-10 flex flex-1 items-center justify-center gap-1 text-xs font-600 font-semibold transition-colors"
        style={{ color: theme === "cute" ? "#fff" : "var(--text-secondary)" }}
      >
        <span aria-hidden="true">♥</span>
        Cute
      </span>

      {/* Warrior label */}
      <span
        className="relative z-10 flex flex-1 items-center justify-center gap-1 text-xs font-semibold transition-colors"
        style={{
          color: theme === "warrior" ? "#fff" : "var(--text-secondary)",
        }}
      >
        <span aria-hidden="true">◈</span>
        Warrior
      </span>
    </button>
  );
}
