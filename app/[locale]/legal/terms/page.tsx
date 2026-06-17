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
  const title = `${d.termsH1}  -  ${SITE_NAME}`;
  const path = "/legal/terms";
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
            {d.termsH1}
          </h1>

          <div className="prose-sm mt-10 flex flex-col gap-8 text-lo">
            <LegalSection heading="1. Acceptance">
              <p>
                By using BabyLeveling (the &quot;App&quot;) or this website, you agree
                to these Terms of Service. If you don&apos;t agree, do not use the App
                or website.
              </p>
            </LegalSection>

            <LegalSection heading="2. License">
              <p>
                {SITE_NAME} grants you a limited, non-exclusive, non-transferable,
                revocable license to use the App for personal, non-commercial
                purposes on Apple devices you own or control. You may not copy,
                modify, distribute, sell, or reverse-engineer the App.
              </p>
            </LegalSection>

            <LegalSection heading="3. Account and data">
              <p>
                The App does not require an account. All baby-tracking data is
                stored locally on your device. You are responsible for maintaining
                backups of your data. We are not liable for data loss resulting
                from device failure, operating system updates, or App deletion.
              </p>
            </LegalSection>

            <LegalSection heading="4. Acceptable use">
              <p>You agree not to:</p>
              <ul className="list-disc pl-5">
                <li>Use the App for any unlawful purpose.</li>
                <li>Attempt to reverse-engineer, decompile, or disassemble the App.</li>
                <li>Use the App to harm, abuse, or harass others.</li>
                <li>Circumvent any security or access controls.</li>
              </ul>
            </LegalSection>

            <LegalSection heading="5. Medical disclaimer">
              <p>
                BabyLeveling is a logging and tracking tool for personal use.
                It is <strong className="text-hi">not</strong> a medical device
                and does not provide medical advice, diagnosis, or treatment.
                Always consult a qualified healthcare provider for questions
                about your baby&apos;s health.
              </p>
            </LegalSection>

            <LegalSection heading="6. Intellectual property">
              <p>
                All content, trademarks, logos, and software in the App and
                on this website are the property of {SITE_NAME} or its licensors.
                You may not use them without written permission.
              </p>
            </LegalSection>

            <LegalSection heading="7. Disclaimer of warranties">
              <p>
                The App and website are provided &quot;as is&quot; without warranties
                of any kind, express or implied. We do not warrant that the App
                will be error-free, uninterrupted, or fit for any particular purpose.
              </p>
            </LegalSection>

            <LegalSection heading="8. Limitation of liability">
              <p>
                To the maximum extent permitted by law, {SITE_NAME} is not liable
                for any indirect, incidental, special, consequential, or punitive
                damages arising from your use of the App or website, even if
                advised of the possibility of such damages.
              </p>
            </LegalSection>

            <LegalSection heading="9. Changes to these terms">
              <p>
                We may update these Terms from time to time. We will post the
                updated Terms on this page with a revised &quot;last updated&quot; date.
                Continued use of the App after changes constitutes acceptance
                of the new Terms.
              </p>
            </LegalSection>

            <LegalSection heading="10. Contact">
              <p>
                Questions about these Terms?{" "}
                <Link href={localeHref(locale, "/contact")} className="text-hi underline-offset-4 hover:underline">
                  Contact us
                </Link>
                {" "}or email{" "}
                <a href="mailto:hello@babyleveling.app" className="text-hi underline-offset-4 hover:underline">
                  hello@babyleveling.app
                </a>
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
