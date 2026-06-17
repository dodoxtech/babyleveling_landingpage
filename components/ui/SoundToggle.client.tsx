"use client";

import { useEffect, useState } from "react";
import { getSoundEnabled, setSoundEnabled } from "@/lib/sound";

/**
 * Opt-in sound toggle  -  a small fixed button in the bottom-right corner.
 * Muted by default (per reconciliation R-8). Preference persists in localStorage.
 * Keyboard accessible: button role, visible focus ring, descriptive aria-label.
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEnabled(getSoundEnabled());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Mute level-up sounds" : "Unmute level-up sounds"}
      title={enabled ? "Sound on" : "Sound off"}
      className="fixed bottom-5 right-5 z-50 flex h-9 w-9 items-center justify-center rounded-full glass border border-white/10 text-base text-lo transition-colors hover:border-[var(--grad-plasma-to)] hover:text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]"
    >
      <span aria-hidden="true">{enabled ? "🔊" : "🔇"}</span>
    </button>
  );
}
