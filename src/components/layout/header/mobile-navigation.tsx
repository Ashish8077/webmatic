"use client";

import Link from "next/link";
import { mobileLinkClass } from "./styles";
import { usePathname } from "next/navigation";
import { MenuNode } from "@/modules/menus/types/menu.types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function MobileNavItem({ node, setMenuOpen, depth = 0 }: { node: MenuNode; setMenuOpen: (open: boolean) => void; depth?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const hasChildren = node.children && node.children.length > 0;
  
  // Calculate if any child is active
  const checkIsActive = (n: MenuNode): boolean => {
    if (n.href === pathname) return true;
    return n.children.some(checkIsActive);
  };
  const isActive = checkIsActive(node);

  if (!hasChildren) {
    return (
      <Link
        href={node.href}
        className={mobileLinkClass(isActive)}
        style={{ paddingLeft: `${1.25 + depth * 1}rem` }}
        onClick={() => setMenuOpen(false)}
        target={node.target || undefined}
        rel={node.rel || undefined}
      >
        {node.title}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        <Link
          href={node.href}
          className={`${mobileLinkClass(isActive)} flex-1`}
          style={{ paddingLeft: `${1.25 + depth * 1}rem` }}
          onClick={() => setMenuOpen(false)}
          target={node.target || undefined}
          rel={node.rel || undefined}
        >
          {node.title}
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 text-slate-500 hover:text-slate-800"
          aria-label="Toggle submenu"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      
      {/* Accordion content */}
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[1000px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-1 border-l-2 border-slate-100 ml-4 pl-1">
          {node.children.map(child => (
            <MobileNavItem key={child.id} node={child} setMenuOpen={setMenuOpen} depth={depth + 0.5} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileNavigation({
  menuOpen,
  setMenuOpen,
  navLinks,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navLinks: MenuNode[];
}) {
  return (
    <>
      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-y-auto transition-all duration-300 ease-in-out bg-white border-b border-slate-100 ${
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="max-w-[1170px] mx-auto px-2 sm:px-5 py-3 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map((node) => (
             <MobileNavItem key={node.id} node={node} setMenuOpen={setMenuOpen} depth={0} />
          ))}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 mx-4 px-4 py-2.5 text-sm font-semibold text-center text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </>
  );
}
