import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAppModes } from "@/lib/content/modes";
import { getFaqItems } from "@/lib/content/faq";
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
  const { parents: d } = getDictionary(locale).depth;
  const title = `${d.h1} — ${SITE_NAME}`;
  const description = d.twoModesBody;
  const path = "/parents";
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
 * `/parents` — the trust/rigor depth page for the skeptic/optimizer persona.
 * As of TASK-0011, fully locale-aware: headings and body copy from the
 * dictionary; Parent Mode bullets from `getAppModes(locale)`; privacy answer
 * from `getFaqItems(locale)`.
 */
export default async function ParentsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const { parents: d } = dict.depth;
  const parentMode = getAppModes(locale).find((mode) => mode.id === "parent");
  const privacyAnswer = getFaqItems(locale).find(
    (item) => item.id === "data-privacy",
  )?.answer;

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: dict.nav.parents, href: localeHref(locale, "/parents") },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            {d.h1}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-lo sm:text-lg">
            {parentMode?.promise}
          </p>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col gap-12">
          <section id="what-it-tracks" className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">
              {d.whatItTracksHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {parentMode?.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-base leading-relaxed text-lo"
                >
                  <span aria-hidden="true" className="mt-1 text-lo">
                    •
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </section>

          <section id="privacy" className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">
              {d.dataIsYoursHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-lo">
              {privacyAnswer}
            </p>
          </section>

          <section id="two-modes" className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl text-hi">
              {d.twoModesHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-lo">
              {d.twoModesBody}
            </p>
          </section>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col items-center gap-3 text-center">
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
