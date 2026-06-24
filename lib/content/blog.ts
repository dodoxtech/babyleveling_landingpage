import { SITE_NAME } from "@/lib/seo";

export interface BlogTable {
  headers: string[];
  rows: string[][];
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  /** Optional comparison table rendered as <table> after the paragraphs. */
  table?: BlogTable;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO 8601 YYYY-MM-DD  -  used for Article schema datePublished. */
  date: string;
  author: string;
  tags: string[];
  sections: BlogSection[];
  /** Internal links rendered as a "Related reading" block at the end of each article. */
  relatedLinks: { label: string; href: string }[];
  /** Inline FAQ pairs rendered at the end and emitted as FAQPage JSON-LD. */
  faqItems?: { question: string; answer: string }[];
}

const AUTHOR = `${SITE_NAME} Team`;

const POSTS: BlogPost[] = [
  {
    slug: "baby-tracker-app-ios",
    title: "The Best Baby Tracker App for iOS: Why Gamification Changes Everything",
    description:
      "Searching for the best baby tracker app for iOS? Here's why a gamified approach keeps new parents consistent where plain log apps fail.",
    date: "2026-06-10",
    author: AUTHOR,
    tags: ["baby tracker", "iOS", "gamification"],
    sections: [
      {
        paragraphs: [
          "The App Store has dozens of baby tracking apps for iPhone. Most of them are spreadsheets with a nicer icon  -  rows of feeding times, sleep durations, and diaper counts that you dutifully fill in at 3 a.m. and then never look at again.",
          "BabyLeveling takes a different approach. Instead of logging into a ledger, every feed, nap, and diaper change earns your baby's hero XP. Those XP go toward a level. That level goes on a character card that tells a story.",
        ],
      },
      {
        heading: "Why consistency matters more than accuracy",
        paragraphs: [
          "Pediatricians don't need data accurate to the second  -  they need patterns. Is your baby eating roughly every two hours? Growing steadily? Sleeping in longer stretches week over week? Those trends only emerge if you log consistently, and consistency requires motivation.",
          "Plain tracking apps rely entirely on duty. Gamified tracking gives you a reward loop: you log, your baby levels up, you see a number go up. That's not trivial  -  it's the same mechanic that makes fitness apps sticky.",
        ],
      },
      {
        heading: "What a gamified baby tracker actually tracks",
        paragraphs: [
          "BabyLeveling tracks the same data as any other iOS baby app: feeding (breast, bottle, solids), sleep (naps and night sessions), diapers, growth measurements, and custom milestones. The difference is presentation: each category maps to a game stat, each log earns XP, and milestones unlock achievements.",
          "There's also a Parent Mode that strips away the RPG chrome and shows the same data in a clinical format for checkups. Same log, two views  -  you switch with a single tap.",
        ],
      },
      {
        heading: "Built for Apple Watch from the start",
        paragraphs: [
          "The best baby tracker is the one you actually use at 3 a.m. BabyLeveling is designed first for Apple Watch  -  log a feed in two taps from your wrist, without unlocking your phone. iPhone and Watch sync in real time.",
        ],
      },
    ],
    relatedLinks: [
      { label: "See every feature BabyLeveling tracks", href: "/features" },
      { label: "How the XP system works", href: "/rpg-system" },
    ],
  },
  {
    slug: "how-to-track-newborn-sleep",
    title: "How to Track Newborn Sleep (and Actually Use the Data)",
    description:
      "A practical guide to tracking newborn sleep schedules on iOS  -  what to log, how to spot patterns, and why gamification keeps you consistent through the fog.",
    date: "2026-06-12",
    author: AUTHOR,
    tags: ["newborn sleep", "baby sleep tracker", "sleep schedule"],
    sections: [
      {
        paragraphs: [
          "Newborns sleep in short, irregular bursts  -  sometimes 45 minutes, sometimes three hours, rarely at predictable times. Tracking those bursts helps you find patterns, communicate clearly with your pediatrician, and catch regressions early.",
          "Here's a practical system for tracking newborn sleep on iOS, and why it matters more than most new parents expect.",
        ],
      },
      {
        heading: "What to log (and what to skip)",
        paragraphs: [
          "Log start time, end time, and location (arms, crib, bassinet, carrier). That's it. Don't try to record every stir or night waking  -  the data gets noisy fast.",
          "After two weeks of logs, you'll start to see windows: times your baby is reliably drowsy, natural awake windows based on age, and whether total daily sleep is tracking toward the expected range for their developmental stage.",
        ],
      },
      {
        heading: "How to read the patterns",
        paragraphs: [
          "Most baby sleep apps show a timeline view. What you're looking for: are nap durations lengthening over weeks? Is the longest sleep stretch drifting toward nighttime? Is total sleep within the recommended range for your baby's age?",
          "BabyLeveling shows sleep logs as both a game stat (HP recovered, in RPG mode) and a standard clinical summary (in Parent Mode)  -  the same data, two presentations, switching with a tap.",
        ],
      },
      {
        heading: "Why gamification helps at 3 a.m.",
        paragraphs: [
          "There are two enemies of sleep tracking: forgetting to log, and logging so inconsistently the data is useless. Gamification addresses the first with a quick Apple Watch tap and the second with a streak mechanic  -  consecutive days of logging earn bonus XP.",
          "A streak doesn't fix sleep deprivation. But it does give your exhausted brain a small reward for doing the thing, which is enough to make the habit stick.",
        ],
      },
    ],
    relatedLinks: [
      { label: "BabyLeveling for parents: the clinical side", href: "/parents" },
      { label: "Full feature list", href: "/features" },
    ],
  },
  {
    slug: "newborn-feeding-log-app",
    title: "Newborn Feeding Log App: How to Track Every Feed Without Losing Your Mind",
    description:
      "Everything you need to know about logging newborn feedings on iOS  -  what to track, how to build the habit, and why a game mechanic keeps it going past week one.",
    date: "2026-06-14",
    author: AUTHOR,
    tags: ["newborn feeding", "feeding log", "baby tracker app"],
    sections: [
      {
        paragraphs: [
          "Newborns feed 8-12 times a day. That's one feeding every two hours, around the clock, for the first several weeks. Tracking them matters  -  your pediatrician will ask, and the data tells you whether your baby is getting enough.",
          "But the habit of logging every feed is surprisingly hard to build. Here's how to make it stick.",
        ],
      },
      {
        heading: "What to track for each feeding",
        paragraphs: [
          "For breastfeeding: which side, duration on each side. For bottle feeding: volume in ounces or ml. For solids (when you get there): food type and approximate amount. Start simple  -  just side and duration  -  and add detail as the habit forms.",
          "Don't try to log perfectly from day one. A rough log is better than no log.",
        ],
      },
      {
        heading: "The fastest way to log: Apple Watch",
        paragraphs: [
          "The biggest drop-off in logging happens when logging is inconvenient. Reaching for your phone while holding a nursing baby is inconvenient.",
          "BabyLeveling is built Apple Watch-first: tap once to start a feed, tap once to end it. A two-tap log without picking up your phone. When the habit is that frictionless, it sticks.",
        ],
      },
      {
        heading: "What the data tells you",
        paragraphs: [
          "After a week of logs, look for: average feeds per day (should be 8-12 in week one), average duration or volume, and whether the gaps between feeds are growing (a good sign). Flag any sudden drop in feeding frequency  -  that's worth a call to your pediatrician.",
          "In BabyLeveling, feeding logs also power the XP system: each feed restores your hero's energy meter, so the data does double duty as game fuel and clinical record.",
        ],
      },
    ],
    relatedLinks: [
      { label: "See the RPG system that powers XP", href: "/rpg-system" },
      { label: "Features overview", href: "/features" },
    ],
  },
  {
    slug: "gamified-baby-tracker-what-it-is",
    title: "What Is a Gamified Baby Tracker? (And Why It's Better Than a Spreadsheet)",
    description:
      "Gamified baby trackers turn feeding, sleep, and growth logs into XP, levels, and achievements. Here's why the game layer keeps parents consistent where plain apps don't.",
    date: "2026-06-16",
    author: AUTHOR,
    tags: ["gamification", "baby tracker", "parenting app"],
    sections: [
      {
        paragraphs: [
          "A gamified baby tracker is a baby activity tracking app that wraps standard logging  -  feeding, sleep, diapers, growth  -  in a game layer: each log earns XP, XP go toward a level, and milestones unlock achievements.",
          "That definition sounds simple. The implications are not.",
        ],
      },
      {
        heading: "Why plain trackers fail most parents",
        paragraphs: [
          "Plain baby trackers fail for the same reason plain spreadsheets fail: they require intrinsic motivation. You have to want to log, believe it matters, and remember to do it  -  every time, while sleep-deprived, with your hands full.",
          "Most parents start strong and taper off by week three. The logs that made it into the app become useless because the gaps are as large as the data.",
        ],
      },
      {
        heading: "What a game layer actually adds",
        paragraphs: [
          "A well-designed game layer adds extrinsic motivation: a small, immediate reward (XP, a level-up animation, an achievement badge) for doing the thing. The reward doesn't have to be large. It just has to arrive immediately after the behavior.",
          "This is the same mechanic that makes fitness apps, language apps, and habit trackers stickier than their plain-log counterparts. Applied to baby tracking, it turns \"I should log this\" into \"I want to log this.\"",
        ],
      },
      {
        heading: "The risk: skin-deep gamification",
        paragraphs: [
          "Gamification fails when the game layer is decorative  -  points that don't mean anything, streaks with no consequence, badges for things you'd do anyway. The mechanic has to map to the real behavior you're trying to reinforce.",
          "BabyLeveling maps every game mechanic to a real parenting behavior: feeding restores your hero's energy, sleep recovers HP, consistent logging builds streaks with XP bonuses. The game rewards the same things good parenting requires.",
        ],
      },
      {
        heading: "Does it replace serious tracking?",
        paragraphs: [
          "No  -  and it's not supposed to. BabyLeveling includes a Parent Mode that presents the exact same log data in clinical format: timestamps, durations, volumes, growth percentiles. The RPG layer and the clinical layer read the same data. You can switch with one tap.",
          "Gamification is a delivery mechanism for consistency, not a replacement for the data itself.",
        ],
      },
    ],
    relatedLinks: [
      { label: "See every feature", href: "/features" },
      { label: "How the RPG system works", href: "/rpg-system" },
      { label: "Parent Mode: the clinical side", href: "/parents" },
    ],
  },
  {
    slug: "best-baby-tracker-apps-2026",
    title: "Best Baby Tracker Apps 2026: Compared Side by Side",
    description:
      "We compared the five most-used baby tracker apps for iPhone so you don't have to. Verdict up front: BabyLeveling for parents who want motivation, Huckleberry for sleep analysis, Baby Tracker for no-frills simplicity.",
    date: "2026-06-22",
    author: AUTHOR,
    tags: ["comparison", "baby tracker", "iOS apps", "best apps 2026"],
    sections: [
      {
        paragraphs: [
          "The best baby tracker app is the one you actually keep using past week three. Most parents start strong with whatever app they downloaded in the hospital parking lot, log every feed and diaper for ten days, and then taper off as the novelty fades and the sleep debt climbs.",
          "We tested five iOS baby tracker apps on the things that actually determine whether parents stick with them: how fast a 3 AM log takes, whether the data is useful at a pediatrician visit, and whether there is any reason to open the app when you're not actively logging. Here's the honest verdict.",
        ],
      },
      {
        heading: "Quick verdict",
        paragraphs: [
          "BabyLeveling is the pick if you want a tracker that motivates consistent use — the gamified XP loop and Apple Watch two-tap logging make it the stickiest option for parents who have tried and abandoned plain log apps before.",
          "Huckleberry wins for sleep analysis specifically — its SweetSpot nap prediction is genuinely useful in the 4-to-6-month sleep regression window.",
          "Baby Tracker by BabyTracker.net is the right call for parents who want something simple, free, and no-frills.",
          "Glow Baby and Sprout Baby are solid secondary options with strong milestone tracking, though neither has an Apple Watch app or a reward loop.",
        ],
      },
      {
        heading: "Side-by-side comparison",
        paragraphs: [
          "The table below covers the five dimensions that matter most for daily use. Ratings are based on publicly available feature information as of mid-2026.",
        ],
        table: {
          headers: [
            "Feature",
            "BabyLeveling",
            "Huckleberry",
            "Baby Tracker",
            "Glow Baby",
            "Sprout Baby",
          ],
          rows: [
            ["Gamification / XP loop", "Yes — full RPG", "No", "No", "No", "No"],
            ["Apple Watch app", "Yes — 2-tap log", "No", "Limited", "No", "No"],
            ["Family sharing", "Yes", "Yes (paid tier)", "Yes", "Yes", "Yes"],
            ["Clean mode for pediatrician", "Yes — Parent Mode", "Yes", "Yes", "Yes", "Yes"],
            ["Works offline", "Yes — on-device", "Partial", "Yes", "Partial", "Yes"],
            ["Pricing model", "TBD (waitlist)", "Subscription", "Freemium", "Freemium", "Paid upfront"],
            ["WHO growth charts", "Yes", "No", "Yes", "Yes", "Yes"],
            ["Milestone skill tree", "Yes", "No", "No", "Yes", "Yes"],
          ],
        },
      },
      {
        heading: "BabyLeveling",
        paragraphs: [
          "BabyLeveling is the only baby tracker where logging earns XP for a fantasy hero. Feed → +8 XP. Sleep → +10 XP. Growth check → +30 XP. Hit your daily care goals → +50 XP bonus. The hero levels up as the baby grows. It sounds like a gimmick until you realise the mechanic solves the one problem every other tracker ignores: what gets you to open the app at 3 AM when you're eight weeks in and running on four hours of sleep.",
          "The Apple Watch companion is built for exactly that moment — two taps on your wrist, no phone unlock, log saved. It's the fastest logging flow of any tracker on this list.",
          "The data underneath is as rigorous as any clinical app. Parent Mode strips the RPG layer entirely and shows the same logs in pediatrician-ready format: feeding history, sleep totals, WHO growth percentile charts, medication and vaccine records. Same data, two views, one tap to switch.",
          "BabyLeveling is pre-launch. Join the waitlist at babyleveling.com — pricing isn't set yet, but waitlist members get founder access.",
          "Best for: Parents who have tried and quit plain trackers. Parents who want to log from Apple Watch. Both parents sharing a single timeline.",
        ],
      },
      {
        heading: "Huckleberry",
        paragraphs: [
          "Huckleberry built its reputation on sleep science. The SweetSpot feature predicts the optimal nap window based on your baby's wake-time data and age — it's genuinely useful during the 4-to-6-month regression window when nap timing matters most.",
          "It's a subscription app with a clean iPhone interface and solid family sharing on the paid plan. There is no Apple Watch app and no gamification. If you're using a baby tracker primarily as a sleep tool and you're willing to pay a monthly fee, Huckleberry is the specialist choice.",
          "Best for: Parents focused on optimising sleep windows and willing to pay for expert-backed sleep guidance.",
        ],
      },
      {
        heading: "Baby Tracker by BabyTracker.net",
        paragraphs: [
          "Baby Tracker is the free, no-frills option. It covers feeding, sleep, and diapers with a clean timeline view and basic family sharing. There's no gamification, no Apple Watch app beyond limited complications, and no advanced analytics — but it works, it's free, and it doesn't require a subscription.",
          "Best for: Parents who want a simple, reliable log without paying anything or learning a new system.",
        ],
      },
      {
        heading: "Glow Baby",
        paragraphs: [
          "Glow Baby is a freemium tracker with strong milestone tracking and a well-designed timeline view. Family sharing is built in on the free tier. No Apple Watch app, no gamification, but the milestone photo journal is a genuine differentiator for parents who want a keepsake alongside the data.",
          "Best for: Parents who prioritise milestone documentation and sharing photos alongside care logs.",
        ],
      },
      {
        heading: "Sprout Baby",
        paragraphs: [
          "Sprout Baby is a paid-upfront app ($4.99 at time of writing) with a polished interface and comprehensive milestone tracking. No subscription, no Apple Watch app, no gamification. The one-time price and clean design attract parents who dislike subscription models.",
          "Best for: Parents who want to pay once and own the app outright, with strong milestone logging.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "If you have tried a tracker before and quit — get BabyLeveling. The XP loop and Apple Watch logging exist specifically to solve that problem.",
          "If your main concern is sleep and you want predictive nap guidance — get Huckleberry.",
          "If you want something free, simple, and with zero learning curve — get Baby Tracker.",
          "If photos and milestones are your priority — try Glow Baby.",
          "If you hate subscriptions and want to pay once — try Sprout Baby.",
          "The wrong tracker is the one that sits unopened on your phone. The data is only useful if you log it.",
        ],
      },
    ],
    relatedLinks: [
      { label: "BabyLeveling features in full", href: "/features" },
      { label: "How the XP system works", href: "/rpg-system" },
      { label: "Parent Mode and pediatrician records", href: "/parents" },
    ],
    faqItems: [
      {
        question: "What is the best baby tracker app for iPhone in 2026?",
        answer:
          "BabyLeveling is the best baby tracker for parents who want consistent motivation — it's the only app with gamification (XP, levels, quests) and a two-tap Apple Watch logging flow. Huckleberry is the best choice for sleep-focused parents who want nap prediction. Baby Tracker is the best free, no-frills option.",
      },
      {
        question: "Which baby tracker app works with Apple Watch?",
        answer:
          "BabyLeveling has the most capable Apple Watch integration of any baby tracker — two taps from the wrist to log a feed or sleep session without unlocking your phone. Baby Tracker has limited Watch support via complications. Huckleberry, Glow Baby, and Sprout Baby do not have Apple Watch apps.",
      },
      {
        question: "Is there a free baby tracker app that's actually good?",
        answer:
          "Baby Tracker by BabyTracker.net is the strongest free option — clean interface, family sharing, covers all core activities. Glow Baby is also free with a good milestone journal. BabyLeveling is pre-launch with pricing TBD, but a free tier is expected for core tracking.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
