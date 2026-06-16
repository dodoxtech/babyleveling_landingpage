import type { Metadata } from "next";
import Link from "next/link";
import { faqItems } from "@/lib/content/faq";
import { DepthPageShell } from "@/components/seo/DepthPageShell";

const TITLE = "Pricing — Free at Launch, Founder Perks — BabyLeveling";
const DESCRIPTION =
  "BabyLeveling hasn't launched, so pricing isn't final yet. Join the waitlist for free launch-day access and founder perks the moment it's set.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: { url: "/pricing", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/**
 * `/pricing` (TASK-0010) — per the task brief's explicit instruction, this
 * must not over-promise a pricing model that hasn't been decided
 * (docs/planning/reconciliation-log.md, "Outstanding decisions": "Pricing
 * model"). Reuses the FAQ's `free-and-launch` answer verbatim rather than
 * authoring a second, possibly-conflicting pricing claim.
 */
export default function PricingPage() {
  const launchAnswer = faqItems.find(
    (item) => item.id === "free-and-launch",
  )?.answer;

  return (
    <DepthPageShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Pricing", href: "/pricing" },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            Be there at launch — free.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-lo sm:text-lg">
            {launchAnswer}
          </p>
        </div>

        <div className="mx-auto mt-16 w-full max-w-2xl">
          <section className="glass rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl text-hi">
              What we know today
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-left">
              <li className="flex items-start gap-2 text-base leading-relaxed text-lo">
                <span aria-hidden="true" className="mt-1">
                  •
                </span>
                Joining the waitlist is free and always will be.
              </li>
              <li className="flex items-start gap-2 text-base leading-relaxed text-lo">
                <span aria-hidden="true" className="mt-1">
                  •
                </span>
                Waitlist members get launch-day access and founder perks ahead
                of the public release.
              </li>
              <li className="flex items-start gap-2 text-base leading-relaxed text-lo">
                <span aria-hidden="true" className="mt-1">
                  •
                </span>
                The final pricing model isn&apos;t set — we&apos;ll email the
                waitlist the moment it is, before it&apos;s public anywhere
                else.
              </li>
            </ul>
          </section>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-base text-lo">
            Not sure it&apos;s for you yet?{" "}
            <Link
              href="/features"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              See every feature
            </Link>{" "}
            or{" "}
            <Link
              href="/faq"
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              read the full FAQ
            </Link>{" "}
            before you decide.
          </p>
        </div>
      </div>
    </DepthPageShell>
  );
}
