import { getLoopSteps } from "@/lib/content/loop";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps.client";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface HowItWorksProps {
  locale: Locale;
}

/**
 * S4 — How It Works: Care -> XP (Act III). Server shell that owns the section
 * landmark, title, and the data import; the scroll-popped chip reveal lives
 * in the client island (`HowItWorksSteps`) since Framer Motion's
 * `whileInView` needs the DOM/viewport.
 */
export function HowItWorks({ locale }: HowItWorksProps) {
  const { loop } = getDictionary(locale).home;

  return (
    <section
      id="rpg-system"
      aria-label="S4 · Care to XP loop"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
            {loop.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
            {loop.title}
          </h2>
        </div>

        <HowItWorksSteps steps={getLoopSteps(locale)} />
      </div>
    </section>
  );
}
