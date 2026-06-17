"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, type Locale } from "@/lib/i18n/config";
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

interface LocaleSwitcherProps {
  /** The locale currently active on this render, passed from the server component. */
  current: Locale;
}

/**
 * S0 / S12  -  real locale switcher. Renders the current locale as plain text
 * (`aria-current="true"`) and sibling locales as `<Link>`s pointing at the
 * same page path in that locale. Desktop header and footer both mount this
 * component  -  see SiteHeader.tsx and SiteFooter.tsx.
 */
export function LocaleSwitcher({ current }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const base = basePath(pathname);

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1 text-xs text-lo"
    >
      {locales.map((locale, index) => {
        const isCurrent = locale === current;
        return (
          <span key={locale} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true">-</span>}
            {isCurrent ? (
              <span className="text-hi" aria-current="true">
                {localeNames[locale]}
              </span>
            ) : (
              <Link
                href={localeHref(locale, base)}
                hrefLang={locale}
                className="transition-colors hover:text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]"
              >
                {localeNames[locale]}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
