import type { Locale } from "@/lib/i18n/config";
import type { AssetKey } from "@/lib/content/assets";

/** One step in the care -> XP mapping, e.g. { realAction: "Feeding", gameReward: "+Energy", icon: "icon.bottle" } */
export interface LoopStep {
  id: string;
  realAction: string;
  gameReward: string;
  icon: AssetKey;
}

interface LoopStepBase {
  id: string;
  icon: AssetKey;
}

interface LoopStepText {
  realAction: string;
  gameReward: string;
}

/**
 * S4 Care -> XP loop copy  -  see docs/planning/05-copy-multilingual.md ("S4 Care -> XP
 * loop") and the mapping fixed in docs/planning/01-strategy.md §3 (S4): Feeding=Energy,
 * Sleep=HP, Habits=EXP, Milestone=Achievement. Translated text lives in `LOOP_STEP_TEXT`
 * below, keyed by `Locale` then `LoopStep.id`  -  see TASK-0011.
 */
const LOOP_STEP_BASE: LoopStepBase[] = [
  { id: "feeding", icon: "icon.bottle" },
  { id: "sleep", icon: "icon.moon-star" },
  { id: "habits", icon: "icon.achievement" },
  { id: "milestone", icon: "icon.trophy" },
];

const LOOP_STEP_TEXT: Record<Locale, Record<string, LoopStepText>> = {
  en: {
    feeding: { realAction: "Feeding", gameReward: "+8 XP" },
    sleep: { realAction: "Sleep", gameReward: "+10 XP" },
    habits: { realAction: "Daily care", gameReward: "+XP" },
    milestone: { realAction: "Milestone", gameReward: "+250 XP" },
  },
  ja: {
    feeding: { realAction: "授乳", gameReward: "+8 XP" },
    sleep: { realAction: "睡眠", gameReward: "+10 XP" },
    habits: { realAction: "日々のケア", gameReward: "+XP" },
    milestone: { realAction: "マイルストーン", gameReward: "+250 XP" },
  },
  vi: {
    feeding: { realAction: "Cho bú", gameReward: "+8 XP" },
    sleep: { realAction: "Giấc ngủ", gameReward: "+10 XP" },
    habits: { realAction: "Chăm sóc hàng ngày", gameReward: "+XP" },
    milestone: { realAction: "Cột mốc", gameReward: "+250 XP" },
  },
};

export function getLoopSteps(locale: Locale): LoopStep[] {
  const text = LOOP_STEP_TEXT[locale];
  return LOOP_STEP_BASE.map((base) => ({ ...base, ...text[base.id] }));
}
