import { getScreenshots } from "@/lib/content/screenshots";
import { ScreenshotsCarousel } from "@/components/sections/ScreenshotsCarousel.client";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface ScreenshotsProps {
  locale: Locale;
}

/**
 * S7 — Screenshot Gallery / Proof (Act III). Server shell that owns the
 * section landmark, title, and the `screenshots` data import; the snap-scroll
 * + arrow/dot nav mechanics live in the client island since they need the
 * DOM/viewport.
 */
export function Screenshots({ locale }: ScreenshotsProps) {
  const { shots } = getDictionary(locale).home;

  return (
    <section
      id="screenshots"
      aria-label="S7 · Screenshot Gallery"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
            {shots.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
            {shots.title}
          </h2>
        </div>

        <ScreenshotsCarousel
          screenshots={getScreenshots(locale)}
          prevLabel={shots.prevLabel}
          nextLabel={shots.nextLabel}
        />
      </div>
    </section>
  );
}
