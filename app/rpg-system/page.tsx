import type { Metadata } from "next";
import Link from "next/link";
import { loopSteps } from "@/lib/content/loop";
import { spritePath, type SpriteKey } from "@/lib/content/sprites";
import { DepthPageShell } from "@/components/seo/DepthPageShell";

const TITLE = "RPG System: How Real Care Becomes XP — BabyLeveling";
const DESCRIPTION =
  "BabyLeveling is the parenting RPG app that turns feeding, sleep, and milestones into XP, HP, and achievements. See how the care-to-XP system works.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/rpg-system" },
  openGraph: { url: "/rpg-system", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/** One grounded elaboration sentence per loop step, beyond the card-sized mapping in `lib/content/loop.ts`. Keyed by `LoopStep.id`. */
const LOOP_DEPTH_COPY: Record<string, string> = {
  feeding:
    "Every bottle, breastfeeding session, or solid-food log restores your hero's energy meter — the same way feeding restores your baby's.",
  sleep:
    "Naps and night sleep recover HP, because rest is recovery, in the game and in real life.",
  habits:
    "Tummy time, bath time, reading — the small daily habits compound into EXP the same way they compound into development.",
  milestone:
    "A first smile, a first roll, a first word — each one pops an achievement, permanently recorded in the trophy room.",
};

/**
 * `/rpg-system` (TASK-0010) — the SEO-depth explainer for the S4 Care -> XP
 * mechanic. Reuses `loopSteps` (the same source S4's `HowItWorks` reads) so
 * the mapping itself can't drift between the home narrative and this page.
 */
export default function RpgSystemPage() {
  return (
    <DepthPageShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "RPG System", href: "/rpg-system" },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            Real care. Real XP. No skin-deep gamification.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-lo sm:text-lg">
            BabyLeveling is a parenting RPG app: every real act of care —
            feeding, sleep, healthy habits, milestones — maps directly to a game
            reward. Here&apos;s exactly how the loop works.
          </p>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col gap-12">
          {loopSteps.map((step) => (
            <section
              key={step.id}
              id={step.id}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon */}
                <img
                  src={spritePath(step.icon as SpriteKey)}
                  alt=""
                  width={40}
                  height={40}
                />
                <h2 className="font-display text-2xl text-hi">
                  {step.realAction}{" "}
                  <span className="text-lo">→ {step.gameReward}</span>
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-lo">
                {LOOP_DEPTH_COPY[step.id]}
              </p>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col items-center gap-3 text-center">
          <p className="text-base text-lo">
            Want the full RPG, not just the loop?{" "}
            <Link
              href="/features"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              See every feature this powers
            </Link>
            . And this exact data also{" "}
            <Link
              href="/parents"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              feeds Parent Mode
            </Link>{" "}
            — nothing here replaces a rigorous tracker, it adds to one.
          </p>
        </div>
      </div>
    </DepthPageShell>
  );
}
