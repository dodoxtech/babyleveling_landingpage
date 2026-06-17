import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

/**
 * Prefixes a site-relative path with its locale segment, per the sub-path
 * rule in docs/planning/02-architecture.md §4.2: `en` stays unprefixed,
 * `ja`/`vi` get `/ja`/`/vi`. `path` must start with `/` (e.g. `/features`,
 * or `/` for home).
 */
export function localeHref(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  return locale === defaultLocale ? path : `/${locale}${normalized}`;
}

/**
 * Builds the `alternates.languages` map (+ `x-default`) for a given
 * site-relative path, used by every page's `generateMetadata` so `hreflang`
 * is never hand-rolled per page. See docs/planning/04-seo-aeo.md (canonical +
 * hreflang) and the acceptance criteria in TASK-0011.
 */
export function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localeHref(locale, path);
  }
  languages["x-default"] = localeHref(defaultLocale, path);
  return languages;
}
