/** One link in the persistent header nav — label + the in-page section it scrolls to. */
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

/**
 * S0 nav copy — see docs/planning/05-copy-multilingual.md (`nav.*` keys).
 * `SiteHeader`/`SiteFooter` are persistent chrome rendered once in
 * `app/layout.tsx`, so they render on every route, including the TASK-0010
 * depth pages below — links must be real paths, not in-page anchors, since
 * an anchor like `#features` only resolves on the page that actually has a
 * `#features` element (home). The five depth pages now exist
 * (`/features`, `/rpg-system`, `/parents`, `/pricing`, `/faq`), so all of
 * them point there. English only for now; locale switching lands in
 * TASK-0011.
 */
export const navLinks: NavLink[] = [
  { id: "features", label: "Features", href: "/features" },
  { id: "rpg", label: "RPG System", href: "/rpg-system" },
  { id: "parents", label: "For Parents", href: "/parents" },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "faq", label: "FAQ", href: "/faq" },
];

/** The single header CTA — always points at the S11 waitlist section. */
export const navCta = {
  label: "Join the waitlist",
  href: "#waitlist",
};

/** Non-functional locale-switcher stub (TASK-0011 wires real routing). */
export interface LocaleOption {
  id: string;
  label: string;
}

export const localeOptions: LocaleOption[] = [
  { id: "en", label: "EN" },
  { id: "ja", label: "日本語" },
  { id: "vi", label: "Tiếng Việt" },
];

export const wordmark = "BabyLeveling";
