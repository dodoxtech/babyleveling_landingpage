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
      className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ background: "var(--bg-section-alt)" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-[var(--accent-primary)] opacity-[0.10] blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[var(--accent-pink)] opacity-[0.10] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            Shared care
          </p>
          <h2 className="mt-3 text-h2">A co-op party for baby care.</h2>
          <p className="mt-5 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
            Shared logging gives everyone the same context without turning the
            family chat into a status board.
          </p>
          <p className="mt-8 inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] shadow-[0_4px_0_rgba(23,32,42,0.06)]">
            <span className="font-display text-2xl font-bold tabular-nums text-[var(--accent-primary)]">
              4
            </span>
            roles, one synced timeline
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {party.map((member) => (
            <article key={member.role} className="card-duolingo p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-[var(--radius-lg)] bg-[var(--bg-playfield)] p-3 ring-4 ring-white">
                  <Image
                    src={member.icon}
                    alt=""
                    width={48}
                    height={48}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {member.role}
                  </h3>
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
