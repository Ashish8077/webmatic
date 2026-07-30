import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  theme?: "light" | "dark";
}

export function Breadcrumbs({ items, theme = "light" }: BreadcrumbsProps) {
  const isDark = theme === "dark";

  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm font-medium mb-6 animate-fade-in" aria-label="Breadcrumb">
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;
        const textColor = isDark 
          ? (isLast ? "text-orange-400" : "text-white/70 hover:text-white") 
          : (isLast ? "text-orange-600" : "text-slate-500 hover:text-primary");
        
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight size={14} className={isDark ? "text-white/40" : "text-slate-400"} />
            )}
            {crumb.href && !isLast ? (
              <Link href={crumb.href} className={`flex items-center transition-colors ${textColor}`}>
                {index === 0 && crumb.label.toLowerCase() === "home" && <Home size={14} className="mr-1.5" />}
                {crumb.label}
              </Link>
            ) : (
              <span className={`flex items-center ${textColor}`}>
                {index === 0 && crumb.label.toLowerCase() === "home" && <Home size={14} className="mr-1.5" />}
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
