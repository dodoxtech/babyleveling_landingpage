import { localeOptions, navLinks, wordmark } from "@/lib/content/nav";

/**
 * S12 — Footer (close). Server Component: wayfinding + legal + a non-functional
 * locale stub mirroring `SiteHeader`'s. Sitemap columns reuse the same
 * Features/RPG System/For Parents/Pricing/FAQ link set as the header nav
 * (`lib/content/nav.ts`) so the two never drift out of sync.
 *
 * Legal/About/Blog links point at real paths from the sitemap
 * (docs/planning/02-architecture.md §4.1) that don't exist yet — TASK-0012
 * builds them. They're included now because the footer's job is wayfinding to
 * the *eventual* full site, same as a real product footer ships links to
 * pages still in progress. They are not labeled "coming soon" because they
 * resolve to real, stable URLs (a 404 until built, not a placeholder anchor);
 * only the locale switcher below is explicitly marked non-functional, since
 * that one silently does nothing rather than 404.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      aria-label="S12 · Footer"
      className="px-6 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <a
              href="#top"
              className="bg-grad-plasma w-fit rounded-md bg-clip-text text-xl font-bold tracking-tight text-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
            >
              {wordmark}
            </a>
            <p className="text-sm text-lo">Every day is a new quest.</p>
          </div>

          <FooterColumn
            heading="Explore"
            links={navLinks.map((link) => ({
              id: link.id,
              label: link.label,
              href: link.href,
            }))}
          />

          <FooterColumn
            heading="Company"
            links={[
              { id: "about", label: "About", href: "/about" },
              { id: "blog", label: "Blog", href: "/blog" },
              { id: "contact", label: "Contact", href: "/contact" },
            ]}
          />

          <FooterColumn
            heading="Legal"
            links={[
              { id: "privacy", label: "Privacy", href: "/legal/privacy" },
              { id: "terms", label: "Terms", href: "/legal/terms" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-lo">
            © {year} {wordmark}. All rights reserved.
          </p>
          <LocaleSwitcherStub />
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
            <a
              href={link.href}
              className="text-sm text-lo transition-colors hover:text-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Non-functional locale-switcher stub (EN / 日本語 / Tiếng Việt) — mirrors
 * `SiteHeader`'s `LocaleSwitcherStub` exactly (same markup/behavior), since
 * real i18n routing (TASK-0011) will replace both at once.
 */
function LocaleSwitcherStub() {
  return (
    <div
      className="flex items-center gap-1 text-xs text-lo"
      aria-label="Language (coming soon)"
    >
      {localeOptions.map((locale, index) => (
        <span key={locale.id} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true">·</span>}
          <span
            className={index === 0 ? "text-hi" : undefined}
            aria-current={index === 0 ? "true" : undefined}
          >
            {locale.label}
          </span>
        </span>
      ))}
    </div>
  );
}
