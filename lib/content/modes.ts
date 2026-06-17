import type { Locale } from "@/lib/i18n/config";

/** Parent Mode vs RPG Mode  -  two lenses on the same tracked data. */
export interface AppMode {
  id: "parent" | "rpg";
  name: string;
  promise: string;
  bullets: string[];
}

/**
 * S6 Parent Mode copy  -  see docs/planning/05-copy-multilingual.md ("S6 Parent Mode").
 * Bullets are representative, not exhaustive  -  they back the toggle's two stat panels
 * with the same data shown two ways. Translated per locale below  -  see TASK-0011.
 */
const APP_MODES: Record<Locale, AppMode[]> = {
  en: [
    {
      id: "rpg",
      name: "RPG Mode",
      promise:
        "The same data, as an adventure  -  for the moments you need a little magic.",
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
  ],
  ja: [
    {
      id: "rpg",
      name: "RPGモード",
      promise: "同じ記録を、冒険として。ちょっとの魔法がほしい日に。",
      bullets: [
        "記録するたびに、赤ちゃんのヒーローのXPになる",
        "デイリークエストが、いつもの日課をミッションに変える",
        "アチーブメントとストリークが、続けてきたことを祝福する",
      ],
    },
    {
      id: "parent",
      name: "ペアレントモード",
      promise:
        "実用的で、たしかで、検診にもそのまま使える。必要なときは、すっきりしたグラフと健康記録を。",
      bullets: [
        "見やすく書き出せる、授乳・睡眠グラフ",
        "検診にそのまま使える、成長・健康記録",
        "家族みんなで共有する、ひとつのタイムライン",
      ],
    },
  ],
  vi: [
    {
      id: "rpg",
      name: "Chế độ RPG",
      promise:
        "Cũng dữ liệu đó, nhưng là một cuộc phiêu lưu  -  cho những ngày cần chút phép màu.",
      bullets: [
        "Mỗi lần ghi nhận trở thành XP cho người hùng của bé",
        "Nhiệm vụ hằng ngày biến thói quen thành nhiệm vụ",
        "Thành tựu & chuỗi ngày tôn vinh sự đều đặn",
      ],
    },
    {
      id: "parent",
      name: "Chế độ Ba Mẹ",
      promise:
        "Thực tế, đáng tin, sẵn sàng cho bác sĩ. Biểu đồ gọn gàng và hồ sơ sức khỏe khi bạn cần số liệu.",
      bullets: [
        "Biểu đồ cho bú & giấc ngủ gọn gàng, dễ xuất ra",
        "Hồ sơ tăng trưởng & sức khỏe sẵn sàng cho bác sĩ",
        "Một dòng thời gian chung cho cả gia đình",
      ],
    },
  ],
};

export function getAppModes(locale: Locale): AppMode[] {
  return APP_MODES[locale];
}
