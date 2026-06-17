import Link from "next/link";
import { navLinks, navCtaHref, wordmark } from "@/lib/content/nav";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";
import { SiteHeaderClient } from "@/components/ui/SiteHeaderClient";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

/**
 * Quiet header CTA treatment: a glass pill with a plasma-accent border and a
 * plain `text-hi` label. A solid gradient *fill* would put light text against
 * the hot-pink end of `--grad-plasma` at ~3.2:1, under WCAG AA's 4.5:1 for
 * normal text — so the gradient accent stays on the border, never behind the
 * label. `--grad-plasma-to` alone contrasts 5.58:1 against `--bg-void`.
 */
export const CTA_CLASSNAME =
  "glass rounded-full border border-[var(--grad-plasma-to)] px-4 py-2 text-sm font-medium text-hi transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]";

interface SiteHeaderProps {
  locale: Locale;
}

/**
 * S0 — Nav / Brand Frame. A whisper-thin glass bar: transparent at the top of the
 * page, condensing to a glass surface on scroll (handled by the small client
 * island below). Server-rendered by default; only the scroll/menu state is client.
 *
 * As of TASK-0011: accepts `locale`, resolves nav labels from the dictionary,
 * prefixes hrefs with `localeHref`, and mounts the real `LocaleSwitcher`.
 */
export function SiteHeader({ locale }: SiteHeaderProps) {
  const dict = getDictionary(locale);
  const ctaLabel = dict.nav.cta;
  const ctaHref = navCtaHref;
  const wordmarkHref = localeHref(locale, "/");

  const resolvedLinks = navLinks.map((link) => ({
    id: link.id,
    href: localeHref(locale, link.path),
    label: dict.nav[link.id],
  }));

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[4.5rem]">
      <div className="relative flex h-full items-center">
        {/* Client island: condense-on-scroll overlay + mobile hamburger/menu. */}
        <SiteHeaderClient
          navLinks={resolvedLinks}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href={wordmarkHref}
            className="bg-grad-plasma rounded-md bg-clip-text text-xl font-bold tracking-tight text-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
          >
            {wordmark}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            <ul className="flex items-center gap-8">
              {resolvedLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-sm text-lo transition-colors hover:text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <LocaleSwitcher current={locale} />
            <a href={ctaHref} className={CTA_CLASSNAME}>
              {ctaLabel}
            </a>
          </div>

          {/* Mobile: sticky CTA stays visible; hamburger toggle is the client island above. */}
          <a href={ctaHref} className={`${CTA_CLASSNAME} md:hidden`}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
