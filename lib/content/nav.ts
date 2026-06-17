/** One link in the persistent header nav  -  id maps to a `dict.nav.<id>` label. */
export interface NavLink {
  id: "features" | "rpg" | "parents" | "pricing" | "faq";
  /** Site-relative, locale-unprefixed path  -  pass through `localeHref` to render. */
  path: string;
}

/**
 * S0 nav structure  -  see docs/planning/05-copy-multilingual.md (`nav.*` keys).
 * `SiteHeader`/`SiteFooter` are persistent chrome rendered once in
 * `app/[locale]/layout.tsx`, so they render on every route, including the
 * TASK-0010 depth pages below  -  links must be real paths, not in-page
 * anchors, since an anchor like `#features` only resolves on the page that
 * actually has a `#features` element (home). Labels live in the locale
 * dictionary (`lib/i18n/dictionary.ts`), keyed by this same `id`, so nav
 * structure and translated copy can't drift apart  -  see TASK-0011.
 */
export const navLinks: NavLink[] = [
  { id: "features", path: "/features" },
  { id: "rpg", path: "/rpg-system" },
  { id: "parents", path: "/parents" },
  { id: "pricing", path: "/pricing" },
  { id: "faq", path: "/faq" },
];

/** The single header CTA  -  always points at the S11 waitlist section (same-page anchor, never locale-prefixed). */
export const navCtaHref = "#waitlist";

export const wordmark = "BabyLeveling";
