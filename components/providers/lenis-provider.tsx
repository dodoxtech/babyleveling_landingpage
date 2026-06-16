"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motion";

/** Root smooth-scroll island. Falls back to native scroll under reduced motion. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
