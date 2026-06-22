import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/content/blog";
import { ArticleJsonLd, FaqPageJsonLd } from "@/components/seo/JsonLd";
import { DepthPageShell } from "@/components/seo/DepthPageShell";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localeAlternates, localeHref } from "@/lib/i18n/paths";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = getAllPosts().map((p) => p.slug);
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const locale = raw as Locale;
  const path = `/blog/${slug}`;
  const title = `${post.title}  -  ${SITE_NAME}`;
  return {
    title: { absolute: title },
    description: post.description,
    alternates: {
      canonical: localeHref(locale, path),
      languages: localeAlternates(path),
    },
    openGraph: {
      type: "article",
      url: localeHref(locale, path),
      title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: { title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const d = dict.blog;
  const articleUrl = `${SITE_URL}${localeHref(locale, `/blog/${slug}`)}`;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: d.h1, href: localeHref(locale, "/blog") },
        { label: post.title, href: localeHref(locale, `/blog/${slug}`) },
      ]}
    >
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        datePublished={post.date}
        author={post.author}
        url={articleUrl}
      />
      {post.faqItems && <FaqPageJsonLd items={post.faqItems} />}

      <article className="px-6 pt-6 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href={localeHref(locale, "/blog")}
            className="text-sm text-lo transition-colors hover:text-hi"
          >
            {d.backToBlog}
          </Link>

          <header className="mt-8">
            <p className="text-xs text-lo">
              {d.published}{" "}
              <time dateTime={post.date}>{formattedDate}</time>
              {" - "}
              {post.author}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] tracking-tight text-hi">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-lo">{post.description}</p>
          </header>

          <div className="mt-12 flex flex-col gap-8">
            {post.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="font-display text-2xl text-hi">
                    {section.heading}
                  </h2>
                )}
                <div className={`flex flex-col gap-4 ${section.heading ? "mt-4" : ""}`}>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-lo">
                      {p}
                    </p>
                  ))}
                </div>
                {section.table && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          {section.table.headers.map((h) => (
                            <th
                              key={h}
                              className="border border-white/10 bg-white/5 px-3 py-2 text-left font-medium text-hi"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, ri) => (
                          <tr key={ri} className="even:bg-white/[0.02]">
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className="border border-white/10 px-3 py-2 text-lo"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {post.faqItems && post.faqItems.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl text-hi">
                {"Frequently asked questions"}
              </h2>
              <dl className="mt-6 flex flex-col gap-6">
                {post.faqItems.map((item, i) => (
                  <div key={i}>
                    <dt className="font-medium text-hi">{item.question}</dt>
                    <dd className="mt-2 text-base leading-relaxed text-lo">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {post.relatedLinks.length > 0 && (
            <aside className="glass mt-12 rounded-2xl p-8">
              <h2 className="font-display text-lg text-hi">{d.relatedReading}</h2>
              <ul className="mt-4 flex flex-col gap-2">
                {post.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localeHref(locale, link.href)}
                      className="text-sm text-[var(--grad-plasma-from)] underline-offset-4 hover:underline"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </article>
    </DepthPageShell>
  );
}
