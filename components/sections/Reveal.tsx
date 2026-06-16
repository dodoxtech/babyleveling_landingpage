import { RevealScene } from "@/components/sections/RevealScene.client";

/**
 * S3 copy — see docs/planning/05-copy-multilingual.md ("S3 The Reveal").
 * Local to this section (not promoted to `lib/content/`) because, unlike
 * Hero, no other section currently needs to read it; promote later if that
 * changes.
 */
const REVEAL_HEADLINE = "The hero is your baby. The XP is real life.";
const REVEAL_BODY =
  "Every feed, every nap, every tiny milestone — it all counts. BabyLeveling turns the care you already give into a story you grow together.";
const REVEAL_CTA = "See how it works →";

/**
 * S3 — The Reveal (Act II, the twist). Server shell that owns the section
 * landmark and static copy; the pin/scrub/peel mechanics live in the client
 * island (`RevealScene`) since GSAP ScrollTrigger needs the DOM/window.
 */
export function Reveal() {
  return (
    <section id="reveal" aria-label="S3 · The Reveal" className="relative">
      <RevealScene
        headline={REVEAL_HEADLINE}
        body={REVEAL_BODY}
        ctaLabel={REVEAL_CTA}
      />
    </section>
  );
}
