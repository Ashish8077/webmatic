import {
  BarChart2,
  Gamepad2,
  Globe,
  Megaphone,
  PenLine,
  Smartphone,
} from "lucide-react";

export const ICON_MAP = {
  "brand-marketing": {
    icon: Megaphone,
    bg: "bg-violet-50",
    text: "text-violet-500",
    hoverBg: "group-hover:bg-violet-500",
    border: "hover:border-violet-200",
    shadow: "hover:shadow-violet-100",
  },
  "web-development": {
    icon: Globe,
    bg: "bg-sky-50",
    text: "text-sky-500",
    hoverBg: "group-hover:bg-sky-500",
    border: "hover:border-sky-200",
    shadow: "hover:shadow-sky-100",
  },
  "digital-marketing": {
    icon: BarChart2,
    bg: "bg-orange-50",
    text: "text-orange-500",
    hoverBg: "group-hover:bg-orange-500",
    border: "hover:border-orange-200",
    shadow: "hover:shadow-orange-100",
  },
  "app-development": {
    icon: Smartphone,
    bg: "bg-emerald-50",
    text: "text-emerald-500",
    hoverBg: "group-hover:bg-emerald-500",
    border: "hover:border-emerald-200",
    shadow: "hover:shadow-emerald-100",
  },
  "content-writing": {
    icon: PenLine,
    bg: "bg-pink-50",
    text: "text-pink-500",
    hoverBg: "group-hover:bg-pink-500",
    border: "hover:border-pink-200",
    shadow: "hover:shadow-pink-100",
  },
  "game-development": {
    icon: Gamepad2,
    bg: "bg-amber-50",
    text: "text-amber-500",
    hoverBg: "group-hover:bg-amber-500",
    border: "hover:border-amber-200",
    shadow: "hover:shadow-amber-100",
  },
};

export const FALLBACK = {
  icon: BarChart2,
  bg: "bg-orange-50",
  text: "text-orange-500",
  hoverBg: "group-hover:bg-orange-500",
  border: "hover:border-orange-200",
  shadow: "hover:shadow-orange-100",
};

export const FILTERS = ["All", "Web Development", "E-Commerce"];
