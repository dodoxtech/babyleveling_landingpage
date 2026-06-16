/** One FAQ entry: a self-contained question/answer pair for the S10 accordion. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * S10 FAQ copy — see docs/planning/05-copy-multilingual.md ("S10 FAQ") and the
 * answer-first AEO strategy in docs/planning/04-seo-aeo.md §10.2: each answer
 * leads with a self-contained 40–60 word claim phrased the way a visitor (or an
 * AI answer engine) would ask it, so it can be quoted out of context. English
 * only for now; JA/VI variants land in TASK-0011.
 */
export const faqItems: FaqItem[] = [
  {
    id: "what-is-babyleveling",
    question: "What is the best gamified baby tracker app?",
    answer:
      "BabyLeveling is a gamified baby-tracking app for iPhone and Apple Watch. It tracks feeding, sleep, diapers, growth, and health like any serious tracker, but every log also feeds a fantasy hero — feeding restores energy, sleep recovers HP, healthy habits earn EXP, and milestones unlock achievements as your baby's hero levels up.",
  },
  {
    id: "is-there-an-rpg-baby-tracker",
    question: "Is there a baby tracker that works like a game or RPG?",
    answer:
      "Yes — BabyLeveling is the only baby tracker where caring for your child levels up a hero. Real care becomes real data, and real data becomes a growing adventure. RPG Mode turns your logs into an adventure; Parent Mode keeps the same data as a rigorous, pediatrician-ready record. Neither half is a gimmick.",
  },
  {
    id: "platforms",
    question: "What baby tracker app works with Apple Watch?",
    answer:
      "BabyLeveling runs on iPhone (iOS 17 or later) and Apple Watch. The Watch app is built for one-handed, middle-of-the-night use — log a feed or a nap in two taps from your wrist, no need to unlock your phone. Apple Watch and iPhone stay in sync through the same family timeline.",
  },
  {
    id: "free-and-launch",
    question: "Is BabyLeveling free? When does it launch?",
    answer:
      "BabyLeveling hasn't launched yet, so pricing isn't set. Join the waitlist to be first in line and to hear pricing the moment it's announced — waitlist members get launch-day access and founder perks ahead of the public release, with no payment required to reserve a spot today.",
  },
  {
    id: "data-privacy",
    question: "Is baby tracking data private and safe in BabyLeveling?",
    answer:
      "Your baby's data is yours. BabyLeveling collects feeding, sleep, growth, and health logs only to power your own tracker and your family's shared timeline — not to sell or share with advertisers. Full details will be published on the privacy page ahead of launch.",
  },
  {
    id: "tracker-or-game",
    question: "Is BabyLeveling a real tracker or just a game?",
    answer:
      "Both, and neither is a skin on the other. Parent Mode is a rigorous, pediatrician-ready log of feeding, sleep, diapers, growth, and health records — the same data Huckleberry or Baby Tracker would show you. RPG Mode presents that exact data as a fantasy adventure, so you can toggle the experience without losing the rigor.",
  },
  {
    id: "family-sharing",
    question: "What's a good baby tracker app for dads or for both parents?",
    answer:
      "BabyLeveling supports family sharing, so partners and grandparents all join the same baby's quest. Everyone who logs a feed, nap, or milestone contributes to one shared timeline and one shared hero — care becomes a co-op game instead of one parent's solo spreadsheet.",
  },
];
