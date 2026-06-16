/**
 * Sitewide SEO/AEO constants — see docs/planning/04-seo-aeo.md §9.5 (metadata
 * starter) and §10.3 (entity-descriptor consistency). Single source so the
 * `<title>`/description, JSON-LD, `llms.txt`, and the Hero's SEO-bearing
 * `<h2>` never drift out of sync with each other.
 *
 * `SITE_URL`: no production domain has been decided yet (pre-launch, not
 * tracked as an outstanding decision in docs/planning/reconciliation-log.md
 * until this task — added there). `NEXT_PUBLIC_SITE_URL` lets a real domain
 * override this placeholder per-environment without a code change once one
 * is chosen.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://babyleveling.app";

export const SITE_NAME = "BabyLeveling";

/** `<title>` — see §9.5. 54 characters, within the ≤60 budget. */
export const SITE_TITLE =
  "BabyLeveling — The Baby Tracker That Plays Like an RPG";

/** `<meta description>` / OG description — see §9.5. 149 characters, within the ≤155 budget. */
export const SITE_DESCRIPTION =
  "Track feeding, sleep, and growth — and watch every log level up your baby's hero. The gamified baby tracker for iOS & Apple Watch. Join the waitlist.";

/**
 * The stable, self-contained entity descriptor — see §10.3 ("Definition
 * sentences early"). Used verbatim wherever the page or structured data
 * needs to state *what BabyLeveling is* for AEO/knowledge-graph consistency:
 * the Hero's SEO-bearing `<h2>`, JSON-LD `description` fields, and `llms.txt`.
 * Distinct from `SITE_DESCRIPTION` above, which is tuned for search-result
 * click-through rather than answer-engine extraction.
 */
export const SITE_DESCRIPTOR =
  "BabyLeveling is a gamified baby-tracking app for iOS and Apple Watch that turns feeding, sleep, and growth logs into XP for a fantasy hero.";
