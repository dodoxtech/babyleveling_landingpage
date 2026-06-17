import { getFamilyRoles } from "@/lib/content/family";
import { FamilyShareParty } from "@/components/sections/FamilyShareParty.client";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface FamilyShareProps {
  locale: Locale;
}

/**
 * S9 — Family Sharing: A Co-op Quest (Act IV). Server shell that owns the
 * section landmark, title, body, and the `familyRoles` data import; the
 * scroll-orchestrated gather lives in the client island since Framer
 * Motion's `whileInView` needs the DOM/viewport.
 */
export function FamilyShare({ locale }: FamilyShareProps) {
  const { family } = getDictionary(locale).home;

  return (
    <section
      id="family"
      aria-label="S9 · Family Sharing"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
            {family.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
            {family.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-lo">
            {family.body}
          </p>
        </div>

        <FamilyShareParty roles={getFamilyRoles(locale)} />
      </div>
    </section>
  );
}
