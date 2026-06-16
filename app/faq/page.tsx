import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { DepthPageShell } from "@/components/seo/DepthPageShell";

const TITLE = "FAQ — Is BabyLeveling Free & Is My Baby's Data Safe?";
const DESCRIPTION =
  "Answers to the most common BabyLeveling questions: platforms, pricing, launch date, baby data privacy, and whether it's a tracker or just a game.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/**
 * `/faq` (TASK-0010) — standalone, schema-rich mirror of the home FAQ
 * block, per docs/planning/02-architecture.md §4.1 ("FAQ — standalone,
 * schema-rich (mirrors home FAQ + more)"). Reuses `<Faq />` directly rather
 * than re-authoring the accordion: same `faqItems` data, same
 * `FAQPage` JSON-LD, so the two surfaces can never disagree with each
 * other. `Faq.tsx` has no `<h1>` of its own (by design, since on the home
 * page it's one section among many) — this page supplies the page-level
 * `<h1>` standalone pages need.
 */
export default function FaqPage() {
  return (
    <DepthPageShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "FAQ", href: "/faq" },
      ]}
    >
      <div className="px-6 pt-6 text-center">
        <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
          Frequently asked questions.
        </h1>
      </div>
      <Faq />
    </DepthPageShell>
  );
}
