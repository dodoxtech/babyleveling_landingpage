import { SITE_NAME, SITE_URL, SITE_DESCRIPTOR } from "@/lib/seo";
import { getFeatures } from "@/lib/content/features";

/**
 * Pure schema-data builders for GEO/AEO structured data.
 * Each function returns a plain JSON-LD object — no JSX, no side effects.
 * Imported by `components/seo/JsonLd.tsx`; tested in `tests/seo-schemas.test.ts`.
 *
 * See TASK-0029 for the GEO rationale behind each field addition.
 */

const CORE_TRACKING_FEATURES = [
  "Feeding tracking with timestamp, volume, and nursing side",
  "Sleep tracking with start time, duration, and pattern history",
  "Diaper tracking",
  "Growth tracking with WHO growth percentile charts",
  "Health records including medications and vaccines",
  "Family sharing for partners and grandparents on one shared timeline",
  "3 visual themes: Royal, Warrior, and Zen",
  "Parent Mode — pediatrician-ready log without RPG overlay",
];

export function buildMobileApplicationSchema(): Record<string, unknown> {
  const rpgFeatureList = getFeatures("en").map((f) => f.title);

  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTOR,
    operatingSystem: "iOS 17+, watchOS",
    applicationCategory: "LifestyleApplication",
    applicationSubCategory: "Baby Tracker",
    availableOnDevice: ["iPhone", "Apple Watch"],
    countriesSupported: ["US", "JP", "VN"],
    featureList: [...CORE_TRACKING_FEATURES, ...rpgFeatureList],
    url: SITE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero h2", "#faq"],
    },
  };
}

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    knowsAbout: ["baby tracking", "gamified parenting", "iOS app development"],
    contactPoint: {
      "@type": "ContactPoint",
      url: `${SITE_URL}/en/contact`,
      contactType: "customer support",
    },
  };
}

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildHowToSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How BabyLeveling turns baby care into an RPG adventure",
    description: SITE_DESCRIPTOR,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Log a care activity",
        text: "Open BabyLeveling on your iPhone or Apple Watch and record any care activity — a feeding session, sleep period, diaper change, growth measurement, or health record. The Apple Watch companion app lets you log in two taps without unlocking your phone, making middle-of-the-night entries fast and friction-free. Every activity is timestamped and saved to the shared family timeline.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Earn XP for your baby's hero",
        text: "Each logged activity converts directly into XP for your baby's fantasy hero. A feeding earns +8 XP, a sleep session earns +10 XP, and completing a full daily care routine triggers a Daily Quest bonus of +50 XP. The values reflect real care intensity — consistent, attentive parenting translates into measurable hero growth, with no exaggeration or fabrication.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Level up your baby's hero",
        text: "As XP accumulates, your baby's hero levels up — shown through the hero card, XP progress bar, and an ever-growing level number. Leveling up unlocks new hero states and visual upgrades that reflect the real developmental stage of your child. Maintaining a consistent care streak adds Buff bonuses, rewarding parents who log regularly with accelerated hero progression.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Unlock achievements for developmental milestones",
        text: "Real developmental milestones — first smile, rolling over, sitting unassisted, first words — unlock in-app achievements worth +250 XP each. These appear as trophies in the Skill Tree and on the shared family timeline, creating a permanent, chronological record of your baby's growth that functions simultaneously as a rigorous parenting log and a game progression map.",
      },
    ],
  };
}
