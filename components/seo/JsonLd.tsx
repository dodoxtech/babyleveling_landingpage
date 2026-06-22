import { SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  buildMobileApplicationSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildHowToSchema,
} from "@/lib/seo-schemas";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders one JSON-LD `<script>` block. Server-only, no client interactivity. */
function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Sitewide schema, mounted once in `app/layout.tsx`: who BabyLeveling is
 * (`Organization`), what this site is (`WebSite`), and what the product is
 * (`MobileApplication`). See docs/planning/04-seo-aeo.md §9.6.
 *
 * Deliberately omits a few spec-suggested fields rather than fabricate them:
 * - `Organization.logo`/`sameAs`  -  no square brand-mark asset (the only
 *   icon asset is a 16/32px favicon, too small for a "logo" `ImageObject`)
 *   or official social profiles exist pre-launch.
 * - `WebSite.potentialAction` (`SearchAction`)  -  this single-page site has
 *   no search endpoint to point one at; a fabricated one would be
 *   non-functional. Revisit if a real search (e.g. on `/blog`) ships.
 * - `MobileApplication.offers`/`aggregateRating`  -  pricing isn't set yet
 *   (docs/planning/reconciliation-log.md, "Outstanding decisions") and
 *   there are no real ratings pre-launch.
 * - `MobileApplication.screenshot`  -  depends on real App Store screenshots;
 *   add once the app store listing is live.
 * None of these are required for the corresponding schema to validate.
 *
 * Enriched in TASK-0029 (GEO): Organization gains `knowsAbout` + `contactPoint`;
 * MobileApplication gains `featureList`, `applicationSubCategory`,
 * `availableOnDevice`, `countriesSupported`, and `speakable` spec.
 */
export function SiteJsonLd() {
  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebSiteSchema()} />
      <JsonLd data={buildMobileApplicationSchema()} />
    </>
  );
}

interface FaqPageJsonLdProps {
  items: { question: string; answer: string }[];
}

/** `FAQPage` schema for the home FAQ block. See §9.6 + §10.2 (AEO). */
export function FaqPageJsonLd({ items }: FaqPageJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
}

/** `Article` schema for blog posts. See docs/planning/04-seo-aeo.md §9.6. */
export function ArticleJsonLd({
  title,
  description,
  datePublished,
  author,
  url,
}: ArticleJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished,
        author: {
          "@type": "Organization",
          name: author,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        url,
      }}
    />
  );
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/** `BreadcrumbList` schema for a depth page. See §9.6. `href`s are site-relative; resolved against `SITE_URL` for the schema's absolute `item` URLs. */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
        })),
      }}
    />
  );
}

/** `HowTo` schema for the RPG System page — describes the 4-step care-to-XP loop.
 *  English-only: schema content targets AI answer engines that index English. TASK-0029. */
export function HowToJsonLd() {
  return <JsonLd data={buildHowToSchema()} />;
}
