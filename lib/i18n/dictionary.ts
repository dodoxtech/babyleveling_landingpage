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
      headline: string;
      headlineEmphasis: string;
      tagline: string;
      ctaLabel: string;
      ctaSubLabel: string;
    };
    heroChar: { line: string; alt: string };
    reveal: { headline: string; body: string; cta: string };
    loop: { eyebrow: string; title: string };
    features: { eyebrow: string; title: string };
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
    shots: {
      eyebrow: string;
      title: string;
      prevLabel: string;
      nextLabel: string;
    };
    themes: {
      eyebrow: string;
      title: string;
      tablistLabel: string;
      /** Contains the literal token `{name}`, substituted with the (untranslated) theme name. */
      previewLabel: string;
    };
    family: { eyebrow: string; title: string; body: string };
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
