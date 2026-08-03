import Link from "next/link";
import { MenuNode } from "@/modules/menus/types/menu.types";
import { desktopLinkClass } from "./styles";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

interface DropdownProps {
  node: MenuNode;
}

export function Dropdown({ node }: DropdownProps) {
  const pathname = usePathname();
  const isActive = pathname === node.href || node.children.some((c) => pathname === c.href);

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
      
      {/* Dropdown Container */}
      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="w-56 bg-white rounded-lg shadow-lg border border-slate-100 p-2 flex flex-col gap-1">
          {node.children.map((child) => (
            <Link
              key={child.id}
              href={child.href}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === child.href ? "text-orange-500 bg-orange-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              target={child.target || undefined}
              rel={child.rel || undefined}
            >
              {child.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
