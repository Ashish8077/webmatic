"use client";

import { NavigationItem } from "./navigation-item";
import { MenuNode } from "@/modules/menus/types/menu.types";

interface DesktopNavigationProps {
  navLinks: MenuNode[];
}

export function DesktopNavigation({ navLinks }: DesktopNavigationProps) {
  return (
    <>
      <nav
        className="hidden md:flex items-center gap-1"
        aria-label="Main navigation"
      >
        {navLinks.map((node) => (
          <NavigationItem key={node.id} node={node} />
        ))}
      </nav>
    </>
  );
}
