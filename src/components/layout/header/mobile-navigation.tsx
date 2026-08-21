"use client";

import Link from "next/link";
import { mobileLinkClass } from "./styles";
import { usePathname } from "next/navigation";
import { MenuNode } from "@/modules/menus/types/menu.types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { generateHref } from "./mega-menu-link";

function MobileNavItem({ node, setMenuOpen, depth = 0, isButton = false, parentTitle }: { node: MenuNode; setMenuOpen: (open: boolean) => void; depth?: number; isButton?: boolean; parentTitle?: string }) {
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
    if (isButton) {
      return (
        <Link
          href={generateHref(node, true, parentTitle)}
          className="mx-3 mt-3 mb-1 inline-flex items-center justify-center py-2.5 px-4 text-[13px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
          onClick={() => setMenuOpen(false)}
          target={node.target || undefined}
          rel={node.rel || undefined}
        >
          {node.title}
        </Link>
      );
    }

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
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-250 opacity-100 mt-1 pb-2" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-1 border-l-2 border-slate-100 ml-4 pl-1">
          {(() => {
            let ctaIndex = -1;
            for (let i = node.children.length - 1; i >= 0; i--) {
              if (node.children[i].href !== "#") {
                ctaIndex = i;
                break;
              }
            }

            return node.children.map((child, index) => (
              <MobileNavItem 
                key={child.id} 
                node={child} 
                setMenuOpen={setMenuOpen} 
                depth={depth + 0.5}
                isButton={index === ctaIndex}
                parentTitle={node.title}
              />
            ));
          })()}
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
          className="max-w-292.5 mx-auto px-2 sm:px-5 py-3 flex flex-col gap-1"
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
