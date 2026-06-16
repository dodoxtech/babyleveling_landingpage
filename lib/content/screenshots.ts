export interface Screenshot {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

/**
 * S7 Screenshot Gallery manifest — see docs/planning/05-copy-multilingual.md ("S7
 * Screenshots") and docs/features/screenshot-gallery.md. `src` names where the real app
 * screenshot will live once the design track (G-05) delivers it; no file exists at that
 * path yet (verified: only `public/sprites/*` exists under `public/`), so
 * `components/sections/Screenshots.tsx` renders an honest stand-in mock per `id` for now —
 * the same "no invented asset" approach `RevealScene.client.tsx`'s `DashboardStillPlaceholder`
 * already uses — and will switch to `next/image` against `src` once the real PNGs land.
 * English only for now; JA/VI variants land in TASK-0011.
 */
export const screenshots: Screenshot[] = [
  {
    id: "dashboard",
    src: "/screenshots/dashboard.png",
    alt: "The BabyLeveling dashboard, showing the hero's level, XP bar, and today's stats",
    caption: "Dashboard (your character sheet)",
  },
  {
    id: "quest-log",
    src: "/screenshots/quest-log.png",
    alt: "The BabyLeveling quest log, listing today's feeding, sleep, and diaper entries as completed quests",
    caption: "Quest Log (the battle log)",
  },
  {
    id: "skill-tree",
    src: "/screenshots/skill-tree.png",
    alt: "The BabyLeveling skill tree, showing milestones like smiling and rolling over as unlockable nodes",
    caption: "Skill Tree",
  },
  {
    id: "trophy-room",
    src: "/screenshots/trophy-room.png",
    alt: "The BabyLeveling trophy room, displaying earned badges and achievements",
    caption: "Trophy Room",
  },
];
