import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLoopSteps } from "@/lib/content/loop";
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
  const { rpgSystem: d } = getDictionary(locale).depth;
  const title = `${d.h1}  -  ${SITE_NAME}`;
  const description = d.intro;
  const path = "/rpg-system";
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
 * `/rpg-system`  -  the SEO-depth explainer for the S4 Care -> XP mechanic.
 * As of TASK-0011, fully locale-aware: loop step labels, depth paragraphs,
 * and closing copy all come from the locale dictionary.
 */
export default async function RpgSystemPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const { rpgSystem: d } = dict.depth;
  const loopSteps = getLoopSteps(locale);

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: dict.nav.rpg, href: localeHref(locale, "/rpg-system") },
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
          {loopSteps.map((step) => (
            <section
              key={step.id}
              id={step.id}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon */}
                <img
                  src={assetPath(step.icon)}
                  alt=""
                  width={40}
                  height={40}
                />
                <h2 className="font-display text-2xl text-hi">
                  {step.realAction}{" "}
                  <span className="text-lo">→ {step.gameReward}</span>
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-lo">
                {d.loopDepth[step.id]}
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
