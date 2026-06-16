/** One link in the persistent header nav — label + the in-page section it scrolls to. */
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

/**
 * S0 nav copy — see docs/planning/05-copy-multilingual.md (`nav.*` keys).
 * Links point at in-page anchors on the one-page landing composition
 * (docs/planning/02-architecture.md §5 section breakdown); the standalone
 * `/features`, `/rpg-system`, `/parents`, `/pricing` depth pages are a later
 * phase (P1/P3, see 06-execution.md) and don't exist yet. English only for
 * now; locale switching lands in TASK-0011.
 */
export const navLinks: NavLink[] = [
  { id: "features", label: "Features", href: "#features" },
  { id: "rpg", label: "RPG System", href: "#rpg-system" },
  { id: "parents", label: "For Parents", href: "#parents" },
  // No pricing is set pre-launch (see docs/planning/05-copy-multilingual.md S10
  // "Launching soon — join the waitlist ... to hear pricing the moment it's
  // set"); the answer to "Pricing" today is the waitlist, so it anchors there
  // until the standalone `/pricing` depth page ships (P1/P3).
  { id: "pricing", label: "Pricing", href: "#waitlist" },
  { id: "faq", label: "FAQ", href: "#faq" },
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
