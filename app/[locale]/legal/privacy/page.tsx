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

const LAST_UPDATED = "2026-06-17";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale).legal;
  const title = `${d.privacyH1}  -  ${SITE_NAME}`;
  const path = "/legal/privacy";
  return {
    title: { absolute: title },
    alternates: {
      canonical: localeHref(locale, path),
      languages: localeAlternates(path),
    },
    openGraph: { url: localeHref(locale, path), title },
    twitter: { title },
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
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-xs text-lo">
            {d.lastUpdated}:{" "}
            <time dateTime={LAST_UPDATED}>
              {new Date(LAST_UPDATED).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            {d.privacyH1}
          </h1>

          <div className="prose-sm mt-10 flex flex-col gap-8 text-lo">
            <LegalSection heading="1. The short version">
              <p>
                All data you enter into BabyLeveling lives on your device.
                We do not upload, sell, or share your baby&apos;s data without
                your explicit consent. iCloud sync (if enabled) uses Apple&apos;s
                end-to-end encrypted infrastructure  -  BabyLeveling servers never
                see your data.
              </p>
            </LegalSection>

            <LegalSection heading="2. What we collect">
              <p>
                <strong className="text-hi">App data (on-device only):</strong>{" "}
                Feeding logs, sleep logs, diaper logs, growth measurements,
                milestones, and custom notes. Stored locally using Apple&apos;s
                CoreData / SwiftData framework. Never transmitted to our servers.
              </p>
              <p>
                <strong className="text-hi">iCloud sync (optional):</strong>{" "}
                If you enable iCloud in iOS Settings, app data syncs via
                Apple&apos;s CloudKit. Data is encrypted in transit and at rest
                by Apple. BabyLeveling cannot access your CloudKit data.
              </p>
              <p>
                <strong className="text-hi">Waitlist email:</strong>{" "}
                If you join the waitlist on this website, we store your email
                address to notify you at launch. We use it only for launch
                announcements. You can unsubscribe at any time by emailing{" "}
                <a href="mailto:hello@babyleveling.app" className="text-hi underline-offset-4 hover:underline">
                  hello@babyleveling.app
                </a>
                .
              </p>
              <p>
                <strong className="text-hi">Analytics:</strong>{" "}
                We do not use advertising trackers or third-party analytics
                on this website or in the app. We may use privacy-first
                analytics (e.g., aggregate page views) that collect no
                personally identifiable information.
              </p>
            </LegalSection>

            <LegalSection heading="3. What we do not collect">
              <ul className="list-disc pl-5">
                <li>We do not sell your data  -  ever.</li>
                <li>We do not share your baby&apos;s data with advertisers, data brokers, or any third party.</li>
                <li>We do not track you across other apps or websites.</li>
                <li>We do not require an account to use the app.</li>
              </ul>
            </LegalSection>

            <LegalSection heading="4. Data retention and deletion">
              <p>
                Deleting BabyLeveling from your device removes all local data.
                If you used iCloud sync, delete the app data from{" "}
                <em>Settings → [Your Name] → iCloud → Manage Account Storage</em>.
                Waitlist email: email{" "}
                <a href="mailto:hello@babyleveling.app" className="text-hi underline-offset-4 hover:underline">
                  hello@babyleveling.app
                </a>{" "}
                to have your address removed from our list within 30 days.
              </p>
            </LegalSection>

            <LegalSection heading="5. Children's privacy">
              <p>
                BabyLeveling is designed for use by parents and caregivers.
                The app does not collect data from children directly  -  all data
                is entered by the adult user. We comply with COPPA and GDPR-K
                requirements applicable to apps that handle data about minors.
              </p>
            </LegalSection>

            <LegalSection heading="6. Contact">
              <p>
                Questions about this policy? Email{" "}
                <a href="mailto:hello@babyleveling.app" className="text-hi underline-offset-4 hover:underline">
                  hello@babyleveling.app
                </a>
                {" "}or use the{" "}
                <Link href={localeHref(locale, "/contact")} className="text-hi underline-offset-4 hover:underline">
                  contact form
                </Link>
                .
              </p>
            </LegalSection>
          </div>
        </div>
      </div>
    </DepthPageShell>
  );
}

function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl text-hi">{heading}</h2>
      <div className="mt-3 flex flex-col gap-3 text-base leading-relaxed">{children}</div>
    </section>
  );
}
