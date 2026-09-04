import type { Locale } from "@/lib/i18n/config";

export interface Screenshot {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface ScreenshotText {
  alt: string;
  caption: string;
}

/**
 * S7 Screenshot Gallery manifest  -  see docs/planning/05-copy-multilingual.md ("S7
 * Screenshots") and docs/features/screenshot-gallery.md. Images are real App Store
 * screenshots (captured from the shipped app, see BabyLeveling/assets/app-review),
 * one localized set per locale under `public/screenshots/<locale>/<id>.png` -
 * each `id` here maps 1:1 to the closest real app screen: quest-log -> the
 * activity/quest log, skill-tree -> milestones, trophy-room -> the rank-up moment.
 */
const SCREENSHOT_IDS = ["dashboard", "quest-log", "skill-tree", "trophy-room"] as const;

const SCREENSHOT_TEXT: Record<Locale, Record<string, ScreenshotText>> = {
  en: {
    dashboard: {
      alt: "The BabyLeveling dashboard, showing the hero's level, XP bar, and today's stats",
      caption: "Dashboard (your character sheet)",
    },
    "quest-log": {
      alt: "The BabyLeveling quest log, listing today's feeding, sleep, and diaper entries as completed quests",
      caption: "Quest Log (the battle log)",
    },
    "skill-tree": {
      alt: "The BabyLeveling skill tree, showing milestones like smiling and rolling over as unlockable nodes",
      caption: "Skill Tree",
    },
    "trophy-room": {
      alt: "The BabyLeveling trophy room, displaying earned badges and achievements",
      caption: "Trophy Room",
    },
  },
  ja: {
    dashboard: {
      alt: "BabyLeveling のダッシュボード。ヒーローのレベル、XPバー、今日の統計を表示",
      caption: "ダッシュボード(キャラクターシート)",
    },
    "quest-log": {
      alt: "BabyLeveling のクエストログ。今日の授乳・睡眠・おむつ替えの記録を、完了したクエストとして一覧表示",
      caption: "クエストログ(バトルログ)",
    },
    "skill-tree": {
      alt: "BabyLeveling のスキルツリー。笑顔や寝返りなどのマイルストーンを、解放可能なノードとして表示",
      caption: "スキルツリー",
    },
    "trophy-room": {
      alt: "BabyLeveling のトロフィールーム。獲得したバッジとアチーブメントを表示",
      caption: "トロフィールーム",
    },
  },
  vi: {
    dashboard: {
      alt: "Bảng điều khiển của BabyLeveling, hiển thị cấp độ, thanh XP và số liệu hôm nay của người hùng",
      caption: "Bảng điều khiển (bảng nhân vật)",
    },
    "quest-log": {
      alt: "Nhật ký nhiệm vụ của BabyLeveling, liệt kê các lần cho bú, giấc ngủ và thay tã hôm nay dưới dạng nhiệm vụ đã hoàn thành",
      caption: "Nhật ký nhiệm vụ (nhật ký chiến đấu)",
    },
    "skill-tree": {
      alt: "Cây kỹ năng của BabyLeveling, hiển thị các cột mốc như cười và lẫy dưới dạng các node có thể mở khóa",
      caption: "Cây kỹ năng",
    },
    "trophy-room": {
      alt: "Phòng cúp của BabyLeveling, trưng bày các huy hiệu và thành tựu đã đạt được",
      caption: "Phòng cúp",
    },
  },
};

export function getScreenshots(locale: Locale): Screenshot[] {
  const text = SCREENSHOT_TEXT[locale];
  return SCREENSHOT_IDS.map((id) => ({
    id,
    src: `/screenshots/${locale}/${id}.png`,
    ...text[id],
  }));
}
