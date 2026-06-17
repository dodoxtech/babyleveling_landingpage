/**
 * Landing page composition (S0-S12), per docs/planning/02-architecture.md §5.
 *
 * S0 (Nav / Brand Frame) is mounted once in `app/[locale]/layout.tsx` as
 * persistent chrome, not here  -  every route gets the header. As of
 * TASK-0010, the primary nav's Features/RPG System/For Parents/Pricing/FAQ
 * links point at the standalone `/features`, `/rpg-system`, `/parents`,
 * `/pricing`, `/faq` depth pages (`lib/content/nav.ts`), not at the section
 * IDs below  -  those IDs remain as landmarks/`aria-label`s and as targets for
 * in-page narrative links (e.g. Reveal's "See how it works" CTA), not nav
 * targets. The header CTA always targets S11 waitlist (`#waitlist`), which
 * exists on every page.
 *
 * Every section S1-S12 is a real component as of TASK-0003/TASK-0004/TASK-0005/
 * TASK-0006/TASK-0007. As of TASK-0011, every section receives `locale` and
 * reads its own copy from `lib/i18n` / `lib/content` getters  -  see
 * docs/decisions/ADR-0003-i18n-approach.md.
 */

import { notFound } from "next/navigation";
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
import { isLocale } from "@/lib/i18n/config";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <main id="top" className="min-h-screen pt-[4.5rem]">
        {/* S1  -  Hero */}
        <Hero locale={locale} />

        {/* S2  -  The Hero Appears */}
        <HeroCharacter locale={locale} />

        {/* S3  -  The Reveal */}
        <Reveal locale={locale} />

        {/* S4  -  Care -> XP loop (the RPG mechanic; see /rpg-system for the depth version) */}
        <HowItWorks locale={locale} />

        {/* S5  -  Feature Showcase */}
        <FeatureShowcase locale={locale} />

        {/* S6  -  Parent Mode */}
        <ParentMode locale={locale} />

        {/* S7  -  Screenshot Gallery */}
        <Screenshots locale={locale} />

        {/* S8  -  Theme Gallery */}
        <ThemeGallery locale={locale} />

        {/* S9  -  Family Sharing */}
        <FamilyShare locale={locale} />

        {/* S10  -  FAQ */}
        <Faq locale={locale} />

        {/* S11  -  Final CTA / Waitlist (header CTA scrolls here) */}
        <WaitlistSignup locale={locale} />
      </main>

      {/* S12  -  Footer. Sibling of <main>, not nested in it  -  SiteFooter
          renders its own <footer> landmark. */}
      <SiteFooter locale={locale} />
    </>
  );
}
