import Link from "next/link";
import { MenuNode } from "@/modules/menus/types/menu.types";

interface MegaMenuLinkProps {
  node: MenuNode;
  isLast?: boolean;
}

export function MegaMenuLink({ node, isLast }: MegaMenuLinkProps) {
  if (isLast) {
    return (
      <Link
        href={node.href}
        className="block w-full py-2.5 px-4 text-[13px] font-bold text-center text-white bg-hero-primary hover:bg-hero-primary-hover shadow-[0_6px_18px_rgba(10,152,212,0.2)] rounded transition-colors"
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
      className="block py-1.5 text-sm text-slate-500 hover:text-orange-500 transition-colors"
      target={node.target || undefined}
      rel={node.rel || undefined}
    >
      {node.title}
    </Link>
  );
}
