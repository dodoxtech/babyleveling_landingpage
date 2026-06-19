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
    tags: ["Pastel palette", "Gentle sounds", "Sticker rewards"],
  },
  {
    id: "warrior",
    title: "Warrior Mode",
    body: "Shields, quests, and bolder progress for parents who want the RPG flavor turned up.",
    image: "/assets/characters/warrior-baby-standing.png",
    tags: ["Bold contrast", "Quest framing", "Shield streaks"],
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
    <section
      id="themes"
      aria-label="Modes"
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[var(--accent-tertiary)] opacity-[0.16] blur-3xl" />
        <div className="absolute -left-20 bottom-4 h-72 w-72 rounded-full bg-[var(--accent-secondary)] opacity-[0.12] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            Two ways to play
          </p>
          <h2 className="mt-3 text-h2">
            Pick the world your family wants to play in.
          </h2>
          <p className="mt-5 max-w-[40rem] text-lg leading-8 text-[var(--text-secondary)]">
            Same logs, same data  -  a different coat of paint. Switch any time;
            the whole page repaints instantly so you can feel each one.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {modes.map((mode) => (
            <article
              key={mode.id}
              className="card-duolingo grid gap-6 p-7 sm:grid-cols-[13rem_1fr] sm:items-center"
            >
              <div className="rounded-[var(--radius-xl)] bg-[var(--bg-playfield)] p-5">
                <Image
                  src={mode.image}
                  alt={`${mode.title} baby mascot`}
                  width={210}
                  height={210}
                  className="mx-auto"
                />
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold">{mode.title}</h3>
                <p className="mt-2 leading-7 text-[var(--text-secondary)]">
                  {mode.body}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {mode.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-[var(--radius-sm)] bg-white/70 px-3 py-1 text-xs font-bold text-[var(--text-secondary)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => dispatchTheme(mode.id)}
                  className="btn-secondary mt-6"
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
