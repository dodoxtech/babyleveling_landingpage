import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface FamilyShareProps {
  locale: Locale;
}

const party = [
  { role: "Parent", icon: "/assets/icons/shield.png", note: "Owns the daily rhythm" },
  { role: "Partner", icon: "/assets/icons/heart-pulse.png", note: "Sees what changed" },
  { role: "Grandparent", icon: "/assets/icons/book.png", note: "Keeps memories close" },
  { role: "Caregiver", icon: "/assets/icons/calendar.png", note: "Logs the handoff" },
] as const;

export function FamilyShare({ locale: _locale }: FamilyShareProps) {
  return (
    <section
      id="family"
      aria-label="Family sharing"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <h2 className="text-h2">A co-op party for baby care.</h2>
          <p className="mt-4 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
            Shared logging gives everyone the same context without turning the
            family chat into a status board.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {party.map((member) => (
            <article key={member.role} className="card-duolingo p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-[var(--radius-lg)] bg-[var(--bg-playfield)] p-3">
                  <Image src={member.icon} alt="" width={48} height={48} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">{member.role}</h3>
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">
                    {member.note}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
