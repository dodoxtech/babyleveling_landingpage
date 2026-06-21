import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface HeroCharacterProps {
  locale: Locale;
}

/** Icons stay locale-independent; copy is zipped in by index from the dictionary. */
const reasonIcons = [
  "/assets/icons/heart-pulse.png",
  "/assets/icons/xp-badge.png",
  "/assets/icons/family.png",
  "/assets/icons/camera.png",
] as const;

export function HeroCharacter({ locale }: HeroCharacterProps) {
  const t = getDictionary(locale).home.heroChar;
  const reasons = t.reasons.map((reason, i) => ({
    ...reason,
    icon: reasonIcons[i],
  }));

  return (
    <section
      id="hero-appears"
      aria-label="Why parents love BabyLeveling"
      className="px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] bg-[var(--bg-playfield)] p-8">
          <Image
            src="/assets/characters/cute-baby-girl-waving.png"
            alt={t.mascotAlt}
            width={300}
            height={300}
            className="absolute bottom-0 left-1/2 z-10 w-[68%] max-w-[20rem] -translate-x-1/2 motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]"
          />
        </div>

        <div>
          <h2 className="text-h2">{t.title}</h2>
          <p className="mt-4 max-w-[36rem] text-lg leading-8 text-[var(--text-secondary)]">
            {t.body}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
            {reasons.map((item) => (
              <article key={item.title} className="card-duolingo p-3 sm:p-5">
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-8 w-8 object-contain sm:h-12 sm:w-12"
                  aria-hidden="true"
                />
                <h3 className="mt-2 font-display text-sm font-bold leading-tight sm:mt-4 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)] sm:mt-2 sm:text-sm sm:leading-6">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
