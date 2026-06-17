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
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2">The app feels like a tiny command center.</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            Big tap targets, friendly icons, and character progress make one
            handed logging feel calm.
          </p>
        </div>

        <div className="mt-10">
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
