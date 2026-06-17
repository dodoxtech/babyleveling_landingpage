"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motion";

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

/** Matches Hero's static 8% fill, so the S1→S2 hand-off reads as one continuous bar. */
const START_FILL = 8;
/** Close to Reveal's 33% dashboard fill, so the S2→S3 hand-off doesn't read as a jump. */
const END_FILL = 28;

/**
 * The S2 leg of the XP-bar continuity hand-off (§7.0): starts where Hero's
 * static bar left off, scrubs upward as this section scrolls through view,
 * and "ignites" with a brief glow pulse partway through  -  cueing the viewer
 * before Reveal picks the fill back up. Independent `ScrollTrigger.create`
 * call, no shared state with `Hero.tsx` or `RevealScene.client.tsx` (per the
 * "no shared-state coupling" note left in `RevealScene.client.tsx`).
 *
 * The fill is a `scaleX` transform on a full-width track (`origin-left`), not
 * an animated `width`  -  `width` is a layout property and forces reflow on
 * every scrub tick, where `transform` is compositor-only (TASK-0008 perf
 * hardening). GSAP/ScrollTrigger load via a dynamic `import()` inside the
 * effect, the same code-splitting/Lenis-sync treatment `RevealScene.client.tsx`
 * uses, for the same reason: this is below the fold, so Hero's critical
 * bundle shouldn't pay for it.
 *
 * Reduced motion: no `ScrollTrigger.create` at all  -  the bar renders pinned
 * at `END_FILL` outright (a static composition, not a freeze-frame mid-scrub).
 */
export function HeroCharacterXpBar() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTriggerModule["ScrollTrigger"] | null>(
    null,
  );

  useLenis(() => {
    scrollTriggerRef.current?.update();
  });

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const fill = fillRef.current;
    const glow = glowRef.current;
    if (!section || !fill || !glow) return;

    let disposed = false;
    let tween: ReturnType<GsapModule["gsap"]["timeline"]> | undefined;

    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRef.current = ScrollTrigger;

      tween = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      tween
        .fromTo(
          fill,
          { scaleX: START_FILL / 100 },
          { scaleX: END_FILL / 100, ease: "none" },
          0,
        )
        .fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.15)
        .to(glow, { opacity: 0, duration: 0.3 }, 0.45);
    });

    return () => {
      disposed = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      scrollTriggerRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <div
      ref={sectionRef}
      className="relative mt-2 w-full max-w-xs"
      role="img"
      aria-label="Experience bar, climbing toward level 2"
    >
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          ref={fillRef}
          className="bg-grad-plasma h-full w-full origin-left rounded-full"
          style={{
            transform: `scaleX(${(reducedMotion ? END_FILL : START_FILL) / 100})`,
          }}
        />
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_16px_4px_rgba(236,72,153,0.8)]"
        />
      </div>
    </div>
  );
}
