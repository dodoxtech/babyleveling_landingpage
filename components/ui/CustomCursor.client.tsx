"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Desktop-only custom cursor: a small plasma-gradient orb with a trailing
 * "+XP" badge. Detects pointer: coarse (touch) and reduced-motion  -  both
 * suppress the cursor and leave the native one in place.
 *
 * Per reconciliation R-8: cursor is desktop-only.
 * Mounts as a fixed overlay that never affects layout (pointer-events: none).
 */
export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -80, y: -80 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isFinePointer || reducedMotion) return;

    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (raf.current === null) {
        raf.current = requestAnimationFrame(() => {
          raf.current = null;
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px)`;
          }
        });
      }
    };

    const onEnter = () => el.classList.remove("opacity-0");
    const onLeave = () => el.classList.add("opacity-0");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    // Hide the native cursor on the whole document.
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-active");
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [isFinePointer, reducedMotion]);

  if (!isFinePointer || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-150 will-change-transform"
    >
      {/* Orb */}
      <div className="bg-grad-plasma h-6 w-6 rounded-full opacity-80 shadow-[0_0_12px_var(--grad-plasma-from)]" />
      {/* +XP badge */}
      <span className="absolute -right-3 -top-2 rounded-full bg-[var(--grad-plasma-to)] px-1 py-px text-[8px] font-bold leading-none text-white shadow-sm">
        +XP
      </span>
    </div>
  );
}
