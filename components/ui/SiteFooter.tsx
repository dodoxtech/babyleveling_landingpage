import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/content/nav";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";

interface SiteFooterProps {
  locale: Locale;
}

/**
 * S12 - Footer. Minimal single-row layout:
 * Logo left | nav links centre | copyright right.
 */
export function SiteFooter({ locale }: SiteFooterProps) {
  const dict = getDictionary(locale);
  const { footer, nav } = dict;
  const year = new Date().getFullYear();

  const footerLinks = [
    ...navLinks.map((link) => ({
      id: link.id,
      href: localeHref(locale, link.path),
      label: nav[link.id],
    })),
    { id: "privacy", href: localeHref(locale, "/legal/privacy"), label: footer.privacy },
    { id: "terms",   href: localeHref(locale, "/legal/terms"),   label: footer.terms },
  ];

  return (
    <footer
      id="footer"
      aria-label="S12 - Footer"
      className="border-t px-6 py-6"
      style={{ background: "var(--bg-raised)", borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Logo */}
        <Link
          href={localeHref(locale, "/")}
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-md"
        >
          <Image
            src="/assets/logo/babyleveling-logo.png"
            alt="BabyLeveling"
            width={130}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Nav links */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:underline"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="shrink-0 text-xs" style={{ color: "var(--text-caption)" }}>
          © {year} BabyLeveling
        </p>
      </div>
    </footer>
  );
}
