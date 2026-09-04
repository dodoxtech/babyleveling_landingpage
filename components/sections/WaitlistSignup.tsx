import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { SectionObserver } from "@/components/sections/SectionObserver.client";
import { ThemedBabyMascot } from "@/components/sections/ThemedBabyMascot.client";
import { DownloadCta } from "@/components/sections/DownloadCta.client";

interface WaitlistSignupProps {
  locale: Locale;
}

/**
 * S11 closing CTA. Pre-launch this was an email waitlist form; the app has
 * since shipped, so it's now a straight App Store download push  -  see
 * TASK "update iOS link + demo screenshots" (2026-09-04). Section id/anchor
 * stays `#waitlist` since the header/footer/blog still link to it.
 */
export function WaitlistSignup({ locale }: WaitlistSignupProps) {
  const { waitlist } = getDictionary(locale).home;

  return (
    <SectionObserver sectionId="waitlist">
      <section
        id="waitlist"
        aria-label="Download"
        className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[var(--radius-xl)] border border-white/70 bg-[var(--bg-playfield)] p-6 shadow-[var(--shadow-colored)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-10">
          <div className="relative min-h-[18rem]">
            <ThemedBabyMascot
              pose="waving"
              alt="Waving baby mascot"
              width={280}
              height={280}
              className="mx-auto motion-safe:animate-[idle-bob_4s_ease-in-out_infinite]"
            />
          </div>

          <div>
            <h2 className="text-h2">{waitlist.headline}</h2>
            <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
              {waitlist.body}
            </p>

            <div className="mt-7 flex flex-col items-start gap-3">
              <DownloadCta
                label={waitlist.cta}
                location="download_section"
              />
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
                <Image
                  src="/assets/icons/xp-badge.png"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
                {waitlist.subNote}
              </span>
            </div>
          </div>
        </div>
      </section>
    </SectionObserver>
  );
}
