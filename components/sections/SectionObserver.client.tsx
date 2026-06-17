"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeSection } from "@/lib/analytics";

interface SectionObserverProps {
  sectionId: string;
  children: ReactNode;
  className?: string;
}

/**
 * Thin wrapper that fires a `section_viewed` analytics event when ≥ 40 % of
 * its children enter the viewport. Renders as a plain <div> — no style impact.
 * Uses `observeSection` from `lib/analytics` which unobserves after first fire.
 */
export function SectionObserver({
  sectionId,
  children,
  className,
}: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return observeSection(ref.current, sectionId);
  }, [sectionId]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
