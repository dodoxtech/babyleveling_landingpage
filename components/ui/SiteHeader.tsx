import Image from "next/image";
import Link from "next/link";
import { navLinks, navCtaHref } from "@/lib/content/nav";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";
import { SiteHeaderClient } from "@/components/ui/SiteHeaderClient";
import { ThemeToggle } from "@/components/ui/ThemeToggle.client";

interface SiteHeaderProps {
  locale: Locale;
}

/**
 * S0 - Nav. Bright, compact bar with the wordmark, key routes, mode toggle,
 * and a scroll-aware waitlist CTA (hidden until user passes the hero so it
 * never duplicates the hero's own CTA button).
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
  const legalLinks = [
    {
      id: "privacy",
      href: localeHref(locale, "/legal/privacy"),
      label: dict.footer.privacy,
    },
    {
      id: "terms",
      href: localeHref(locale, "/legal/terms"),
      label: dict.footer.terms,
    },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[4.5rem] border-b"
      style={{
        borderColor: "var(--border-subtle)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(255,255,255,0.88))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 12px 30px rgba(22,32,47,0.06)",
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={wordmarkHref}
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-md"
        >
          <Image
            src="/assets/logo/babyleveling-logo.png"
            alt="BabyLeveling"
            width={160}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-5">
            {resolvedLinks.slice(0, 4).map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right group: theme toggle (desktop only) + scroll-aware CTA + hamburger */}
        <div className="flex shrink-0 items-center gap-3">
          <nav aria-label="Legal" className="hidden items-center gap-3 xl:flex">
            {legalLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-xs font-semibold transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)]"
                style={{ color: "var(--text-caption)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <SiteHeaderClient
            navLinks={resolvedLinks}
            legalLinks={legalLinks}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
          />
        </div>
      </div>
    </header>
  );
}
