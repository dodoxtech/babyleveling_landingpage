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

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale).about;
  const title = `${d.h1}  -  ${SITE_NAME}`;
  const path = "/about";
  return {
    title: { absolute: title },
    description: d.missionBody,
    alternates: {
      canonical: localeHref(locale, path),
      languages: localeAlternates(path),
    },
    openGraph: { url: localeHref(locale, path), title, description: d.missionBody },
    twitter: { title, description: d.missionBody },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const d = dict.about;

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: d.h1, href: localeHref(locale, "/about") },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            {d.h1}
          </h1>
        </div>

        <div className="mx-auto mt-14 flex w-full max-w-3xl flex-col gap-10">
          <section className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">{d.missionHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-lo">{d.missionBody}</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">{d.whyHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-lo">{d.whyBody}</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">{d.whatHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-lo">{d.whatBody}</p>
          </section>

          <section className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">{d.privacyHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-lo">
              {d.privacyBody}{" "}
              <Link
                href={localeHref(locale, "/legal/privacy")}
                className="font-medium text-hi underline-offset-4 hover:underline"
              >
                {dict.footer.privacy} →
              </Link>
            </p>
          </section>
        </div>
      </div>
    </DepthPageShell>
  );
}
