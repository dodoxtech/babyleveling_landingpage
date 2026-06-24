import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { prefersMarkdown } from "@/lib/markdown/negotiation";

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
 *
 * Layered on top: Markdown-for-Agents content negotiation. A GET that prefers
 * `Accept: text/markdown` is rewritten to `/api/md`, which renders the same
 * path as markdown (see lib/markdown/negotiation.ts + app/api/md/route.ts).
 * HTML stays the default for browsers, which never send that Accept type.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.method === "GET" && prefersMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/md";
    url.search = "";
    // Carry the page being negotiated to /api/md via a request header rather
    // than a query param: a rewrite reliably forwards request headers, whereas
    // the rewritten query string is not always surfaced to the route handler.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-md-path", pathname);
    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    response.headers.set("Vary", "Accept");
    return response;
  }

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) {
    const response = NextResponse.next();
    response.headers.set("Vary", "Accept");
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  // HTML and markdown share these URLs; vary cached HTML on Accept so an agent
  // request is never answered from a browser's cached HTML copy.
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
