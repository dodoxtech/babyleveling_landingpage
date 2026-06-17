import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts } from "@/lib/content/blog";
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
  const d = getDictionary(locale).blog;
  const title = `${d.h1}  -  ${SITE_NAME}`;
  const path = "/blog";
  return {
    title: { absolute: title },
    description: d.tagline,
    alternates: {
      canonical: localeHref(locale, path),
      languages: localeAlternates(path),
    },
    openGraph: { url: localeHref(locale, path), title, description: d.tagline },
    twitter: { title, description: d.tagline },
  };
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const d = dict.blog;
  const posts = getAllPosts();

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: d.h1, href: localeHref(locale, "/blog") },
      ]}
    >
      <div className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-tight text-hi">
            {d.h1}
          </h1>
          <p className="mt-4 text-base text-lo">{d.tagline}</p>
        </div>

        <ul className="mx-auto mt-14 flex w-full max-w-3xl flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={localeHref(locale, `/blog/${post.slug}`)}
                className="glass group flex flex-col gap-3 rounded-2xl p-8 transition-colors hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
              >
                <p className="text-xs text-lo">
                  {d.published}{" "}
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
                <h2 className="font-display text-xl leading-snug text-hi transition-colors group-hover:text-[var(--grad-plasma-from)]">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-lo">{post.description}</p>
                <span className="text-sm font-medium text-[var(--grad-plasma-from)]">
                  {d.readMore}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </DepthPageShell>
  );
}
