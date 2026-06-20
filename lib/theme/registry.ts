/**
 * Visual theme registry — the single source of truth for the website's
 * swappable look-and-feel.
 *
 * This is the "reference layer" of the theme system. Every consumer (the
 * header/hero toggle, the theme gallery, future palette previews) reads from
 * THEMES here, while the matching design tokens live in `app/globals.css`
 * under `[data-theme="<id>"]`. The two are kept in lock-step by id:
 *
 *   registry.ts  →  ids + copy + swatches (what humans/UI read)
 *   globals.css  →  the actual CSS custom properties (what pixels read)
 *
 * To add or restyle a theme: add an entry here AND a matching token block in
 * globals.css using the same `id`. Nothing else needs to change — the whole
 * page repaints from the shared token contract.
 *
 * NOTE: this is distinct from `lib/content/themes.ts`, which describes the
 * in-app *game* worlds (Royal/Warrior/Zen). This file is purely the marketing
 * site's visual skin.
 */

export const THEME_IDS = ["cute", "focus", "zen"] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME: ThemeId = "cute";

export const THEME_STORAGE_KEY = "babyleveling-theme";

/** Hex mirror of the key tokens, used to render palette previews in the UI. */
export interface ThemeSwatch {
  /** Page background (`--bg-base`). */
  bg: string;
  /** Raised card surface (`--bg-raised`). */
  surface: string;
  /** Primary CTA / button (`--accent-primary`). */
  button: string;
  /** Secondary accent (`--accent-secondary`). */
  accent: string;
  /** Tertiary "pop" accent (`--accent-tertiary`). */
  pop: string;
  /** Primary text on the background (`--text-primary`). */
  ink: string;
}

export interface ThemeDefinition {
  id: ThemeId;
  /** Brand-style name shown in the gallery. */
  name: string;
  /** Who it's for — short persona chip. */
  persona: string;
  /** Simple image shown in theme controls. */
  image: {
    src: string;
    alt: string;
  };
  /** Single-glyph icon used in the compact toggle. */
  glyph: string;
  tagline: string;
  blurb: string;
  /** Three short descriptors shown as pills. */
  tags: [string, string, string];
  swatch: ThemeSwatch;
}

export const THEMES: readonly ThemeDefinition[] = [
  {
    id: "cute",
    name: "Bloom",
    persona: "Warm & soft",
    image: {
      src: "/assets/themes/bloom.png",
      alt: "Bloom theme flower icon",
    },
    glyph: "🌸",
    tagline: "Soft, warm, and full of heart.",
    blurb:
      "Pillowy cards, candy-coral rewards and a nurturing blush glow — the bright, cuddly world for anyone who loves warm, playful color.",
    tags: ["Coral + lavender", "Pillow-soft corners", "Warm blush base"],
    swatch: {
      bg: "#fff6f4",
      surface: "#ffffff",
      button: "#ff5d8f",
      accent: "#c4a7ff",
      pop: "#ffc24b",
      ink: "#34232c",
    },
  },
  {
    id: "focus",
    name: "Focus",
    persona: "Cool & crisp",
    image: {
      src: "/assets/themes/focus.png",
      alt: "Focus theme diamond icon",
    },
    glyph: "💎",
    tagline: "Clean, calm, quietly premium.",
    blurb:
      "Restrained ink, one confident electric accent and crisp edges. The understated, premium feel that makes upgrading a no-brainer.",
    tags: ["Electric indigo", "Crisp edges", "High-contrast ink"],
    swatch: {
      bg: "#f3f5f8",
      surface: "#ffffff",
      button: "#3b4be8",
      accent: "#7e8cff",
      pop: "#18b7a6",
      ink: "#0e1726",
    },
  },
  {
    id: "zen",
    name: "Calm",
    persona: "Zen",
    image: {
      src: "/assets/themes/calm.png",
      alt: "Calm theme leaf icon",
    },
    glyph: "🍃",
    tagline: "Slow down. Breathe. Track gently.",
    blurb:
      "Sage, sand and terracotta on warm paper. Low-saturation calm for parents who want tracking to feel like a deep breath.",
    tags: ["Sage + sand", "Quiet luxury", "Low saturation"],
    swatch: {
      bg: "#f2f0e8",
      surface: "#fbfaf4",
      button: "#5e9270",
      accent: "#a7c7b2",
      pop: "#dca679",
      ink: "#2a322b",
    },
  },
] as const;

export const THEME_MAP: Record<ThemeId, ThemeDefinition> = Object.fromEntries(
  THEMES.map((theme) => [theme.id, theme]),
) as Record<ThemeId, ThemeDefinition>;

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" && (THEME_IDS as readonly string[]).includes(value)
  );
}

/**
 * Read the persisted theme, falling back to a `prefers-color-scheme` guess and
 * finally the default. Client-only — guards `window` for SSR safety.
 */
export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeId(stored)) return stored;
  // Dark-mode users get the cooler, higher-contrast "Focus" skin by default.
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "focus"
    : DEFAULT_THEME;
}

/**
 * Apply a theme everywhere: set `data-theme` on <html>, persist it, and notify
 * any other mounted theme controls via a `theme-change` event so they stay in
 * sync (e.g. the header toggle and the in-page gallery).
 */
export function applyTheme(theme: ThemeId): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  html.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
}
