import Link from "next/link";
import { MenuNode } from "@/modules/menus/types/menu.types";

interface MegaMenuLinkProps {
  node: MenuNode;
  isLast?: boolean;
  parentTitle?: string;
}

function generateHref(node: MenuNode, isLast?: boolean, parentTitle?: string) {
  // If the admin set a valid explicit URL, respect it
  if (node.href && node.href !== "#" && node.href !== "/") {
    return node.href;
  }
  
  // If it's a bottom CTA button (e.g. "Talk Brand Strategy"), use the parent's title for the slug
  if (isLast && parentTitle) {
    const slug = parentTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    return `/services/${slug}`;
  }
  
  // Otherwise use the node's own title for the slug
  const slug = node.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return `/services/${slug}`;
}

export function MegaMenuLink({ node, isLast, parentTitle }: MegaMenuLinkProps) {
  const href = generateHref(node, isLast, parentTitle);

  if (isLast) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center w-full py-2 px-4 text-[13px] font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100/80 rounded-lg transition-colors"
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
      className="block py-1.5 text-sm text-slate-600 hover:text-orange-500 transition-colors"
      target={node.target || undefined}
      rel={node.rel || undefined}
    >
      {node.title}
    </Link>
  );
}
