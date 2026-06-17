import type { Locale } from "@/lib/i18n/config";

/** Mirrors the app's three per-baby themes exactly. */
export interface AppTheme {
  id: "royal" | "warrior" | "zen";
  name: string;
  tagline: string;
  palette: { bg: string; accent: string; highlight: string };
  art: string;
}

interface ThemeBase {
  id: "royal" | "warrior" | "zen";
  palette: { bg: string; accent: string; highlight: string };
  art: string;
}

/**
 * S8 Theme Gallery copy — see docs/planning/05-copy-multilingual.md ("S8 Themes") and
 * docs/features/theme-gallery.md. `palette`/`art` are locale-independent design tokens
 * (see TASK-0007); `name` (Royal/Warrior/Zen) stays untranslated across locales per the
 * brand-terms rule (TASK-0011), only `tagline` is translated below.
 */
const THEME_BASE: ThemeBase[] = [
  {
    id: "royal",
    palette: { bg: "#241027", accent: "#f9a8d4", highlight: "#fde68a" },
    art: "royal-radiant",
  },
  {
    id: "warrior",
    palette: { bg: "#231209", accent: "#ff7a45", highlight: "#fbbf24" },
    art: "warrior-forge",
  },
  {
    id: "zen",
    palette: { bg: "#0d1f1c", accent: "#5eead4", highlight: "#bfdbfe" },
    art: "zen-grove",
  },
];

const THEME_TEXT: Record<Locale, Record<string, { tagline: string }>> = {
  en: {
    royal: { tagline: "Soft power." },
    warrior: { tagline: "Forged in fire." },
    zen: { tagline: "Gentle and intentional." },
  },
  ja: {
    royal: { tagline: "やわらかな、強さ。" },
    warrior: { tagline: "炎で鍛える。" },
    zen: { tagline: "おだやかに、ていねいに。" },
  },
  vi: {
    royal: { tagline: "Sức mạnh dịu dàng." },
    warrior: { tagline: "Tôi luyện trong lửa." },
    zen: { tagline: "Nhẹ nhàng và chú tâm." },
  },
};

const THEME_NAMES: Record<AppTheme["id"], string> = {
  royal: "Royal",
  warrior: "Warrior",
  zen: "Zen",
};

export function getThemes(locale: Locale): AppTheme[] {
  const text = THEME_TEXT[locale];
  return THEME_BASE.map((base) => ({
    ...base,
    name: THEME_NAMES[base.id],
    tagline: text[base.id].tagline,
  }));
}
