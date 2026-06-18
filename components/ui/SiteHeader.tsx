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
 * and waitlist CTA. Client island owns only the mobile menu.
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
    <header
      className="fixed inset-x-0 top-0 z-50 h-[4.5rem] border-b"
      style={{
        borderColor: "var(--border-subtle)",
        background: "rgba(255,250,240,0.92)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="relative flex h-full items-center">
        <SiteHeaderClient navLinks={resolvedLinks} />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href={wordmarkHref} className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-md">
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

          {/* Desktop right group */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href={ctaHref}
              className="btn-primary btn-sm"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile: CTA always visible; hamburger in client island */}
          <a href={ctaHref} className="btn-primary btn-sm md:hidden">
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
