"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import TopHeader from "./top-header";
import { Logo } from "./logo";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import useHeader from "./use-header";

import { MenuNode } from "@/modules/menus/types/menu.types";
import { HeaderSettings } from "@/modules/site-settings/types/header.types";

import { usePathname } from "next/navigation";

interface HeaderProps {
  navLinks: MenuNode[];
  settings: HeaderSettings;
}

const Header = ({ navLinks = [], settings }: HeaderProps) => {
  const { menuOpen, setMenuOpen, scrolled, visible } = useHeader();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isSolid = !isHome || scrolled;

  return (
    <header
      className={`group/header fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        isSolid
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-transparent is-top"
      }`}
    >
      {settings?.visibility?.topBar && (
        <TopHeader scrolled={isSolid} settings={settings} />
      )}

      {/* Main nav bar */}
      <div className="transition-all duration-500">
        <div className="max-w-292.5 mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Logo logoSettings={settings?.logo} />

          {/* Desktop nav */}
          <DesktopNavigation navLinks={navLinks} />

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            {settings?.cta?.destinationType !== "none" && (
              <Link
                href={settings?.cta?.url || "/contact"}
                className={`hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                  isSolid
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-white/15 text-white backdrop-blur-md border border-white/25 hover:bg-white/25 hover:border-white/40"
                }`}
              >
                {settings?.cta?.label || "Get in Touch"}
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isSolid
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-white hover:bg-white/15"
              }`}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <MobileNavigation
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navLinks={navLinks}
      />
    </header>
  );
};

export default Header;
