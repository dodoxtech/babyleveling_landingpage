import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import vi from "@/locales/vi.json";
import type { Locale } from "@/lib/i18n/config";

/** A run of text, optionally a link  -  lets a translated sentence reorder a
 * link anywhere in the sentence instead of assuming English word order. */
export interface RichTextPart {
  text: string;
  href?: string;
}

export interface Dictionary {
  blog: {
    h1: string;
    tagline: string;
    published: string;
    readMore: string;
    backToBlog: string;
    relatedReading: string;
  };
  about: {
    h1: string;
    missionHeading: string;
    missionBody: string;
    whyHeading: string;
    whyBody: string;
    whatHeading: string;
    whatBody: string;
    privacyHeading: string;
    privacyBody: string;
  };
  contact: {
    h1: string;
    intro: string;
    emailLabel: string;
    subjectLabel: string;
    subjectSupport: string;
    subjectPress: string;
    subjectPartnerships: string;
    subjectOther: string;
    messageLabel: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    invalid: string;
    emailDirect: string;
    directEmail: string;
  };
  legal: {
    privacyH1: string;
    termsH1: string;
    lastUpdated: string;
  };
  nav: {
    cta: string;
    features: string;
    rpg: string;
    parents: string;
    pricing: string;
    faq: string;
  };
  footer: {
    tagline: string;
    explore: string;
    company: string;
    legal: string;
    about: string;
    blog: string;
    contact: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  common: {
    home: string;
  };
  home: {
    hero: {
      eyebrow: string;
      headlineLead: string;
      headlineEmphasis: string;
      tagline: string;
      ctaPrimary: string;
      platformNote: string;
      cardLevelStatus: string;
      cardQuickLog: string;
      questFeed: string;
      questSleep: string;
      questGrowth: string;
    };
    /** S2 "Why parents love BabyLeveling" section. */
    heroChar: {
      title: string;
      body: string;
      mascotAlt: string;
      reasons: { title: string; desc: string }[];
    };
    /** S3 leveling-journey reveal. `stages[]` are zipped by index with local
     * art/level/position meta in Reveal.tsx; `note` is journey-time, not baby age. */
    reveal: {
      eyebrow: string;
      headline: string;
      body: string;
      /** HUD label above the rail (game chrome). */
      railLabel: string;
      stages: { title: string; note: string }[];
      /** "Achievement unlocked" micro-label on the payoff banner. */
      achievement: string;
      payoffLead: string;
      payoffBody: string;
      cta: string;
    };
    /** S4 RPG care-loop section. `stats[].value` stays as a literal (numbers/∞). */
    loop: {
      eyebrow: string;
      title: string;
      body: string;
      stats: { value: string; label: string }[];
      steps: { title: string; desc: string }[];
    };
    features: { title: string; body: string };
    modes: {
      eyebrow: string;
      title: string;
      tablistLabel: string;
      statLevel: string;
      statTotalXp: string;
      statDayStreak: string;
      statFeedsLogged: string;
      statSleepTracked: string;
      statWeight: string;
      chartAlt: string;
    };
    /** S7 "Tour the tiny command center" screenshot tour. `screens`/`mock` are
     * keyed by Screenshot.id; XP/HP/level numbers stay as literals in the UI. */
    shots: {
      eyebrow: string;
      title: string;
      /** Mobile/reduced-motion intro paragraph. */
      body: string;
      /** Desktop sticky-tour scroll affordance. */
      scrollHint: string;
      /** Word prefixed to a numeric level, e.g. `Level 12`. */
      levelWord: string;
      /** Narrative copy per screen, keyed by Screenshot.id. */
      screens: Record<
        string,
        {
          tabTitle: string;
          subtitle: string;
          eyebrow: string;
          heading: string;
          body: string;
        }
      >;
      /** Copy rendered inside the simulated phone screens, keyed by screen. */
      mock: {
        dashboard: {
          nextLevel: string;
          feed: string;
          sleep: string;
          lastActivity: string;
          lastActivityValue: string;
        };
        questLog: {
          title: string;
          subtitle: string;
          quests: { title: string; note: string; reward: string }[];
        };
        skillTree: {
          title: string;
          milestones: string[];
          unlocked: string;
          unlockedNote: string;
        };
        trophyRoom: { title: string; trophies: string[] };
      };
    };
    /** S6 Parent Mode reassurance section. Pre-launch we have no real users to
     * quote, so `trust` carries founder/privacy/waitlist points, not testimonials. */
    parents: {
      eyebrow: string;
      title: string;
      body: string;
      trust: { title: string; body: string }[];
      stats: { value: string; label: string }[];
    };
    themes: {
      /** "Coming after launch" pill  -  the app ships one theme; the rest are roadmap. */
      badge: string;
      eyebrow: string;
      title: string;
      body: string;
      /** Contains the literal token `{name}`, substituted with the (untranslated) theme name. */
      tryLabel: string;
      /** Localized card copy keyed by ThemeId (`cute`/`focus`/`zen`); `name` stays untranslated. */
      cards: Record<string, { persona: string; blurb: string; tags: string[] }>;
    };
    family: {
      /** "Coming after launch" pill  -  shared care is post-launch and needs an account. */
      badge: string;
      eyebrow: string;
      title: string;
      body: string;
      badgeSuffix: string;
      roles: { role: string; note: string }[];
    };
    faq: { eyebrow: string; title: string };
    waitlist: {
      headline: string;
      body: string;
      placeholder: string;
      emailLabel: string;
      cta: string;
      ctaVariantB: string;
      ctaSubmitting: string;
      invalid: string;
      error: string;
      successHeadline: string;
      successBody: string;
    };
  };
  depth: {
    features: {
      h1: string;
      intro: string;
      closing: RichTextPart[];
      /** One elaboration sentence per feature id, keyed by Feature.id. */
      featureDepth: Record<string, string>;
    };
    rpgSystem: {
      h1: string;
      intro: string;
      closing: RichTextPart[];
      /** One elaboration sentence per loop step id, keyed by LoopStep.id. */
      loopDepth: Record<string, string>;
    };
    parents: {
      h1: string;
      whatItTracksHeading: string;
      dataIsYoursHeading: string;
      twoModesHeading: string;
      twoModesBody: string;
      closing: RichTextPart[];
    };
    pricing: {
      h1: string;
      sectionTitle: string;
      bullets: string[];
      closing: RichTextPart[];
    };
    faq: { h1: string };
  };
}

const dictionaries: Record<Locale, Dictionary> = { en, ja, vi };

/** Synchronous on purpose: dictionaries are static JSON, not fetched. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
