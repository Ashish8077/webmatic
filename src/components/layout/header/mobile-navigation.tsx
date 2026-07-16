"use client";

import Link from "next/link";
import { mobileLinkClass } from "./styles";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./nav-links";

export function MobileNavigation({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  return (
    <>
      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-100 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="max-w-[1170px] mx-auto px-5 py-3 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={mobileLinkClass(isActive)}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2.5 text-sm font-semibold text-center text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </>
  );
}
