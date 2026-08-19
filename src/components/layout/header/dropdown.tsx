"use client";

import { useState, useRef, useCallback } from "react";
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
  const isActive =
    pathname === node.href || node.children.some((c) => pathname === c.href);

  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <Link
        href={node.href}
        className={`${desktopLinkClass(isActive)} flex items-center gap-1 group/trigger`}
        target={node.target || undefined}
        rel={node.rel || undefined}
      >
        {node.title}
        <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 group-[.is-top]/header:text-white/60 group-[.is-top]/header:group-hover:text-white transition-colors" />
      </Link>

      {/* Dropdown Panel */}
      <div
        className={`absolute left-0 top-full pt-3 z-50 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-64 bg-white rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] border border-slate-100/80 overflow-hidden">
          {/* Top accent gradient bar */}
          <div className="h-0.75 bg-linear-to-r from-orange-400 via-orange-500 to-[#0A98D4]" />

          {/* Items */}
          <div className="p-2.5 flex flex-col gap-0.5">
            {node.children.map((child, index) => (
              <Link
                key={child.id}
                href={child.href}
                className={`group/item relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname === child.href
                    ? "text-orange-500 bg-orange-50/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                }`}
                style={{
                  transitionDelay: open ? `${index * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-8px)",
                  transition: "opacity 300ms ease-out, transform 300ms ease-out, color 200ms, background-color 200ms",
                }}
                target={child.target || undefined}
                rel={child.rel || undefined}
              >
                {/* Animated left-border accent on hover */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.75 rounded-full bg-linear-to-b from-orange-400 to-[#0A98D4] transition-all duration-200 ${
                    pathname === child.href
                      ? "h-5 opacity-100"
                      : "h-0 opacity-0 group-hover/item:h-5 group-hover/item:opacity-100"
                  }`}
                />

                {/* Arrow icon that slides in on hover */}
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs transition-all duration-200 ${
                    pathname === child.href
                      ? "bg-orange-100 text-orange-500"
                      : "bg-slate-100 text-slate-400 group-hover/item:bg-orange-50 group-hover/item:text-orange-500"
                  }`}
                >
                  →
                </span>

                <span>{child.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
