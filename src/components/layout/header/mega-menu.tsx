import Link from "next/link";
import { MenuNode } from "@/modules/menus/types/menu.types";
import { desktopLinkClass } from "./styles";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { MegaMenuColumn } from "./mega-menu-column";

interface MegaMenuProps {
  node: MenuNode;
}

export function MegaMenu({ node }: MegaMenuProps) {
  const pathname = usePathname();
  
  // Active if we are on this route or any of its nested children routes
  const checkIsActive = (n: MenuNode): boolean => {
    if (n.href === pathname) return true;
    return n.children.some(checkIsActive);
  };
  
  const isActive = checkIsActive(node);

  return (
    <div className="relative group">
      <Link
        href={node.href}
        className={`${desktopLinkClass(isActive)} flex items-center gap-1`}
        target={node.target || undefined}
        rel={node.rel || undefined}
      >
        {node.title}
        <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
      </Link>

      {/* Mega Menu Container - Positioned to the left or full width depending on your layout preferences */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white rounded-b-xl rounded-t-sm shadow-xl border border-slate-100 border-t-4 border-t-orange-500 p-8 min-w-[320px] md:min-w-[700px] lg:min-w-[900px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-slate-100">
            {node.children.map((columnNode) => (
              <div key={columnNode.id} className="md:px-8 first:md:pl-0 last:md:pr-0">
                <MegaMenuColumn node={columnNode} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
