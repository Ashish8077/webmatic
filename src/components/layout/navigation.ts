import type { LucideIcon } from "lucide-react";
import { 
  Briefcase, 
  LayoutDashboard, 
  StickyNotePlus, 
  MessageSquareQuote, 
  Images, 
  Contact, 
  Menu,
  Settings,
} from "lucide-react";
import { Permission } from "@/features/auth/constants/permissions";

export type NavItem = {
  label: string;
  href: string;
  permission?: Permission; // Optional: if missing, check children
  icon: LucideIcon;
  children?: { label: string; href: string; permission: Permission }[];
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        permission: Permission.DASHBOARD_VIEW,
        icon: LayoutDashboard,
      },
    ]
  },
  {
    title: "Content",
    items: [
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
    ]
  },
  {
    title: "Marketing",
    items: [
      {
        label: "Leads",
        href: "/admin/leads",
        permission: Permission.LEAD_VIEW,
        icon: Contact,
      }
    ]
  },
  {
    title: "Appearance",
    items: [
      {
        label: "Menus",
        href: "/admin/menus",
        permission: Permission.MENUS_VIEW,
        icon: Menu,
      },
      {
        label: "Site Settings",
        href: "/admin/site-settings/footer", // default to footer for now
        permission: Permission.MENUS_VIEW, // Reuse menus permission temporarily or remove
        icon: Settings,
      }
    ]
  }
];
