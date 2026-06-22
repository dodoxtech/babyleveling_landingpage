"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getStoredTheme, type ThemeId } from "@/lib/theme/registry";

type MascotPose = "sitting" | "waving";

interface ThemedBabyMascotProps {
  pose: MascotPose;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const MASCOT_SRC: Record<
  MascotPose,
  Record<ThemeId, string>
> = {
  sitting: {
    cute: "/assets/characters/cute-baby-girl-sitting.png",
    focus: "/assets/characters/cute-baby-boy-sitting.png",
    zen: "/assets/characters/cute-baby-girl-sitting.png",
  },
  waving: {
    cute: "/assets/characters/cute-baby-girl-waving.png",
    focus: "/assets/characters/cute-baby-boy-waving.png",
    zen: "/assets/characters/cute-baby-girl-waving.png",
  },
};

export function ThemedBabyMascot({
  pose,
  alt,
  width,
  height,
  className,
  priority = false,
}: ThemedBabyMascotProps) {
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

  return (
    <Image
      src={MASCOT_SRC[pose][theme]}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
