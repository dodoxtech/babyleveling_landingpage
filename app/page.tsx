/**
 * Landing page composition (S0–S12), per docs/planning/02-architecture.md §5.
 *
 * S0 (Nav / Brand Frame) is mounted once in `app/layout.tsx` as persistent chrome,
 * not here — every route gets the header. As of TASK-0010, the primary nav's
 * Features/RPG System/For Parents/Pricing/FAQ links point at the standalone
 * `/features`, `/rpg-system`, `/parents`, `/pricing`, `/faq` depth pages
 * (`lib/content/nav.ts`), not at the section IDs below — those IDs remain as
 * landmarks/`aria-label`s and as targets for in-page narrative links (e.g.
 * Reveal's "See how it works" CTA), not nav targets. The header CTA always
 * targets S11 waitlist (`#waitlist`), which exists on every page.
 *
 * Every section S1–S12 is a real component as of TASK-0003/TASK-0004/TASK-0005/
 * TASK-0006/TASK-0007.
 */

import { Hero } from "@/components/sections/Hero";
import { HeroCharacter } from "@/components/sections/HeroCharacter";
import { Reveal } from "@/components/sections/Reveal";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { ParentMode } from "@/components/sections/ParentMode";
import { Screenshots } from "@/components/sections/Screenshots";
import { ThemeGallery } from "@/components/sections/ThemeGallery";
import { FamilyShare } from "@/components/sections/FamilyShare";
import { Faq } from "@/components/sections/Faq";
import { WaitlistSignup } from "@/components/sections/WaitlistSignup";
import { SiteFooter } from "@/components/ui/SiteFooter";

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

        {/* S4 — Care -> XP loop (the RPG mechanic; see /rpg-system for the depth version) */}
        <HowItWorks />

        {/* S5 — Feature Showcase */}
        <FeatureShowcase />

        {/* S6 — Parent Mode */}
        <ParentMode />

        {/* S7 — Screenshot Gallery */}
        <Screenshots />

        {/* S8 — Theme Gallery */}
        <ThemeGallery />

        {/* S9 — Family Sharing */}
        <FamilyShare />

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
