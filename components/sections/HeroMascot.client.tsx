"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getStoredTheme, type ThemeId } from "@/lib/theme/registry";

/**
 * The centerpiece hero mascot. Swaps per active visual theme: the warm "Bloom"
 * skin shows the seated baby girl mascot, Focus uses the seated baby boy
 * mascot, and Calm uses the waving baby mascot. Reads the persisted theme on
 * mount and stays in sync with the shared `theme-change` event, mirroring
 * ThemeToggle.client.
 */

const MASCOTS: Record<ThemeId, { src: string; alt: string }> = {
  cute: {
    src: "/assets/characters/cute-baby-girl-sitting.png",
    alt: "BabyLeveling seated baby girl mascot",
  },
  focus: {
    src: "/assets/characters/cute-baby-boy-sitting.png",
    alt: "BabyLeveling seated baby boy mascot",
  },
  zen: {
    src: "/assets/characters/cute-baby-girl-waving.png",
    alt: "BabyLeveling waving baby mascot",
  },
} as const;

interface HeroMascotProps {
  /** Positioning/sizing classes. Defaults to the centered floating-collage
   * placement used by the desktop hero; the mobile hero passes its own. */
  className?: string;
}

export function HeroMascot({
  className = "absolute left-1/2 top-1/2 z-10 w-[72%] max-w-[26rem] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]",
}: HeroMascotProps = {}) {
  const [theme, setTheme] = useState<ThemeId>("cute");

  useEffect(() => {
    setTheme(getStoredTheme());

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ theme: ThemeId }>).detail;
      if (detail?.theme) setTheme(detail.theme);
    };
    document.documentElement.addEventListener("theme-change", handler);
    return () =>
      document.documentElement.removeEventListener("theme-change", handler);
  }, []);

  const mascot = MASCOTS[theme];

  return (
    <Image
      src={mascot.src}
      alt={mascot.alt}
      width={420}
      height={420}
      priority
      className={className}
    />
  );
}
