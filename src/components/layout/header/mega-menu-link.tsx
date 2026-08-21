import Link from "next/link";
import { MenuNode } from "@/modules/menus/types/menu.types";

interface MegaMenuLinkProps {
  node: MenuNode;
  isButton?: boolean;
  parentTitle?: string;
}

export function generateHref(node: MenuNode, isButton?: boolean, parentTitle?: string) {
  // If the admin set a valid explicit URL, respect it
  if (node.href && node.href !== "/" && node.href !== "") {
    return node.href;
  }
  
  // If it's a bottom CTA button (e.g. "Talk Brand Strategy"), use the parent's title for the slug
  if (isButton && parentTitle) {
    const slug = parentTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    return `/services/${slug}`;
  }
  
  // Otherwise use the node's own title for the slug
  const slug = node.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return `/services/${slug}`;
}

export function MegaMenuLink({ node, isButton, parentTitle }: MegaMenuLinkProps) {
  // If it's a Heading or has no link, NEVER render it as a button, even if it's the last item.
  if (node.href === "#") {
    return (
      <span className="block py-1 text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors duration-200 cursor-default">
        {node.title}
      </span>
    );
  }

  const href = generateHref(node, isButton, parentTitle);

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
