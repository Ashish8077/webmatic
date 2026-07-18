"use client";

import Link from "next/link";
import { desktopLinkClass } from "./styles";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./nav-links";

export function DesktopNavigation() {
  const pathname = usePathname();
  return (
    <>
      <nav
        className="hidden md:flex items-center gap-1"
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              className={desktopLinkClass(isActive)}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
