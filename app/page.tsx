/**
 * Landing page composition (S0–S12), per docs/planning/02-architecture.md §5.
 *
 * S0 (Nav / Brand Frame) is mounted once in `app/layout.tsx` as persistent chrome,
 * not here — every route gets the header. Sections below are ordered placeholders;
 * later tasks replace each `<SectionPlaceholder>` with its real `sections/*`
 * component.
 *
 * Section IDs double as the nav anchors in `lib/content/nav.ts`. The standalone
 * `/features`, `/rpg-system`, `/parents`, `/pricing` depth pages (sitemap tier 2,
 * P1/P3) don't exist yet, so each primary nav link points at the landing section
 * that covers the same topic: Features -> S5 Feature Showcase, RPG System -> S4
 * Care-to-XP loop (the mechanic `/rpg-system` will explain in depth), For Parents
 * -> S6 Parent Mode, Pricing -> S11 Waitlist (pricing isn't set pre-launch; the
 * waitlist is the answer), FAQ -> S10 FAQ. The CTA always targets S11 waitlist.
 *
 * S1 (Hero), S2 (Hero Appears), S3 (Reveal), S4 (Care -> XP loop), S5 (Feature
 * Showcase), and S6 (Parent Mode) are real components as of TASK-0003/
 * TASK-0005/TASK-0006. S10 (FAQ), S11 (Waitlist), and S12 (Footer) are real
 * components as of TASK-0004.
 */

import { Hero } from "@/components/sections/Hero";
import { HeroCharacter } from "@/components/sections/HeroCharacter";
import { Reveal } from "@/components/sections/Reveal";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { ParentMode } from "@/components/sections/ParentMode";
import { Faq } from "@/components/sections/Faq";
import { WaitlistSignup } from "@/components/sections/WaitlistSignup";
import { SiteFooter } from "@/components/ui/SiteFooter";

interface SectionPlaceholderProps {
  id: string;
  label: string;
}

function SectionPlaceholder({ id, label }: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className="flex min-h-[60vh] items-center justify-center border-b border-white/5 px-6 text-center"
    >
      <span className="text-sm text-lo">{label}</span>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main id="top" className="min-h-screen pt-[4.5rem]">
        {/* S1 — Hero */}
        <Hero />

        {/* S2 — The Hero Appears */}
        <HeroCharacter />

        {/* S3 — The Reveal */}
        <Reveal />

        {/* S4 — Care -> XP loop (the RPG mechanic; nav "RPG System" anchors here) */}
        <HowItWorks />

        {/* S5 — Feature Showcase */}
        <FeatureShowcase />

        {/* S6 — Parent Mode */}
        <ParentMode />

        {/* S7 — Screenshot Gallery */}
        <SectionPlaceholder id="screenshots" label="S7 · Screenshot Gallery" />

        {/* S8 — Theme Gallery */}
        <SectionPlaceholder id="themes" label="S8 · Theme Gallery" />

        {/* S9 — Family Sharing */}
        <SectionPlaceholder id="family" label="S9 · Family Sharing" />

        {/* S10 — FAQ */}
        <Faq />

        {/* S11 — Final CTA / Waitlist (header CTA scrolls here) */}
        <WaitlistSignup />
      </main>

      {/* S12 — Footer. Sibling of <main>, not nested in it — SiteFooter
          renders its own <footer> landmark. */}
      <SiteFooter />
    </>
  );
}
