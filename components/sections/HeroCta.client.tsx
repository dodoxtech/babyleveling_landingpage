"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton.client";
import { trackEvent, getCtaVariant, type CtaVariant } from "@/lib/analytics";

interface HeroCtaProps {
  labelA: string;
  labelB: string;
  subLabel: string;
}

/**
 * Hero CTA client island (TASK-0013). Wraps the plasma CTA in MagneticButton
 * and fires a `cta_clicked` analytics event on click, tagged with the A/B
 * variant. The variant is resolved client-side only so SSR always renders
 * variant "a" (stable hydration, no layout shift).
 */
export function HeroCta({ labelA, labelB, subLabel }: HeroCtaProps) {
  const [variant, setVariant] = useState<CtaVariant>("a");

  useEffect(() => {
    setVariant(getCtaVariant());
  }, []);

  const label = variant === "b" ? labelB : labelA;

  return (
    <div className="flex flex-col items-center gap-3">
      <MagneticButton
        href="#waitlist"
        onClick={() => trackEvent("cta_clicked", { location: "hero", ab_variant: variant })}
        className="bg-grad-plasma rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--grad-plasma-from)]/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)] motion-safe:active:scale-[0.97]"
      >
        {label}
      </MagneticButton>
      <span className="text-xs text-lo">{subLabel}</span>
    </div>
  );
}
