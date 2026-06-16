import { loopSteps } from "@/lib/content/loop";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps.client";

/** S4 copy — see docs/planning/05-copy-multilingual.md ("S4 Care -> XP loop"). */
const HOW_IT_WORKS_TITLE = "Feed. Sleep. Grow. Level up.";

/**
 * S4 — How It Works: Care -> XP (Act III). Server shell that owns the section
 * landmark, title, and the data import; the scroll-popped chip reveal lives
 * in the client island (`HowItWorksSteps`) since Framer Motion's
 * `whileInView` needs the DOM/viewport.
 */
export function HowItWorks() {
  return (
    <section
      id="rpg-system"
      aria-label="S4 · Care to XP loop"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
            The mechanic
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
            {HOW_IT_WORKS_TITLE}
          </h2>
        </div>

        <HowItWorksSteps steps={loopSteps} />
      </div>
    </section>
  );
}
