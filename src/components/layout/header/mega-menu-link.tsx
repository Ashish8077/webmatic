import Link from "next/link";
import { MenuNode } from "@/modules/menus/types/menu.types";

interface MegaMenuLinkProps {
  node: MenuNode;
  isButton?: boolean;
  parentTitle?: string;
}

export function generateHref(node: MenuNode) {
  // The menu service's resolveTarget() already generates correct hrefs
  // (e.g., /services/actual-db-slug). Use them as-is.
  if (node.href && node.href !== "#") {
    return node.href;
  }

  return "#";
}

export function MegaMenuLink({ node, isButton }: MegaMenuLinkProps) {
  // If it's a Heading or has no link, NEVER render it as a button, even if it's the last item.
  if (node.href === "#") {
    return (
      <span className="block py-1 text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors duration-200 cursor-default">
        {node.title}
      </span>
    );
  }

  const href = generateHref(node);

  if (isButton) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center w-full py-2.5 px-4 text-[13px] font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100/80 hover:shadow-sm hover:-translate-y-0.5 rounded-lg transition-all duration-300"
        target={node.target || undefined}
        rel={node.rel || undefined}
      >
        {node.title}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="block py-1 text-sm font-medium text-slate-700 hover:text-orange-500 hover:translate-x-1 transition-all duration-300"
      target={node.target || undefined}
      rel={node.rel || undefined}
    >
      {node.title}
    </Link>
  );
}
