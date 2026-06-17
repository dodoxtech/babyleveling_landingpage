import { RevealScene } from "@/components/sections/RevealScene.client";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface RevealProps {
  locale: Locale;
}

/**
 * S3 — The Reveal (Act II, the twist). Server shell that owns the section
 * landmark and static copy; the pin/scrub/peel mechanics live in the client
 * island (`RevealScene`) since GSAP ScrollTrigger needs the DOM/window.
 */
export function Reveal({ locale }: RevealProps) {
  const { reveal } = getDictionary(locale).home;

  return (
    <section id="reveal" aria-label="S3 · The Reveal" className="relative">
      <RevealScene
        headline={reveal.headline}
        body={reveal.body}
        ctaLabel={reveal.cta}
      />
    </section>
  );
}
