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
      className="overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-section-alt), color-mix(in srgb, var(--bg-section-alt) 58%, #ffffff))",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="text-h2">Swipe through the tiny command center.</h2>
          <p className="max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)] lg:justify-self-end">
            Big tap targets, playful progress, and parent-ready logs sit inside
            a phone frame large enough to inspect.
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <ScreenshotsCarousel
            screenshots={getScreenshots(locale)}
            prevLabel="Previous preview"
            nextLabel="Next preview"
          />
        </div>
      </div>
    </section>
  );
}
