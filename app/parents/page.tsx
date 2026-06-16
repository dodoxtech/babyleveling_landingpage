import type { Metadata } from "next";
import Link from "next/link";
import { appModes } from "@/lib/content/modes";
import { faqItems } from "@/lib/content/faq";
import { DepthPageShell } from "@/components/seo/DepthPageShell";

const TITLE = "For Parents: Rigorous Tracking & Privacy — BabyLeveling";
const DESCRIPTION =
  "BabyLeveling is a baby tracker for new parents: pediatrician-ready records, real privacy, and Parent Mode for when you just want the facts.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/parents" },
  openGraph: { url: "/parents", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/**
 * `/parents` (TASK-0010) — the trust/rigor depth page for the skeptic/
 * optimizer persona. Reuses the `parent` entry from `lib/content/modes.ts`
 * (the same data S6 `ParentMode` reads) and the FAQ's `data-privacy` answer
 * verbatim, rather than authoring a second, possibly-drifting privacy claim.
 */
export default function ParentsPage() {
  const parentMode = appModes.find((mode) => mode.id === "parent");
  const privacyAnswer = faqItems.find(
    (item) => item.id === "data-privacy",
  )?.answer;

  return (
    <DepthPageShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "For Parents", href: "/parents" },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            Practical when you need it. Magical when you want it.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-lo sm:text-lg">
            {parentMode?.promise}
          </p>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col gap-12">
          <section id="what-it-tracks" className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">
              What Parent Mode tracks
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {parentMode?.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-base leading-relaxed text-lo"
                >
                  <span aria-hidden="true" className="mt-1 text-lo">
                    •
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </section>

          <section id="privacy" className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">
              Your baby&apos;s data is yours
            </h2>
            <p className="mt-4 text-base leading-relaxed text-lo">
              {privacyAnswer}
            </p>
          </section>

          <section id="two-modes" className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">
              Two modes, one source of truth
            </h2>
            <p className="mt-4 text-base leading-relaxed text-lo">
              Parent Mode and RPG Mode read the exact same activity log —
              toggling between them never loses rigor or swaps in different
              data. Parent Mode just presents it the way a pediatrician visit,
              or a 3 a.m. gut-check, actually needs.
            </p>
          </section>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col items-center gap-3 text-center">
          <p className="text-base text-lo">
            Want to see the same data as an adventure?{" "}
            <Link
              href="/rpg-system"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              Read about the RPG system
            </Link>
            , or{" "}
            <Link
              href="/faq"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              check the full FAQ
            </Link>{" "}
            for more on privacy, platforms, and launch timing.
          </p>
        </div>
      </div>
    </DepthPageShell>
  );
}
