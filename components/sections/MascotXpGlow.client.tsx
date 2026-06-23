"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

interface MascotXpGlowProps {
  /** Positioning classes — must place the glow centered over the mascot. */
  className?: string;
}

/**
 * Decorative radial glow that briefly pulses over the mascot each time the
 * care simulator fires a 'care-xp-tick' CustomEvent. The key-remount trick
 * replays the mascot-glow CSS keyframe on every tick without touching the
 * mascot image itself (so idle-bob animation is never disrupted).
 *
 * Reduced motion: renders nothing (the care tiles and bar communicate the
 * loop without a visual reaction on the mascot).
 */
export function MascotXpGlow({
  className = "absolute left-1/2 top-1/2 z-20 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2",
}: MascotXpGlowProps) {
  const reduced = useReducedMotion();
  const [glowKey, setGlowKey] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const handler = () => setGlowKey((k) => k + 1);
    document.addEventListener("care-xp-tick", handler);
    return () => document.removeEventListener("care-xp-tick", handler);
  }, [reduced]);

  if (reduced || glowKey === 0) return null;

  return (
    <span
      key={glowKey}
      aria-hidden="true"
      className={`pointer-events-none rounded-full motion-safe:animate-[mascot-glow_700ms_ease-out_both] ${className}`}
      style={{
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--accent-tertiary) 55%, transparent) 0%, transparent 68%)",
      }}
    />
  );
}
