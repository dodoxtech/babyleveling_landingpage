"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { localeHref } from "@/lib/i18n/paths";

/**
 * Strips any non-default locale prefix from the visible pathname so we can
 * build the equivalent URL in another locale. The default locale (`en`) is
 * always unprefixed, so `/features` stays `/features`  -  only `/ja/features`
 * and `/vi/features` need stripping. See docs/decisions/ADR-0003-i18n-approach.md.
 */
function basePath(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`))
      return pathname.slice(`/${locale}`.length);
  }
  return pathname; // already unprefixed (en)
}

/** Compact, equal-width codes for the segmented control (full names live in the menu/footer). */
const shortLabel: Record<Locale, string> = {
  en: "EN",
  ja: "JA",
  vi: "VI",
};

interface LocaleSwitcherProps {
  /** The locale currently active on this render, passed from the server component. */
  current: Locale;
}

/**
 * S0 / S12  -  segmented locale switcher. A pill-shaped control with one segment
 * per locale and a sliding "thumb" that springs to the active language. The
 * active locale is rendered as plain text (`aria-current`), siblings as `<Link>`s
 * pointing at the same page path in that locale. The thumb position is derived
 * from `current`, so it animates whenever the active locale changes.
 */
export function LocaleSwitcher({ current }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const base = basePath(pathname);
  const activeIndex = Math.max(0, locales.indexOf(current));

  return (
    <nav
      aria-label="Language"
      className="relative inline-grid grid-flow-col items-center gap-0 rounded-full border p-[3px]"
      style={{
        gridTemplateColumns: `repeat(${locales.length}, minmax(2.5rem, 1fr))`,
        borderColor: "var(--border-subtle)",
        background: "var(--bg-section-alt)",
      }}
    >
      {/* Sliding thumb — sits beneath the active segment and springs into place. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[3px] left-[3px] top-[3px] rounded-full will-change-transform motion-reduce:transition-none"
        style={{
          width: `calc((100% - 6px) / ${locales.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
          transition: "transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          background: "var(--bg-raised)",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.06), 0 6px 16px color-mix(in srgb, var(--accent-primary) 22%, transparent)",
        }}
      />

      {locales.map((locale) => {
        const isCurrent = locale === current;
        const label = shortLabel[locale];
        const common =
          "relative z-10 select-none rounded-full px-2.5 py-1 text-center text-xs font-bold tracking-wide transition-colors duration-200";

        return isCurrent ? (
          <span
            key={locale}
            aria-current="true"
            className={common}
            style={{ color: "var(--accent-primary)" }}
          >
            {label}
          </span>
        ) : (
          <Link
            key={locale}
            href={localeHref(locale, base)}
            scroll={false}
            hrefLang={locale}
            aria-label={`Switch language to ${label}`}
            className={`${common} hover:text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)]`}
            style={{ color: "var(--text-secondary)" }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
