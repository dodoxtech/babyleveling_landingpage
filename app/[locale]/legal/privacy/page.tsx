import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DepthPageShell } from "@/components/seo/DepthPageShell";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localeAlternates, localeHref } from "@/lib/i18n/paths";
import { SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const LAST_UPDATED = "2026-06-18";

const privacySections = [
  {
    heading: "The short version",
    body: [
      "BabyLeveling is designed around a simple rule: your baby's care data belongs to your family. The app keeps baby logs on your device by default and does not sell, rent, or share that data with advertisers or data brokers.",
      "Optional cloud sync uses the platform account you choose, such as Apple iCloud or Google account services where available. BabyLeveling does not use cloud sync to build advertising profiles.",
    ],
  },
  {
    heading: "Information you choose to enter",
    body: [
      "You may enter feeding sessions, sleep logs, diaper changes, growth measurements, milestones, notes, caregiver activity, and settings such as themes or notification preferences.",
      "This information is used to show your baby tracker, RPG progress, family timeline, reminders, and export or backup features that you choose to use.",
    ],
  },
  {
    heading: "Device, platform, and app data",
    body: [
      "On Apple platforms, BabyLeveling may use iOS, watchOS, CloudKit, iCloud, notifications, Health-related permissions if you enable them, and App Store purchase systems if paid features ship later.",
      "On Android, if BabyLeveling is offered there, the app may use Android system storage, Google Play services, notifications, backup or sync features, and Google Play Billing for paid features.",
      "We only request permissions that support the app experience. You can change platform permissions in iOS, watchOS, or Android settings.",
    ],
  },
  {
    heading: "Website and waitlist data",
    body: [
      "If you join the waitlist, we collect your email address and the page or source that submitted it so we can send launch updates.",
      "We do not use advertising trackers. We may collect privacy-focused, aggregate analytics such as page views, form success counts, and device category to understand whether the website works.",
    ],
  },
  {
    heading: "Sharing and family access",
    body: [
      "If you invite another caregiver, they can see and add information inside the shared family timeline according to the access you grant.",
      "Do not invite someone unless you are comfortable with that person seeing baby care information. You can remove access through the app when family sharing controls are available.",
    ],
  },
  {
    heading: "Retention and deletion",
    body: [
      "Local app data stays on your device until you delete it in the app, delete the app, erase the device, or remove the related platform backup or cloud data.",
      "To remove waitlist data, email hello@babyleveling.app from the address you used. We will remove it from the launch list within 30 days unless we need to keep a limited record for security or legal reasons.",
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      "BabyLeveling is for parents, guardians, and caregivers. Children are not expected to create accounts, submit information, or use the website waitlist.",
      "Adults enter information about a child for family tracking. We do not knowingly collect contact information directly from children under 13.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "For privacy questions, data deletion requests, or platform permission concerns, email hello@babyleveling.app or use the contact form.",
    ],
  },
];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale).legal;
  const title = `${d.privacyH1}  -  ${SITE_NAME}`;
  const description =
    "How BabyLeveling handles baby-tracking data, platform permissions, waitlist email, family sharing, and deletion requests.";
  const path = "/legal/privacy";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: localeHref(locale, path),
      languages: localeAlternates(path),
    },
    openGraph: { url: localeHref(locale, path), title, description },
    twitter: { title, description },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const d = dict.legal;

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: d.privacyH1, href: localeHref(locale, "/legal/privacy") },
      ]}
    >
      <LegalPageFrame
        title={d.privacyH1}
        intro="BabyLeveling treats care logs as family records first. This policy explains what stays on-device, what platform services may touch, and how to reach us."
        lastUpdatedLabel={d.lastUpdated}
        related={{
          href: localeHref(locale, "/legal/terms"),
          label: d.termsH1,
        }}
      >
        {privacySections.map((section, index) => (
          <LegalSection
            key={section.heading}
            number={index + 1}
            heading={section.heading}
          >
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.heading === "Contact" ? (
              <p>
                Email{" "}
                <a
                  href="mailto:hello@babyleveling.app"
                  className="font-medium text-hi underline-offset-4 hover:underline"
                >
                  hello@babyleveling.app
                </a>{" "}
                or open the{" "}
                <Link
                  href={localeHref(locale, "/contact")}
                  className="font-medium text-hi underline-offset-4 hover:underline"
                >
                  contact page
                </Link>
                .
              </p>
            ) : null}
          </LegalSection>
        ))}
      </LegalPageFrame>
    </DepthPageShell>
  );
}

function LegalPageFrame({
  title,
  intro,
  lastUpdatedLabel,
  related,
  children,
}: {
  title: string;
  intro: string;
  lastUpdatedLabel: string;
  related: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 pt-6 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="card-duolingo overflow-hidden">
          <header
            className="border-b p-6 sm:p-8"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p className="font-display text-sm font-semibold text-accent">
              BabyLeveling legal
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.35rem,5vw,4.25rem)] leading-[1.04] tracking-tight text-hi">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-lo sm:text-lg">
              {intro}
            </p>
            <p className="mt-6 text-sm text-lo">
              {lastUpdatedLabel}:{" "}
              <time dateTime={LAST_UPDATED} className="font-medium text-hi">
                {new Date(LAST_UPDATED).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </header>

          <div className="flex flex-col gap-8 p-6 sm:p-8">{children}</div>
        </article>

        <aside className="glass h-fit rounded-[var(--radius-xl)] p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl text-hi">Platform coverage</h2>
          <div className="mt-5 grid gap-3">
            <PlatformItem
              title="Apple"
              copy="iOS, watchOS, iCloud, App Store"
            />
            <PlatformItem
              title="Android"
              copy="Android, Google Play, device backup"
            />
            <PlatformItem
              title="Web"
              copy="Waitlist, contact, privacy-first analytics"
            />
          </div>
          <Link
            href={related.href}
            className="btn-secondary btn-sm mt-6 w-full"
          >
            Read {related.label}
          </Link>
        </aside>
      </div>
    </div>
  );
}

function PlatformItem({ title, copy }: { title: string; copy: string }) {
  return (
    <div
      className="rounded-[var(--radius-md)] border bg-white/70 p-4"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <p className="font-display text-base font-semibold text-hi">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-lo">{copy}</p>
    </div>
  );
}

function LegalSection({
  number,
  heading,
  children,
}: {
  number: number;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="grid gap-4 border-b pb-8 last:border-b-0 last:pb-0 sm:grid-cols-[3.5rem_1fr]"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-grad-xp font-display text-sm font-bold text-white shadow-[0_4px_0_rgba(23,32,42,0.16)]">
        {String(number).padStart(2, "0")}
      </div>
      <div>
        <h2 className="font-display text-2xl leading-tight text-hi">
          {heading}
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-base leading-relaxed text-lo">
          {children}
        </div>
      </div>
    </section>
  );
}
