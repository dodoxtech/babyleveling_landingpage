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
  const { pricing: d } = getDictionary(locale).depth;
  const title = `${d.h1}  -  ${SITE_NAME}`;
  const description = d.bullets[0];
  const path = "/pricing";
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

/**
 * `/pricing`  -  per the task brief, must not over-promise on a pricing model
 * that hasn't been decided. As of TASK-0011, fully locale-aware: all copy
 * from the dictionary (h1, sectionTitle, bullets, closing).
 */
export default async function PricingPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const { pricing: d } = dict.depth;

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: dict.nav.pricing, href: localeHref(locale, "/pricing") },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            {d.h1}
          </h1>
        </div>

        <div className="mx-auto mt-16 w-full max-w-2xl">
          <section className="glass rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl text-hi">{d.sectionTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-left">
              {d.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-base leading-relaxed text-lo"
                >
                  <span aria-hidden="true" className="mt-1">
                    •
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-base text-lo">
            {d.closing.map((part, i) =>
              part.href ? (
                <Link
                  key={i}
                  href={localeHref(locale, part.href)}
                  className="font-medium text-hi underline-offset-4 hover:underline"
                >
                  {part.text}
                </Link>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
        </div>
      </div>
    </DepthPageShell>
  );
}
