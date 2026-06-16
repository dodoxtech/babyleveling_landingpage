/** Mirrors the app's three per-baby themes exactly. */
export interface AppTheme {
  id: "royal" | "warrior" | "zen";
  name: string;
  tagline: string;
  palette: { bg: string; accent: string; highlight: string };
  art: string;
}

/**
 * S8 Theme Gallery copy — see docs/planning/05-copy-multilingual.md ("S8 Themes") and
 * docs/features/theme-gallery.md. `palette` values mirror the design tokens in
 * docs/planning/03-storyboard-motion-visual.md §8.2 exactly (Royal: bubblegum pink ->
 * champagne gold; Warrior: ember orange -> battle gold; Zen: soft matcha -> misty blue),
 * since the live preview recolors purely from these three CSS-var values — no separate
 * background art asset exists yet (producing real theme art is explicitly out of scope
 * for TASK-0007), so `art` is a descriptive key reserved for when one lands, not a path
 * the component reads. English only for now; JA/VI variants land in TASK-0011.
 */
export const themes: AppTheme[] = [
  {
    id: "royal",
    name: "Royal",
    tagline: "Soft power.",
    palette: { bg: "#241027", accent: "#f9a8d4", highlight: "#fde68a" },
    art: "royal-radiant",
  },
  {
    id: "warrior",
    name: "Warrior",
    tagline: "Forged in fire.",
    palette: { bg: "#231209", accent: "#ff7a45", highlight: "#fbbf24" },
    art: "warrior-forge",
  },
  {
    id: "zen",
    name: "Zen",
    tagline: "Gentle and intentional.",
    palette: { bg: "#0d1f1c", accent: "#5eead4", highlight: "#bfdbfe" },
    art: "zen-grove",
  },
];
