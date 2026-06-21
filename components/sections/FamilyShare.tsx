import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface FamilyShareProps {
  locale: Locale;
}

/** Icons stay locale-independent; copy is zipped in by index from the dictionary. */
const roleIcons = [
  "/assets/icons/shield.png",
  "/assets/icons/heart-pulse.png",
  "/assets/icons/book.png",
  "/assets/icons/calendar.png",
] as const;

export function FamilyShare({ locale }: FamilyShareProps) {
  const t = getDictionary(locale).home.family;
  const party = t.roles.map((member, i) => ({ ...member, icon: roleIcons[i] }));

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
          <p className="inline-flex items-center gap-2">
            <span className="rounded-full bg-[var(--accent-tertiary)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-on-accent,#1a1040)]">
              {t.badge}
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
              {t.eyebrow}
            </span>
          </p>
          <h2 className="mt-3 text-h2">{t.title}</h2>
          <p className="mt-5 max-w-[34rem] text-lg leading-8 text-[var(--text-secondary)]">
            {t.body}
          </p>
          <p className="mt-8 inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] shadow-[0_4px_0_rgba(23,32,42,0.06)]">
            <span className="font-display text-2xl font-bold tabular-nums text-[var(--accent-primary)]">
              {t.roles.length}
            </span>
            {t.badgeSuffix}
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
