import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getFeatures } from "@/lib/content/features";
import { assetPath } from "@/lib/content/assets";
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
  const { features: d } = getDictionary(locale).depth;
  const title = `${d.h1}  -  ${SITE_NAME}`;
  const description = d.intro;
  const path = "/features";
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
 * `/features`  -  the SEO-depth counterpart to the home S5 Feature Showcase.
 * As of TASK-0011, the page is fully locale-aware: params carries the locale
 * segment, copy comes from the dictionary, and `generateStaticParams` emits
 * all three routes at build time.
 */
export default async function FeaturesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const { features: d } = dict.depth;
  const features = getFeatures(locale);

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: dict.nav.features, href: localeHref(locale, "/features") },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            {d.h1}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-lo sm:text-lg">
            {d.intro}
          </p>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col gap-12">
          {features.map((feature) => (
            <section
              key={feature.id}
              id={feature.id}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon */}
                <img
                  src={assetPath(feature.icon)}
                  alt=""
                  width={40}
                  height={40}
                />
                <h2 className="font-display text-2xl text-hi">
                  {feature.title}
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-lo">
                {feature.blurb} {d.featureDepth[feature.id]}
              </p>
            </section>
          ))}
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
