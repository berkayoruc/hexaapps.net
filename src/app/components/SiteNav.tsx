"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export const CONTACT_EMAIL = "hexagameapps@gmail.com";
const CONTACT = `mailto:${CONTACT_EMAIL}`;

const LINKS = [
  { href: "/#apps", label: "Apps" },
  { href: "/#games", label: "Games" },
  { href: "/#team", label: "Team" },
];

/** Home page navigation with a collapsible menu on phones. */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative mx-auto max-w-[1240px] px-4 py-4 sm:px-8 sm:py-6">
      <div className="flex items-center justify-between gap-4">
        <Logo />
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-line bg-white/70 p-1 sm:flex"
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-4 py-3 text-[15px] font-medium hover:bg-paper">
              {l.label}
            </Link>
          ))}
          <a href={CONTACT} className="rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white hover:bg-accent">
            Contact
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-12 w-12 items-center justify-center rounded-[14px] border-[1.5px] border-ink bg-white shadow-pop-sm sm:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="mt-3 flex flex-col rounded-[20px] border-[1.5px] border-ink bg-white p-2 shadow-pop sm:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3.5 font-display text-xl font-semibold"
            >
              {l.label}
            </Link>
          ))}
          <a href={CONTACT} className="mt-1 rounded-[14px] bg-ink px-4 py-3.5 text-center font-semibold text-white">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
