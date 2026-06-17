/**
 * Locale config — see docs/decisions/ADR-0003-i18n-approach.md and
 * docs/planning/02-architecture.md §4.2 (URL structure rules). Default
 * locale (`en`) is unprefixed; `ja`/`vi` are sub-path prefixed. Single
 * source so `middleware.ts`, `app/[locale]/layout.tsx`, and every
 * locale-aware link helper agree on the same three locales.
 */
export const locales = ["en", "ja", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Display name for each locale, in its own script — used by the locale switcher. */
export const localeNames: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
  vi: "Tiếng Việt",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
