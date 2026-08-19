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
        <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 group-[.is-top]/header:text-white/60 group-[.is-top]/header:group-hover:text-white transition-colors" />
      </Link>

      {/* Mega Menu Container */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 min-w-80 md:min-w-175 lg:min-w-225">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-slate-100">
            {node.children.map((columnNode) => (
              <div key={columnNode.id} className="md:px-6 first:md:pl-0 last:md:pr-0">
                <MegaMenuColumn node={columnNode} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
