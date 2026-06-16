import { features } from "@/lib/content/features";
import { FeatureCard } from "@/components/sections/FeatureCard.client";

/** S5 copy — see docs/planning/05-copy-multilingual.md ("S5 Feature Showcase"). */
const FEATURE_SHOWCASE_TITLE = "A full RPG, built on real baby care.";

/**
 * S5 — Feature Showcase (Act III). Server shell that owns the section
 * landmark, title, and the `features` data import; each card's scroll
 * reveal lives in the client island (`FeatureCard`) since Framer Motion's
 * `whileInView` needs the DOM/viewport. The first card spans two columns on
 * large screens for the "asymmetric grid" the storyboard calls for (§8.4) —
 * XP & Levels is the mechanic every other card builds on, so it earns the
 * bigger tile.
 */
export function FeatureShowcase() {
  return (
    <section
      id="features"
      aria-label="S5 · Feature Showcase"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
            The gameplay
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
            {FEATURE_SHOWCASE_TITLE}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              className={index === 0 ? "lg:col-span-2" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
