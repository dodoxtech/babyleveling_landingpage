import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Sub-path i18n routing — see docs/decisions/ADR-0003-i18n-approach.md and
 * docs/planning/02-architecture.md §4.2. `en` is the default locale and
 * stays unprefixed in the visible URL; `ja`/`vi` are real prefixed segments
 * that `app/[locale]/...` already matches on their own, no rewrite needed.
 *
 * Three cases:
 *  1. `/en` or `/en/...` (someone typed the default locale explicitly) —
 *     permanently redirect to the unprefixed path, so there's never a
 *     duplicate, separately-indexable `/en` copy of every page.
 *  2. `/ja...` / `/vi...` — already correctly routed; pass through.
 *  3. Everything else (the default locale's real, unprefixed URLs) —
 *     rewrite internally to `/en/...` so `app/[locale]/page.tsx` resolves
 *     it, without changing what the visitor sees in the address bar.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
