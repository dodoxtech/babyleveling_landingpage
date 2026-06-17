import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface HeroCharacterProps {
  locale: Locale;
}

const reasons = [
  {
    icon: "/assets/icons/heart-pulse.png",
    title: "Care feels lighter",
    desc: "Routine tracking becomes a warm little reward loop.",
  },
  {
    icon: "/assets/icons/xp-badge.png",
    title: "Progress is visible",
    desc: "Parents see patterns without staring at a clinical chart.",
  },
  {
    icon: "/assets/icons/family.png",
    title: "Everyone joins in",
    desc: "Partners and caregivers can share the same adventure.",
  },
  {
    icon: "/assets/icons/camera.png",
    title: "Memories stay close",
    desc: "Milestones become keepsakes, not just database entries.",
  },
] as const;

export function HeroCharacter({ locale: _locale }: HeroCharacterProps) {
  return (
    <section
      id="hero-appears"
      aria-label="Why parents love BabyLeveling"
      className="px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] bg-[var(--bg-playfield)] p-8">
          <Image
            src="/assets/scenes/hero-cute-bg.png"
            alt=""
            fill
            className="object-cover opacity-55"
            aria-hidden="true"
          />
          <Image
            src="/assets/characters/cute-baby-girl-waving.png"
            alt="Smiling BabyLeveling mascot waving"
            width={300}
            height={300}
            className="absolute bottom-0 left-1/2 z-10 w-[68%] max-w-[20rem] -translate-x-1/2 motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]"
          />
        </div>

        <div>
          <h2 className="text-h2">
            A tracker with a face your family remembers.
          </h2>
          <p className="mt-4 max-w-[36rem] text-lg leading-8 text-[var(--text-secondary)]">
            BabyLeveling turns everyday care into a shared story, so logging
            feels encouraging instead of administrative.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((item) => (
              <article key={item.title} className="card-duolingo p-5">
                <Image src={item.icon} alt="" width={48} height={48} aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
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
