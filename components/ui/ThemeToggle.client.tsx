"use client";

import { useEffect, useState } from "react";

export type Theme = "cute" | "warrior";

const STORAGE_KEY = "babyleveling-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "cute";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "cute" || stored === "warrior") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "warrior" : "cute";
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
    return () => document.documentElement.removeEventListener("theme-change", handler);
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
      className={`relative inline-flex h-9 w-[9.5rem] items-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        theme === "warrior"
          ? "border-[var(--accent-primary)] bg-[var(--bg-raised)]"
          : "border-[var(--accent-primary)] bg-[var(--bg-raised)]"
      } ${className}`}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {/* Sliding pill indicator */}
      <span
        aria-hidden="true"
        className="absolute top-0.5 h-8 w-[4.5rem] rounded-full transition-all duration-300"
        style={{
          background: "var(--accent-primary)",
          left: theme === "cute" ? "2px" : "calc(100% - calc(4.5rem + 2px))",
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
        style={{ color: theme === "warrior" ? "#fff" : "var(--text-secondary)" }}
      >
        <span aria-hidden="true">◈</span>
        Warrior
      </span>
    </button>
  );
}
