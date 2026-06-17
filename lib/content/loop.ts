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
    feeding: { realAction: "Feeding", gameReward: "+Energy" },
    sleep: { realAction: "Sleep", gameReward: "+HP" },
    habits: { realAction: "Healthy habits", gameReward: "+EXP" },
    milestone: {
      realAction: "Milestone",
      gameReward: "Achievement unlocked",
    },
  },
  ja: {
    feeding: { realAction: "授乳", gameReward: "+エナジー" },
    sleep: { realAction: "睡眠", gameReward: "+HP回復" },
    habits: { realAction: "よい習慣", gameReward: "+EXP" },
    milestone: { realAction: "マイルストーン", gameReward: "実績解除" },
  },
  vi: {
    feeding: { realAction: "Cho bú", gameReward: "+Năng lượng" },
    sleep: { realAction: "Giấc ngủ", gameReward: "+HP" },
    habits: { realAction: "Thói quen tốt", gameReward: "+EXP" },
    milestone: { realAction: "Cột mốc", gameReward: "Mở khóa thành tựu" },
  },
};

export function getLoopSteps(locale: Locale): LoopStep[] {
  const text = LOOP_STEP_TEXT[locale];
  return LOOP_STEP_BASE.map((base) => ({ ...base, ...text[base.id] }));
}
