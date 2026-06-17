import type { Locale } from "@/lib/i18n/config";

/** A member of the co-op "party" — parent, partner, grandparent, etc. */
export interface FamilyRole {
  id: string;
  role: string;
  blurb: string;
  sprite: string;
}

interface FamilyRoleBase {
  id: string;
  sprite: string;
}

interface FamilyRoleText {
  role: string;
  blurb: string;
}

/**
 * S9 Family Sharing copy — see docs/planning/05-copy-multilingual.md ("S9 Family
 * Sharing") and the "co-op quest" framing in docs/planning/01-strategy.md §3 (S9). No
 * adult character art exists yet (only `babyBoy`/`babyGirl`/`icon` sprites under
 * `public/sprites/`), so every role uses an existing activity icon as its party-member
 * glyph rather than an invented portrait — swappable for real character art later.
 * Translated `role`/`blurb` live in `FAMILY_ROLE_TEXT` below — see TASK-0011.
 */
const FAMILY_ROLE_BASE: FamilyRoleBase[] = [
  { id: "parent", sprite: "icon.family" },
  { id: "partner", sprite: "icon.reminder" },
  { id: "grandparent", sprite: "icon.gift" },
  { id: "caregiver", sprite: "icon.calendar" },
];

const FAMILY_ROLE_TEXT: Record<Locale, Record<string, FamilyRoleText>> = {
  en: {
    parent: {
      role: "Parent (You)",
      blurb:
        "The quest-giver and the hero's biggest fan — logging every feed, nap, and milestone.",
    },
    partner: {
      role: "Partner",
      blurb:
        "A second player on the same save file — every log syncs instantly, so no one's flying blind.",
    },
    grandparent: {
      role: "Grandparent",
      blurb:
        "Invited to the party from day one — cheering milestones and pitching in on babysitting quests.",
    },
    caregiver: {
      role: "Caregiver",
      blurb:
        "Nannies and sitters join the same timeline, so care never has a gap between shifts.",
    },
  },
  ja: {
    parent: {
      role: "保護者(あなた)",
      blurb:
        "クエストを与える人であり、いちばんのファン——すべての授乳、おひるね、マイルストーンを記録する。",
    },
    partner: {
      role: "パートナー",
      blurb:
        "同じセーブデータで遊ぶ、もうひとりのプレイヤー——記録は即時に同期されるから、誰も置いていかれない。",
    },
    grandparent: {
      role: "祖父母",
      blurb:
        "はじめからパーティーに招待——マイルストーンを喜び、ベビーシッターのクエストにも参加する。",
    },
    caregiver: {
      role: "保育者",
      blurb:
        "ベビーシッターも同じタイムラインに参加。シフトの間にケアの空白が生まれない。",
    },
  },
  vi: {
    parent: {
      role: "Ba mẹ (Bạn)",
      blurb:
        "Người giao nhiệm vụ và là fan lớn nhất của người hùng — ghi lại mỗi cữ bú, giấc ngủ và cột mốc.",
    },
    partner: {
      role: "Bạn đời",
      blurb:
        "Người chơi thứ hai trên cùng một file lưu — mọi ghi nhận đồng bộ ngay lập tức, không ai bị bỏ lại.",
    },
    grandparent: {
      role: "Ông bà",
      blurb:
        "Được mời vào đội ngay từ ngày đầu — cùng reo hò những cột mốc và góp sức vào các nhiệm vụ trông bé.",
    },
    caregiver: {
      role: "Người chăm sóc",
      blurb:
        "Người trông trẻ tham gia cùng một dòng thời gian, để việc chăm sóc không có khoảng trống giữa các ca.",
    },
  },
};

export function getFamilyRoles(locale: Locale): FamilyRole[] {
  const text = FAMILY_ROLE_TEXT[locale];
  return FAMILY_ROLE_BASE.map((base) => ({ ...base, ...text[base.id] }));
}
