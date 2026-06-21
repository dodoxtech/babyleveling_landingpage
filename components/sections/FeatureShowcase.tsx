import { getFeatures } from "@/lib/content/features";
import { FeatureCard } from "@/components/sections/FeatureCard.client";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface FeatureShowcaseProps {
  locale: Locale;
}

export function FeatureShowcase({ locale }: FeatureShowcaseProps) {
  const features = getFeatures(locale);
  const t = getDictionary(locale).home.features;

  return (
    <section
      id="features"
      aria-label="Feature showcase"
      className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            <h2 className="text-h2">{t.title}</h2>
            <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
              {t.body}
            </p>
          </div>
        </div>

        <div className="mt-7 grid auto-rows-fr grid-cols-1 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              className={
                index === 0 || index === 3 ? "md:col-span-3" : "md:col-span-2"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
