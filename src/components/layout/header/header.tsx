"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";


import TopHeader from "./top-header";
import { Logo } from "./logo";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import useHeader from "./use-header";

const Header = () => {
 

  const { menuOpen, setMenuOpen, scrolled, visible } = useHeader();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <TopHeader />

      {/* Main nav bar */}
      <div
        className={`transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-slate-100"
        }`}
      >
        <div className="max-w-[1170px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}

          <Logo />

          {/* Desktop nav */}
          <DesktopNavigation />

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex px-5 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg transition-colors duration-200"
          >
            Get in Touch
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <MobileNavigation
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </header>
  );
};

export default Header;
