import type { Locale } from "@/lib/i18n/config";
import type { AssetKey } from "@/lib/content/assets";

export interface Feature {
  id: string;
  title: string;
  blurb: string;
  icon: AssetKey;
  accent: string;
}

interface FeatureBase {
  id: string;
  icon: AssetKey;
  accent: string;
}

interface FeatureText {
  title: string;
  blurb: string;
}

/**
 * S5 Feature Showcase copy  -  see docs/planning/05-copy-multilingual.md ("S5 Feature
 * Showcase") and docs/features/feature-showcase.md. `accent` is a CSS color value (a
 * design-token var or hex) consumed directly as an inline style/glow color, so cards
 * stay data-driven with no per-card component change. Locale-independent fields
 * (icon/accent) live here; translated title/blurb live in `FEATURE_TEXT` below, keyed
 * by `Locale` then `Feature.id`  -  see TASK-0011.
 */
const FEATURE_BASE: FeatureBase[] = [
  { id: "xp-levels", icon: "feature.xp-levels", accent: "var(--accent-growth)" },
  { id: "daily-quests", icon: "feature.daily-quests", accent: "var(--accent-feed)" },
  { id: "skill-tree", icon: "feature.skill-tree", accent: "var(--accent-sleep)" },
  {
    id: "achievements",
    icon: "feature.achievements",
    accent: "var(--grad-plasma-from)",
  },
  {
    id: "streaks-buffs",
    icon: "feature.streaks-buffs",
    accent: "var(--grad-plasma-to)",
  },
  {
    id: "apple-watch",
    icon: "feature.apple-watch",
    accent: "var(--accent-growth)",
  },
];

const FEATURE_TEXT: Record<Locale, Record<string, FeatureText>> = {
  en: {
    "xp-levels": {
      title: "XP & Levels",
      blurb:
        "Every feed, sleep, and growth log earns XP. Your baby's hero levels up.",
    },
    "daily-quests": {
      title: "Daily Quests",
      blurb: 'Tracking becomes daily missions  -  "3 feeds today = +320 XP."',
    },
    "skill-tree": {
      title: "Skill Tree",
      blurb:
        "Smiles, rolls, first words  -  milestones as an unlockable skill tree.",
    },
    achievements: {
      title: "Achievements",
      blurb: "Earn badges and trophies for streaks and milestones.",
    },
    "streaks-buffs": {
      title: "Streaks & Buffs",
      blurb: 'Stay consistent. "🔥 3-day streak, +50 XP bonus."',
    },
    "apple-watch": {
      title: "Apple Watch",
      blurb: "Log a feed or nap from your wrist in two taps.",
    },
  },
  ja: {
    "xp-levels": {
      title: "XP & レベル",
      blurb: "記録するたびにXP。赤ちゃんのヒーローがレベルアップ。",
    },
    "daily-quests": {
      title: "デイリークエスト",
      blurb: "記録が毎日のミッションに。「今日は3回授乳 = +320 XP」",
    },
    "skill-tree": {
      title: "スキルツリー",
      blurb: "笑顔、寝返り、はじめての言葉 -  - 成長をスキルツリーで解放。",
    },
    achievements: {
      title: "アチーブメント",
      blurb: "連続記録やマイルストーンでバッジとトロフィーを獲得。",
    },
    "streaks-buffs": {
      title: "ストリーク & バフ",
      blurb: "続けるほど強くなる。「🔥3日連続、+50 XP ボーナス」",
    },
    "apple-watch": {
      title: "Apple Watch",
      blurb: "授乳もおひるねも、手首から2タップで記録。",
    },
  },
  vi: {
    "xp-levels": {
      title: "XP & Cấp độ",
      blurb: "Mỗi lần ghi nhận là một ít XP. Người hùng của bé lên cấp.",
    },
    "daily-quests": {
      title: "Nhiệm vụ hằng ngày",
      blurb:
        'Việc theo dõi thành nhiệm vụ mỗi ngày. "3 cữ bú hôm nay = +320 XP."',
    },
    "skill-tree": {
      title: "Cây kỹ năng",
      blurb:
        "Nụ cười, lẫy, tiếng nói đầu tiên  -  cột mốc thành cây kỹ năng để mở khóa.",
    },
    achievements: {
      title: "Thành tựu",
      blurb: "Nhận huy hiệu và cúp cho chuỗi ngày đều và các cột mốc.",
    },
    "streaks-buffs": {
      title: "Chuỗi & Buff",
      blurb: 'Đều đặn là mạnh hơn. "🔥 chuỗi 3 ngày, +50 XP."',
    },
    "apple-watch": {
      title: "Apple Watch",
      blurb: "Ghi cữ bú hay giấc ngủ ngay trên cổ tay, chỉ 2 chạm.",
    },
  },
};

export function getFeatures(locale: Locale): Feature[] {
  const text = FEATURE_TEXT[locale];
  return FEATURE_BASE.map((base) => ({ ...base, ...text[base.id] }));
}
