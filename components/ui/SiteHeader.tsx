import Link from "next/link";
import { localeOptions, navCta, navLinks, wordmark } from "@/lib/content/nav";
import { SiteHeaderClient } from "@/components/ui/SiteHeaderClient";

/**
 * Quiet header CTA treatment: a glass pill with a plasma-accent border and a
 * plain `text-hi` label. A solid gradient *fill* would put light text against
 * the hot-pink end of `--grad-plasma` at ~3.2:1, under WCAG AA's 4.5:1 for
 * normal text — so the gradient accent stays on the border, never behind the
 * label. `--grad-plasma-to` alone contrasts 5.58:1 against `--bg-void`.
 */
export const CTA_CLASSNAME =
  "glass rounded-full border border-[var(--grad-plasma-to)] px-4 py-2 text-sm font-medium text-hi transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]";

/**
 * S0 — Nav / Brand Frame. A whisper-thin glass bar: transparent at the top of the
 * page, condensing to a glass surface on scroll (handled by the small client
 * island below). Server-rendered by default; only the scroll/menu state is client.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[4.5rem]">
      <div className="relative flex h-full items-center">
        {/* Client island: condense-on-scroll overlay + mobile hamburger/menu. */}
        <SiteHeaderClient
          navLinks={navLinks}
          ctaLabel={navCta.label}
          ctaHref={navCta.href}
        />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="bg-grad-plasma rounded-md bg-clip-text text-xl font-bold tracking-tight text-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--grad-plasma-to)]"
          >
            {wordmark}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
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
            <LocaleSwitcherStub />
            <a href={navCta.href} className={CTA_CLASSNAME}>
              {navCta.label}
            </a>
          </div>

          {/* Mobile: sticky CTA stays visible; hamburger toggle is the client island above. */}
          <a href={navCta.href} className={`${CTA_CLASSNAME} md:hidden`}>
            {navCta.label}
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Non-functional locale-switcher stub (EN / 日本語 / Tiếng Việt). Real routing lands
 * in TASK-0011; for now this only announces the current locale and lists the
 * options as plain, disabled-looking text so it never implies broken behavior.
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
