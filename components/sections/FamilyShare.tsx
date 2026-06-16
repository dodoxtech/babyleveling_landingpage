import { familyRoles } from "@/lib/content/family";
import { FamilyShareParty } from "@/components/sections/FamilyShareParty.client";

/** S9 copy — see docs/planning/05-copy-multilingual.md ("S9 Family Sharing"). */
const FAMILY_SHARE_TITLE = "Raise them together. Level up as a party.";
const FAMILY_SHARE_BODY =
  "Invite a partner and grandparents. Everyone caring for your baby joins the same quest — and shares the same timeline.";

/**
 * S9 — Family Sharing: A Co-op Quest (Act IV). Server shell that owns the
 * section landmark, title, body, and the `familyRoles` data import; the
 * scroll-orchestrated gather lives in the client island since Framer
 * Motion's `whileInView` needs the DOM/viewport.
 */
export function FamilyShare() {
  return (
    <section
      id="family"
      aria-label="S9 · Family Sharing"
      className="border-b border-white/5 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lo">
            Belonging
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-hi">
            {FAMILY_SHARE_TITLE}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-lo">
            {FAMILY_SHARE_BODY}
          </p>
        </div>

        <FamilyShareParty roles={familyRoles} />
      </div>
    </section>
  );
}
