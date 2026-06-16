/** Parent Mode vs RPG Mode — two lenses on the same tracked data. */
export interface AppMode {
  id: "parent" | "rpg";
  name: string;
  promise: string;
  bullets: string[];
}

/**
 * S6 Parent Mode copy — see docs/planning/05-copy-multilingual.md ("S6 Parent Mode").
 * Bullets are representative, not exhaustive — they back the toggle's two stat panels
 * with the same data shown two ways. English only for now; JA/VI variants land in
 * TASK-0011.
 */
export const appModes: AppMode[] = [
  {
    id: "rpg",
    name: "RPG Mode",
    promise:
      "The same data, as an adventure — for the moments you need a little magic.",
    bullets: [
      "Every log becomes XP for your baby's hero",
      "Daily quests turn routines into missions",
      "Achievements & streaks celebrate consistency",
    ],
  },
  {
    id: "parent",
    name: "Parent Mode",
    promise:
      "Practical, reliable, pediatrician-ready. Clean charts and health records when you need the facts.",
    bullets: [
      "Clean, exportable feeding & sleep charts",
      "Pediatrician-ready growth & health records",
      "One shared timeline for the whole family",
    ],
  },
];
