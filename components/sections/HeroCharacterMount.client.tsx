"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

const HeroCharacterScene = lazy(
  () => import("@/components/sections/HeroCharacterScene.client"),
);

/**
 * Decides whether S2 gets the animated R3F island scene or the static
 * reduced-motion still, and defers loading the Three.js chunk until the
 * section nears the viewport.
 *
 * Unlike `HeroCanvasMount` (S1, which must not delay the LCP text), this
 * section is below the fold, so there's no first-paint race to protect —
 * loading is gated on an `IntersectionObserver` (`rootMargin` pre-fetches
 * just before it's visible) instead of `requestIdleCallback`.
 */
export function HeroCharacterMount() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {reducedMotion || !shouldLoad ? (
        <StaticIslandStill />
      ) : (
        <Suspense fallback={<StaticIslandStill />}>
          <HeroCharacterScene />
        </Suspense>
      )}
    </div>
  );
}

/**
 * Reduced-motion / pre-load fallback: one static frame of the island + hero
 * (per §7.3 — "static hero still") instead of the animated scene. A CSS glow
 * + the same sprite, no WebGL, no per-frame work.
 */
function StaticIslandStill() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-40 w-64 rounded-[50%] blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
