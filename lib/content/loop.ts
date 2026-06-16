/** One step in the care -> XP mapping, e.g. { realAction: "Feeding", gameReward: "+Energy", icon: "icon.bottle" } */
export interface LoopStep {
  id: string;
  realAction: string;
  gameReward: string;
  icon: string;
}

/**
 * S4 Care -> XP loop copy — see docs/planning/05-copy-multilingual.md ("S4 Care -> XP
 * loop") and the mapping fixed in docs/planning/01-strategy.md §3 (S4): Feeding=Energy,
 * Sleep=HP, Habits=EXP, Milestone=Achievement. English only for now; JA/VI variants land
 * in TASK-0011.
 */
export const loopSteps: LoopStep[] = [
  {
    id: "feeding",
    realAction: "Feeding",
    gameReward: "+Energy",
    icon: "icon.bottle",
  },
  {
    id: "sleep",
    realAction: "Sleep",
    gameReward: "+HP",
    icon: "icon.sleep",
  },
  {
    id: "habits",
    realAction: "Healthy habits",
    gameReward: "+EXP",
    icon: "icon.skills",
  },
  {
    id: "milestone",
    realAction: "Milestone",
    gameReward: "Achievement unlocked",
    icon: "icon.trophy",
  },
];
