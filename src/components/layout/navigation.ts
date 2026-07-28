import type { LucideIcon } from "lucide-react";
import { Briefcase, LayoutDashboard, StickyNotePlus, MessageSquareQuote } from "lucide-react";
import { Permission } from "@/features/auth/constants/permissions";

type NavItem = {
  label: string;
  href: string;
  permission: Permission;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    permission: Permission.DASHBOARD_VIEW,
    icon: LayoutDashboard,
  },
  {
    label: "Pages",
    href: "/admin/pages",
    permission: Permission.PAGE_VIEW,
    icon: StickyNotePlus,
  },
  {
    label: "Services",
    href: "/admin/services",
    permission: Permission.PAGE_VIEW,
    icon: Briefcase,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    permission: Permission.PAGE_VIEW,
    icon: MessageSquareQuote,
  },
];
