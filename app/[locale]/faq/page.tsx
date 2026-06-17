import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Faq } from "@/components/sections/Faq";
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
  const { faq: d } = getDictionary(locale).depth;
  const title = `${d.h1} — ${SITE_NAME}`;
  const path = "/faq";
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

/**
 * `/faq` — standalone, schema-rich mirror of the home FAQ block. Reuses
 * `<Faq />` directly (same data, same JSON-LD). As of TASK-0011, locale-aware:
 * the `<h1>` and the `<Faq>` section both receive the current locale.
 */
export default async function FaqPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: dict.nav.faq, href: localeHref(locale, "/faq") },
      ]}
    >
      <div className="px-6 pt-6 text-center">
        <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
          {dict.depth.faq.h1}
        </h1>
      </div>
      <Faq locale={locale} />
    </DepthPageShell>
  );
}
