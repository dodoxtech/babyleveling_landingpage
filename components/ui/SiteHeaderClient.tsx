"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

export interface ResolvedNavLink {
  id: string;
  href: string;
  label: string;
}

interface SiteHeaderClientProps {
  navLinks: ResolvedNavLink[];
  legalLinks: ResolvedNavLink[];
  ctaHref: string;
  ctaLabel: string;
}

export function SiteHeaderClient({
  navLinks,
  legalLinks,
  ctaHref,
  ctaLabel,
}: SiteHeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Show CTA only after scrolling past the hero (roughly 70% of viewport height).
  useEffect(() => {
    const threshold = () => window.innerHeight * 0.7;
    const onScroll = () => setCtaVisible(window.scrollY > threshold());
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* CTA — desktop: visible at md+; mobile: visible below md. Both hidden until scrolled. */}
      {ctaVisible && (
        <a href={ctaHref} className="btn-primary btn-sm">
          {ctaLabel}
        </a>
      )}

      {/* Hamburger: mobile only */}
      <button
        type="button"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--bg-section-alt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)] md:hidden"
        style={{ color: "var(--text-primary)" }}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 top-0 block h-[2px] w-5 rounded-full bg-current transition-transform motion-reduce:transition-none ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded-full bg-current transition-opacity motion-reduce:transition-none ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] block h-[2px] w-5 rounded-full bg-current transition-transform motion-reduce:transition-none ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!menuOpen}
        className="fixed inset-x-3 top-[4.75rem] z-40 rounded-[var(--radius-xl)] border p-2 shadow-lg md:hidden"
        style={{
          background: "var(--bg-raised)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-[var(--radius-md)] px-4 py-3 text-base font-semibold transition-colors hover:bg-[var(--bg-section-alt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              className="mx-4 my-2 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            />
            {legalLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-[var(--radius-md)] px-4 py-3 text-sm font-semibold transition-colors hover:bg-[var(--bg-section-alt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-secondary)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
