import Image from "next/image";
import { getFeatures } from "@/lib/content/features";
import { FeatureCard } from "@/components/sections/FeatureCard.client";
import type { Locale } from "@/lib/i18n/config";

interface FeatureShowcaseProps {
  locale: Locale;
}

export function FeatureShowcase({ locale }: FeatureShowcaseProps) {
  const features = getFeatures(locale);

  return (
    <section
      id="features"
      aria-label="Feature showcase"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            <h2 className="text-h2">Built like a character sheet for real life.</h2>
            <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
              All the serious baby logs are still there. They are wrapped in
              a warmer system parents can keep coming back to.
            </p>
          </div>
          <div className="relative hidden min-h-[14rem] overflow-hidden rounded-[2rem] lg:block">
            <Image
              src="/assets/scenes/features-bg.png"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              className={
                index === 0 || index === 3
                  ? "md:col-span-3"
                  : "md:col-span-2"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
