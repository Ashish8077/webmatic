import type { LucideIcon } from "lucide-react";
import { Briefcase, LayoutDashboard, StickyNotePlus, MessageSquareQuote, Images, Contact } from "lucide-react";
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
  {
    label: "Media",
    href: "/admin/media",
    permission: Permission.MEDIA_VIEW,
    icon: Images,
  },
  {
    label: "Leads",
    href: "/admin/leads",
    permission: Permission.LEAD_VIEW,
    icon: Contact,
  },
];
