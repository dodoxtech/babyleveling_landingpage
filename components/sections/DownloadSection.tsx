import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { SectionObserver } from "@/components/sections/SectionObserver.client";
import { ThemedBabyMascot } from "@/components/sections/ThemedBabyMascot.client";
import { DownloadCta } from "@/components/sections/DownloadCta.client";

interface DownloadSectionProps {
  locale: Locale;
}

/**
 * S11 closing CTA. Pre-launch this was an email waitlist form; the app has
 * since shipped, so this is a straight App Store download push and the
 * waitlist feature (form, API route, Google Sheets provider) has been
 * removed entirely  -  see docs/features/waitlist-signup.md (superseded).
 */
export function DownloadSection({ locale }: DownloadSectionProps) {
  const { download: copy } = getDictionary(locale).home;

  return (
    <SectionObserver sectionId="download">
      <section
        id="download"
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
            <h2 className="text-h2">{copy.headline}</h2>
            <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
              {copy.body}
            </p>

            <div className="mt-7 flex flex-col items-start gap-3">
              <DownloadCta label={copy.cta} location="download_section" />
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
                <Image
                  src="/assets/icons/xp-badge.png"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
                {copy.subNote}
              </span>
            </div>
          </div>
        </div>
      </section>
    </SectionObserver>
  );
}
