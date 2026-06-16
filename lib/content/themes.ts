/** Mirrors the app's three per-baby themes exactly. */
export interface AppTheme {
  id: "royal" | "warrior" | "zen";
  name: string;
  tagline: string;
  palette: { bg: string; accent: string; highlight: string };
  art: string;
}
