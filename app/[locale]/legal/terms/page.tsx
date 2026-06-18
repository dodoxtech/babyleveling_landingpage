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

const termsSections = [
  {
    heading: "Acceptance",
    body: [
      "By using BabyLeveling, this website, or any related app experience, you agree to these Terms of Service. If you do not agree, do not use the app or website.",
      "These terms apply to pre-launch waitlist access, public website use, and the app when it becomes available through supported platform stores.",
    ],
  },
  {
    heading: "App license",
    body: [
      `${SITE_NAME} grants you a limited, non-exclusive, non-transferable, revocable license to use the app for personal, family, and caregiving purposes.`,
      "You may use the app on supported Apple devices, Android devices, or other platforms where BabyLeveling is officially distributed. You may not copy, modify, sell, sublicense, or reverse-engineer the app except where applicable law allows it.",
    ],
  },
  {
    heading: "Apple and Google terms",
    body: [
      "If you download BabyLeveling from the Apple App Store, Apple's App Store terms and policies also apply, including Apple rules for purchases, subscriptions, family sharing, refunds, and device permissions.",
      "If BabyLeveling is distributed through Google Play, Google Play terms and policies also apply, including Google Play Billing, subscriptions, refunds, family library controls, and Android permission controls.",
      "Apple and Google are not responsible for this website, the waitlist, or BabyLeveling support unless their own platform terms say otherwise.",
    ],
  },
  {
    heading: "Accounts, family sharing, and data",
    body: [
      "The app is designed to work without forcing a BabyLeveling account. Some features, such as family sharing, cloud sync, export, or paid features, may require platform accounts, app accounts, or consent from the family organizer.",
      "You are responsible for the accuracy of the information you enter and for choosing who can access a shared family timeline.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You may not use BabyLeveling for unlawful activity, harassment, abuse, unauthorized access, security testing without permission, scraping, spam, or any use that disrupts the service for other families.",
      "You may not submit content that violates another person's rights or includes information you are not authorized to share.",
    ],
  },
  {
    heading: "Medical disclaimer",
    body: [
      "BabyLeveling is a logging and habit-support tool. It is not a medical device and does not provide medical advice, diagnosis, treatment, emergency guidance, or clinical decision support.",
      "Always contact a qualified healthcare provider for questions about your baby's health, feeding, sleep, growth, medication, symptoms, or emergencies.",
    ],
  },
  {
    heading: "Payments and subscriptions",
    body: [
      "Joining the waitlist is free. If paid features, purchases, or subscriptions are introduced later, pricing will be shown before purchase.",
      "Purchases made through Apple or Google are handled by the relevant store. Store refund rules, renewal settings, cancellation flows, and taxes may apply.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      `BabyLeveling, ${SITE_NAME}, the website, app design, artwork, logos, software, and content are owned by BabyLeveling or its licensors.`,
      "You may not use our brand assets or app content in a way that suggests endorsement, partnership, or ownership without written permission.",
    ],
  },
  {
    heading: "Disclaimers and liability",
    body: [
      "The app and website are provided as is and as available. We do not promise that BabyLeveling will be uninterrupted, error-free, compatible with every device, or available in every country or store.",
      `To the maximum extent permitted by law, ${SITE_NAME} is not liable for indirect, incidental, special, consequential, punitive, or lost-data damages arising from your use of the app or website.`,
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We may update these terms as BabyLeveling moves from waitlist to launch and as platform support changes. We will update the date on this page when material terms change.",
      "Questions about these terms can be sent to hello@babyleveling.app or through the contact page.",
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
  const title = `${d.termsH1}  -  ${SITE_NAME}`;
  const description =
    "Terms for BabyLeveling website, waitlist, app license, platform store rules, family sharing, medical disclaimers, and payments.";
  const path = "/legal/terms";
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

export default async function TermsPage({ params }: PageProps) {
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
        { label: d.termsH1, href: localeHref(locale, "/legal/terms") },
      ]}
    >
      <LegalPageFrame
        title={d.termsH1}
        intro="These terms cover the BabyLeveling website, waitlist, app license, supported platform stores, and the family-tracking responsibilities that come with baby data."
        lastUpdatedLabel={d.lastUpdated}
        related={{
          href: localeHref(locale, "/legal/privacy"),
          label: d.privacyH1,
        }}
      >
        {termsSections.map((section, index) => (
          <LegalSection
            key={section.heading}
            number={index + 1}
            heading={section.heading}
          >
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.heading === "Changes and contact" ? (
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
          <h2 className="font-display text-xl text-hi">Store terms</h2>
          <div className="mt-5 grid gap-3">
            <PlatformItem
              title="Apple"
              copy="App Store rules, iCloud, subscriptions"
            />
            <PlatformItem
              title="Android"
              copy="Google Play rules, Android permissions"
            />
            <PlatformItem
              title="BabyLeveling"
              copy="Website, waitlist, app support"
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
