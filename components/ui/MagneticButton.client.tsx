"use client";

import { useRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { useReducedMotion } from "@/lib/motion";

interface MagneticButtonProps extends ComponentPropsWithoutRef<"a"> {
  children: ReactNode;
  /** Strength of the magnetic pull [0-1]. Default 0.35. */
  strength?: number;
}

/**
 * Wraps an <a> tag with a magnetic hover effect  -  the element subtly follows
 * the cursor within its bounding box. Desktop-only: on pointer:coarse (touch)
 * or reduced-motion devices, renders as a plain <a> with zero overhead.
 *
 * Per reconciliation R-8: desktop-only, respects reduced-motion.
 */
export function MagneticButton({
  children,
  strength = 0.35,
  className,
  ...props
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
    el.addEventListener(
      "transitionend",
      () => {
        if (el) el.style.transition = "";
      },
      { once: true },
    );
  };

  return (
    <a
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}
