export interface HeroContent {
  eyebrow: string;
  headline: string;
  headlineEmphasis: string;
  tagline: string;
  ctaLabel: string;
  ctaSubLabel: string;
}

/**
 * S1 Hero copy — see docs/planning/05-copy-multilingual.md ("S1 Hero").
 * `headline` + `headlineEmphasis` are rendered as two lines (the second carries
 * the "new game" twist in a lighter/italic treatment). English only for now;
 * JA/VI locale variants land in TASK-0011.
 */
export const heroContent: HeroContent = {
  eyebrow: "A new game has begun",
  headline: "You just had a baby.",
  headlineEmphasis: "You also just started a new game.",
  tagline: "Every day is a new quest.",
  ctaLabel: "Join the waitlist",
  ctaSubLabel: "Be first in line at launch.",
};
