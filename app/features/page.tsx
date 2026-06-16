import type { Metadata } from "next";
import Link from "next/link";
import { features } from "@/lib/content/features";
import { spritePath, type SpriteKey } from "@/lib/content/sprites";
import { DepthPageShell } from "@/components/seo/DepthPageShell";

const TITLE = "BabyLeveling Features — A Full Baby Activity Tracker";
const DESCRIPTION =
  "Every BabyLeveling feature: XP & Levels, Daily Quests, Skill Tree, Achievements, Streaks, and Apple Watch logging — a tracker that feels like a game.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/features" },
  openGraph: { url: "/features", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/**
 * One paragraph of grounded depth-copy per feature, beyond the one-line
 * card blurb in `lib/content/features.ts` — this page exists specifically
 * to give search/AI crawlers more to extract than the home showcase grid
 * does. Keyed by `Feature.id` so a missing entry is a build-time TS error,
 * not a silently blank section.
 */
const FEATURE_DEPTH_COPY: Record<string, string> = {
  "xp-levels":
    "Every log — a feed, a nap, a diaper change — adds XP toward your baby's next level, so progress is visible every single day, not just at milestones.",
  "daily-quests":
    "Quests reset every day, turning the same routine into a fresh, completable goal each morning instead of an open-ended chore list.",
  "skill-tree":
    "Each branch maps to a category of growth, so you can see at a glance where your baby is leveling up fastest.",
  achievements:
    "Badges stay in a permanent trophy case, so the wins from week one are still there to look back on at month twelve.",
  "streaks-buffs":
    "Streaks track consecutive days of consistent logging, with bonus XP as the reward for simply showing up.",
  "apple-watch":
    "Built for one-handed, middle-of-the-night use, so you never have to fully wake up — or unlock your phone — just to log a feed.",
};

/**
 * `/features` (TASK-0010) — the SEO-depth counterpart to the home S5
 * Feature Showcase. Reuses the same `features` data so a card never drifts
 * between the two surfaces; anchor IDs are the `Feature.id` values
 * themselves (`#xp-levels`, `#daily-quests`, …), matching the stable IDs
 * named in the task brief exactly.
 */
export default function FeaturesPage() {
  return (
    <DepthPageShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            Every feature. One full RPG.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-lo sm:text-lg">
            BabyLeveling is a gamified baby activity tracker for iOS and Apple
            Watch — here&apos;s everything it tracks, and every way that
            tracking turns into a game.
          </p>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col gap-12">
          {features.map((feature) => (
            <section
              key={feature.id}
              id={feature.id}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon */}
                <img
                  src={spritePath(feature.icon as SpriteKey)}
                  alt=""
                  width={40}
                  height={40}
                />
                <h2 className="font-display text-2xl text-hi">
                  {feature.title}
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-lo">
                {feature.blurb} {FEATURE_DEPTH_COPY[feature.id]}
              </p>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col items-center gap-3 text-center">
          <p className="text-base text-lo">
            Curious exactly how a feed or a nap turns into XP?{" "}
            <Link
              href="/rpg-system"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              See the care-to-XP system in depth
            </Link>
            , or{" "}
            <Link
              href="/parents"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              read about Parent Mode
            </Link>{" "}
            if you want the clinical side first.
          </p>
        </div>
      </div>
    </DepthPageShell>
  );
}
