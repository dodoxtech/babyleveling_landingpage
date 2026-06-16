export interface Feature {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  accent: string;
}

/**
 * S5 Feature Showcase copy — see docs/planning/05-copy-multilingual.md ("S5 Feature
 * Showcase") and docs/features/feature-showcase.md. `accent` is a CSS color value (a
 * design-token var or hex) consumed directly as an inline style/glow color, so cards
 * stay data-driven with no per-card component change. English only for now; JA/VI
 * variants land in TASK-0011.
 */
export const features: Feature[] = [
  {
    id: "xp-levels",
    title: "XP & Levels",
    blurb:
      "Every feed, sleep, and growth log earns XP. Your baby's hero levels up.",
    icon: "icon.star",
    accent: "var(--accent-growth)",
  },
  {
    id: "daily-quests",
    title: "Daily Quests",
    blurb: 'Tracking becomes daily missions — "3 feeds today = +320 XP."',
    icon: "icon.calendar",
    accent: "var(--accent-feed)",
  },
  {
    id: "skill-tree",
    title: "Skill Tree",
    blurb:
      "Smiles, rolls, first words — milestones as an unlockable skill tree.",
    icon: "icon.skills",
    accent: "var(--accent-sleep)",
  },
  {
    id: "achievements",
    title: "Achievements",
    blurb: "Earn badges and trophies for streaks and milestones.",
    icon: "icon.trophy",
    accent: "var(--grad-plasma-from)",
  },
  {
    id: "streaks-buffs",
    title: "Streaks & Buffs",
    blurb: 'Stay consistent. "🔥 3-day streak, +50 XP bonus."',
    icon: "icon.badge",
    accent: "var(--grad-plasma-to)",
  },
  {
    id: "apple-watch",
    title: "Apple Watch",
    blurb: "Log a feed or nap from your wrist in two taps.",
    icon: "icon.reminder",
    accent: "var(--accent-growth)",
  },
];
