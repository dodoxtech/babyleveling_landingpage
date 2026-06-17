"use client";

import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface ThemeGalleryProps {
  locale: Locale;
}

const modes = [
  {
    id: "cute",
    title: "Cute Mode",
    body: "Soft rewards, bright care icons, and a cuddly little hero.",
    image: "/assets/characters/cute-baby-girl-sitting.png",
  },
  {
    id: "warrior",
    title: "Warrior Mode",
    body: "Shields, quests, and bolder progress for parents who want the RPG flavor turned up.",
    image: "/assets/characters/warrior-baby-standing.png",
  },
] as const;

export function ThemeGallery({ locale: _locale }: ThemeGalleryProps) {
  const dispatchTheme = (theme: "cute" | "warrior") => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("babyleveling-theme", theme);
    document.documentElement.dispatchEvent(
      new CustomEvent("theme-change", { detail: { theme } }),
    );
  };

  return (
    <section id="themes" aria-label="Modes" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl text-h2">Pick the world your family wants to play in.</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {modes.map((mode) => (
            <article key={mode.id} className="card-duolingo grid gap-5 p-6 sm:grid-cols-[12rem_1fr] sm:items-center">
              <div className="rounded-[var(--radius-xl)] bg-[var(--bg-playfield)] p-4">
                <Image
                  src={mode.image}
                  alt={`${mode.title} baby mascot`}
                  width={190}
                  height={190}
                  className="mx-auto"
                />
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold">{mode.title}</h3>
                <p className="mt-2 leading-7 text-[var(--text-secondary)]">{mode.body}</p>
                <button
                  type="button"
                  onClick={() => dispatchTheme(mode.id)}
                  className="btn-secondary mt-5"
                >
                  Try {mode.title}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
