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
  ctaLabel: string;
  ctaHref: string;
}

export function SiteHeaderClient({
  navLinks,
  ctaLabel,
  ctaHref,
}: SiteHeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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
        style={{ background: "var(--bg-raised)", borderColor: "var(--border-subtle)" }}
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
          </ul>
          <a href={ctaHref} onClick={closeMenu} className="btn-primary mt-2 w-full">
            {ctaLabel}
          </a>
        </nav>
      </div>
    </>
  );
}
