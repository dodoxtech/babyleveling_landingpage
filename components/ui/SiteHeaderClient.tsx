"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/content/nav";

const SCROLL_CONDENSE_THRESHOLD = 24;

interface SiteHeaderClientProps {
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Client island for SiteHeader. Owns two pieces of interactive state:
 *  - scroll position, to toggle the condensed/glass header background
 *  - mobile menu open/closed
 *
 * The server-rendered SiteHeader passes static link/CTA data in; this island only
 * renders the bits that truly need client state (the bar's condense class, the
 * hamburger button, and the mobile menu panel). Desktop nav + wordmark are rendered
 * by the server component shell and are not duplicated here.
 */
export function SiteHeaderClient({
  navLinks,
  ctaLabel,
  ctaHref,
}: SiteHeaderClientProps) {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => {
      setCondensed(window.scrollY > SCROLL_CONDENSE_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows back to desktop width.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Condense overlay: an inset full-bleed layer faded in on scroll, sitting under the bar's content. */}
      <span
        aria-hidden="true"
        className={`glass pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 motion-reduce:transition-none ${
          condensed ? "opacity-100" : "opacity-0"
        }`}
      />

      <button
        type="button"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-hi transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)] md:hidden"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-current transition-transform motion-reduce:transition-none ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-current transition-opacity motion-reduce:transition-none ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] block h-[1.5px] w-5 bg-current transition-transform motion-reduce:transition-none ${
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
        className="glass fixed inset-x-3 top-[4.5rem] z-40 rounded-2xl p-2 md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-base text-hi/90 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            onClick={closeMenu}
            className="mt-2 block rounded-full border border-[var(--grad-plasma-to)] px-4 py-3 text-center text-base font-medium text-hi transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grad-plasma-to)]"
          >
            {ctaLabel}
          </a>
        </nav>
      </div>
    </>
  );
}
