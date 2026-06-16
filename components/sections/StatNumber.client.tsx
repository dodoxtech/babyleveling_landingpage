"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface StatNumberProps {
  value: number;
  suffix?: string;
  reducedMotion: boolean;
}

/**
 * Tabular-figure count-up for S6's stat panels (per the storyboard — "numbers
 * count up (tabular figures)"). Reduced motion: the final number renders
 * directly, no count animation (per §7.3 — "numbers shown final").
 */
export function StatNumber({
  value,
  suffix = "",
  reducedMotion,
}: StatNumberProps) {
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value, reducedMotion]);

  return (
    <span className="font-display text-3xl tabular-nums text-hi">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
