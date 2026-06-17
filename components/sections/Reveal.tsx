import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface RevealProps {
  locale: Locale;
}

const stages = [
  { src: "/assets/timeline/lv01-newborn.png", level: "Lv. 1", title: "Newborn", age: "0-1 mo" },
  { src: "/assets/timeline/lv05-explorer.png", level: "Lv. 5", title: "Explorer", age: "3-4 mo" },
  { src: "/assets/timeline/lv10-little-star.png", level: "Lv. 10", title: "Little Star", age: "6-9 mo" },
  { src: "/assets/timeline/lv20-adventurer.png", level: "Lv. 20", title: "Adventurer", age: "12-18 mo" },
  { src: "/assets/timeline/lv50-legend.png", level: "Lv. 50", title: "Legend", age: "2+ yr" },
] as const;

export function Reveal({ locale }: RevealProps) {
  const { reveal } = getDictionary(locale).home;

  return (
    <section
      id="reveal"
      aria-label="Level timeline"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="text-h2">{reveal.headline}</h2>
          <p className="mt-4 max-w-[38rem] text-lg leading-8 text-[var(--text-secondary)]">
            Baby growth already feels epic. BabyLeveling gives each phase a
            playful identity and keeps the practical logs underneath.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-duolingo overflow-hidden p-4 sm:p-6">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {stages.map((stage, index) => (
                <article
                  key={stage.level}
                  className={`shrink-0 snap-center rounded-[var(--radius-lg)] border bg-white p-4 text-center ${
                    index === 2 ? "w-56" : "w-44"
                  }`}
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <Image
                    src={stage.src}
                    alt={`${stage.title} baby hero stage`}
                    width={170}
                    height={170}
                    className="mx-auto"
                  />
                  <p className="mt-3 font-display text-lg font-bold text-[var(--accent-primary)]">
                    {stage.level}
                  </p>
                  <h3 className="font-display text-xl font-bold">{stage.title}</h3>
                  <p className="text-sm text-[var(--text-caption)]">{stage.age}</p>
                </article>
              ))}
            </div>
          </div>

          <aside
            className="rounded-[2rem] bg-[var(--accent-primary)] p-7 text-white"
            style={{ boxShadow: "0 7px 0 color-mix(in srgb, var(--accent-primary) 60%, #17202a)" }}
          >
            <Image
              src="/assets/icons/trophy.png"
              alt=""
              width={68}
              height={68}
              aria-hidden="true"
            />
            <h3 className="mt-5 font-display text-3xl font-bold">
              First smile becomes a trophy.
            </h3>
            <p className="mt-3 leading-7 text-white/88">
              Milestones can be celebrated without pretending every day is easy.
              The app keeps the joy visible and the data useful.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
