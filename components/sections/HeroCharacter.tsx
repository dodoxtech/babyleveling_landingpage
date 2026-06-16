import { spritePath } from "@/lib/content/sprites";
import { HeroCharacterMount } from "@/components/sections/HeroCharacterMount.client";
import { HeroCharacterXpBar } from "@/components/sections/HeroCharacterXpBar.client";

/**
 * S2 copy — see docs/planning/05-copy-multilingual.md ("S2 Hero Appears").
 * Local to this section, same reasoning `Reveal.tsx` records for its own copy.
 */
const HERO_APPEARS_LINE = "Every hero starts at Level 1.";

/**
 * S2 — The Hero Appears (Act I). Server shell: the headline is static HTML
 * so it never depends on the WebGL scene loading. `HeroCharacterMount` is a
 * decorative backdrop continuing S1's starfield (R3F consumer #2 of 2 under
 * R-1); the hero sprite in the foreground is plain `<img>` so it's visible
 * immediately, under reduced motion, and to screen readers, independent of
 * whether the canvas behind it ever mounts.
 */
export function HeroCharacter() {
  return (
    <section
      id="hero-appears"
      aria-label="S2 · The Hero Appears"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden border-b border-white/5 px-6 py-24"
    >
      <HeroCharacterMount />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- foreground hero sprite layered over a decorative R3F backdrop; not the LCP element (below the fold) */}
        <img
          src={spritePath("babyGirl.waving")}
          alt="A small hero, just beginning its adventure"
          width={140}
          height={140}
          className="motion-safe:animate-[idle-bob_3s_ease-in-out_infinite] drop-shadow-[0_0_50px_rgba(124,58,237,0.5)]"
        />

        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
          {HERO_APPEARS_LINE}
        </h2>

        <HeroCharacterXpBar />
      </div>
    </section>
  );
}
