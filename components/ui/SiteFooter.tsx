import Link from "next/link";
import { navLinks, wordmark } from "@/lib/content/nav";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

interface SiteFooterProps {
  locale: Locale;
}

/**
 * S12 — Footer (close). Server Component: wayfinding + legal + the real
 * `LocaleSwitcher` (TASK-0011). Sitemap columns reuse the same nav link
 * structure as the header (`lib/content/nav.ts`), with labels from the locale
 * dictionary and hrefs prefixed via `localeHref`.
 *
 * Legal/About/Blog links point at real paths from the sitemap
 * (docs/planning/02-architecture.md §4.1) that don't exist yet — TASK-0012
 * builds them. They are not labeled "coming soon" because they resolve to
 * real, stable URLs (a 404 until built, not a placeholder anchor).
 */
export function SiteFooter({ locale }: SiteFooterProps) {
  const dict = getDictionary(locale);
  const { footer, nav } = dict;
  const year = new Date().getFullYear();

  const exploreLinks = navLinks.map((link) => ({
    id: link.id,
    href: localeHref(locale, link.path),
    label: nav[link.id],
  }));

  return (
    <footer
      id="footer"
      aria-label="S12 · Footer"
      className="px-6 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <Link
              href={localeHref(locale, "/")}
              className="bg-grad-plasma w-fit rounded-md bg-clip-text text-xl font-bold tracking-tight text-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
            >
              {wordmark}
            </Link>
            <p className="text-sm text-lo">{footer.tagline}</p>
          </div>

          <FooterColumn
            heading={footer.explore}
            links={exploreLinks}
          />

          <FooterColumn
            heading={footer.company}
            links={[
              { id: "about", label: footer.about, href: localeHref(locale, "/about") },
              { id: "blog", label: footer.blog, href: localeHref(locale, "/blog") },
              { id: "contact", label: footer.contact, href: localeHref(locale, "/contact") },
            ]}
          />

          <FooterColumn
            heading={footer.legal}
            links={[
              { id: "privacy", label: footer.privacy, href: localeHref(locale, "/legal/privacy") },
              { id: "terms", label: footer.terms, href: localeHref(locale, "/legal/terms") },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-lo">
            © {year} {wordmark}. {footer.rights}
          </p>
          <LocaleSwitcher current={locale} />
        </div>
      </div>
    </footer>
  );
}

interface FooterLink {
  id: string;
  label: string;
  href: string;
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-hi">{heading}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
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
    </div>
  );
}
