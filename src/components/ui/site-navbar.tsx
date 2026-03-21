"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "@/assets/hero.png";

const NAV_LINKS = [
  { label: "Home", type: "route", href: "/" },
  { label: "About", type: "route", href: "/why-choose-us" },
  { label: "Gallery", type: "route", href: "/our-work" },
  { label: "Services", type: "route", href: "/services" },
  { label: "Locate Us", type: "route", href: "/locate-us" },
] as const;

interface SiteNavbarProps {
  absolute?: boolean;
}

export function SiteNavbar({ absolute = false }: SiteNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={absolute ? "absolute inset-x-0 top-0 z-30" : "relative z-30 px-4 pt-5 sm:px-6 lg:px-8"}>
      <div className={absolute ? "mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8" : "mx-auto w-full max-w-7xl"}>
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[1.6rem] border border-amber-300/35 bg-white/72 px-4 py-3 backdrop-blur-xl shadow-[0_16px_50px_rgba(182,117,47,0.12)]"
        >
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img
                src={logo}
                alt="Vikas Mehandi Art logo"
                className="h-11 w-11 rounded-full border border-amber-300/35 object-cover shadow-[0_10px_30px_rgba(182,117,47,0.16)]"
              />
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-[#b06a1f]/80">
                  Jaipur Mehndi Studio
                </p>
                <p className="truncate text-base font-semibold text-[#5a2a17] sm:text-lg">
                  Vikas Mehandi Art
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-6 lg:flex">
              {NAV_LINKS.map((link) =>
                link.type === "route" ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-[#6d4630] transition hover:text-[#b06a1f]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-[#6d4630] transition hover:text-[#b06a1f]"
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="/book-appointment"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#2a120d] transition hover:bg-amber-300"
              >
                Book Appointment
              </a>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/35 bg-white/80 text-[#6d4630] transition hover:bg-[#fff7eb] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-4 flex flex-col gap-3 border-t border-amber-300/25 pt-4">
                  {NAV_LINKS.map((link) =>
                    link.type === "route" ? (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-2xl px-3 py-2 text-sm font-medium text-[#6d4630] transition hover:bg-[#fff7eb]"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-2xl px-3 py-2 text-sm font-medium text-[#6d4630] transition hover:bg-[#fff7eb]"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                  <a
                    href="/book-appointment"
                    onClick={() => setMobileOpen(false)}
                    className="mt-1 inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-[#2a120d] transition hover:bg-amber-300"
                  >
                    Book Appointment
                  </a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
}
