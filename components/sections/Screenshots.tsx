import { getScreenshots } from "@/lib/content/screenshots";
import { ScreenshotsCarousel } from "@/components/sections/ScreenshotsCarousel.client";
import type { Locale } from "@/lib/i18n/config";

interface ScreenshotsProps {
  locale: Locale;
}

export function Screenshots({ locale }: ScreenshotsProps) {
  return (
    <section
      id="screenshots"
      aria-label="App preview"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:overflow-visible lg:p-0"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-section-alt), color-mix(in srgb, var(--bg-section-alt) 58%, #ffffff))",
      }}
    >
      <div className="mx-auto max-w-6xl lg:max-w-none">
        <ScreenshotsCarousel
          screenshots={getScreenshots(locale)}
          prevLabel="Previous preview"
          nextLabel="Next preview"
        />
      </div>
    </section>
  );
}
