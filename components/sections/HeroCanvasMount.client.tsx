"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import { useReducedMotion } from "@/lib/motion";

const HeroCanvas = lazy(
  () => import("@/components/sections/HeroCanvas.client"),
);

/**
 * Decides whether the Hero gets the animated R3F starfield or the static
 * reduced-motion still, and defers loading the Three.js bundle until after
 * the text has painted.
 *
 * - Under `prefers-reduced-motion`/low-power (`lib/motion.ts`), the canvas is
 *   never imported at all — just the static gradient/particle-dot CSS still
 *   (§7.3: "no camera dolly, no particle animation").
 * - Otherwise it mounts on the next tick after hydration (`requestIdleCallback`
 *   with a timeout fallback) so the dynamic `import()` never competes with the
 *   server-rendered text for the first paint / LCP.
 */
export function HeroCanvasMount() {
  const reducedMotion = useReducedMotion();
  const [shouldLoadCanvas, setShouldLoadCanvas] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const handle = win.requestIdleCallback(() => setShouldLoadCanvas(true));
      return () => win.cancelIdleCallback?.(handle);
    }

    const timeout = window.setTimeout(() => setShouldLoadCanvas(true), 200);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  if (reducedMotion || !shouldLoadCanvas) {
    return <StaticHeroStill />;
  }

  return (
    <Suspense fallback={<StaticHeroStill />}>
      <HeroCanvas />
    </Suspense>
  );
}

/**
 * The reduced-motion / pre-hydration fallback: one beautiful static frame of
 * the void (per §7.3) instead of the animated starfield — a fixed gradient +
 * a few fixed-position dots, all CSS, zero JS, zero CLS (it occupies the same
 * absolute box the canvas would).
 */
function StaticHeroStill() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, rgba(244,244,250,0.6) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 80% 15%, rgba(244,244,250,0.5) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 35% 70%, rgba(244,244,250,0.4) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 60% 45%, rgba(244,244,250,0.5) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 90% 80%, rgba(244,244,250,0.35) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 20% 90%, rgba(244,244,250,0.4) 50%, transparent 51%)",
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}
