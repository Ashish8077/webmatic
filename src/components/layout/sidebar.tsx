"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "./navigation";
import { usePermissions } from "@/features/auth/api/use-has-permission";
import type { Permission } from "@/features/auth/constants/permissions";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { has } = usePermissions();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] glass z-40 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg shadow-accent/25">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground tracking-tight">
                CMS Admin
              </h1>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                Panel
              </p>
            </div>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
            title="View Public Site"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        {navGroups.map((group) => {
          // Filter items by permission
          const visibleItems = group.items.filter((item) => {
            if (item.permission) return has(item.permission);
            return true; // if no permission required
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1">
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.title}
              </p>
              {visibleItems.map((item) => (
                <SidebarItem key={item.label} item={item} pathname={pathname} has={has} />
              ))}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <p className="text-[10px] text-muted-foreground/50 text-center">
          v0.1.0
        </p>
      </div>
    </aside>
  );
}

function SidebarItem({
  item,
  pathname,
  has,
}: {
  item: { label: string; href: string; icon: React.ElementType; children?: { label: string; href: string; permission?: Permission }[]; permission?: Permission };
  pathname: string;
  has: (permission: Permission) => boolean;
}) {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  
  const isChildActive = hasChildren
    ? item.children?.some((child) => pathname === child.href)
    : false;

  const isActive = pathname === item.href || pathname.startsWith(item.href + "/") || isChildActive;

  const [isExpanded, setIsExpanded] = useState(isActive || false);

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-full flex items-center justify-between px-3 py-2.5 rounded-xl
            text-sm font-medium transition-all duration-200
            group relative
            ${
              isActive
                ? "bg-accent/12 text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
            }
          `}
        >
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
          )}
          <div className="flex items-center gap-3">
            <Icon
              className={`transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`}
            />
            {item.label}
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div
          className={`grid transition-all duration-200 ease-in-out ${
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pl-9 space-y-1 mt-1">
              {item.children?.map((child) => {
                const isChildCurrent = pathname === child.href;
                if (child.permission && !has(child.permission)) return null;

                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`
                      block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isChildCurrent
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                      }
                    `}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <Link
        href={item.href}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl
          text-sm font-medium transition-all duration-200
          group relative
          ${
            isActive
              ? "bg-accent/12 text-accent"
              : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
          }
        `}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
        )}
        <Icon
          className={`transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`}
        />
        {item.label}
      </Link>
    </div>
  );
}
