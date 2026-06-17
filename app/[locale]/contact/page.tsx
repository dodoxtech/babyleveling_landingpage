import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DepthPageShell } from "@/components/seo/DepthPageShell";
import { ContactForm } from "@/components/sections/ContactForm";
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
  const d = getDictionary(locale).contact;
  const title = `${d.h1} — ${SITE_NAME}`;
  const path = "/contact";
  return {
    title: { absolute: title },
    description: d.intro,
    alternates: {
      canonical: localeHref(locale, path),
      languages: localeAlternates(path),
    },
    openGraph: { url: localeHref(locale, path), title, description: d.intro },
    twitter: { title, description: d.intro },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const d = dict.contact;

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: d.h1, href: localeHref(locale, "/contact") },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            {d.h1}
          </h1>
          <p className="mt-4 text-base text-lo">{d.intro}</p>
        </div>

        <div className="mx-auto mt-12 w-full max-w-xl">
          <ContactForm d={d} />

          <p className="mt-8 text-center text-sm text-lo">
            {d.emailDirect}{" "}
            <a
              href={`mailto:${d.directEmail}`}
              className="font-medium text-hi underline-offset-4 hover:underline"
            >
              {d.directEmail}
            </a>
          </p>
        </div>
      </div>
    </DepthPageShell>
  );
}
