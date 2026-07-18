import { Handshake, HeadphonesIcon, Users } from "lucide-react";

export const reasons = [
  {
    icon: Handshake,
  },
  {
    icon: Users,
  },
  {
    icon: HeadphonesIcon,
  },
];

export const ICON_MAP = {
  "customers-first": {
    icon: Handshake,
    bg: "bg-violet-50",
    text: "text-violet-500",
    hoverBg: "group-hover:bg-violet-500",
    border: "hover:border-violet-200",
    shadow: "hover:shadow-violet-100",
  },
  "exceptional-team": {
    icon: Users,
    bg: "bg-sky-50",
    text: "text-sky-500",
    hoverBg: "group-hover:bg-sky-500",
    border: "hover:border-sky-200",
    shadow: "hover:shadow-sky-100",
  },
  "reliable-support": {
    icon: HeadphonesIcon,
    bg: "bg-orange-50",
    text: "text-orange-500",
    hoverBg: "group-hover:bg-orange-500",
    border: "hover:border-orange-200",
    shadow: "hover:shadow-orange-100",
  },
};
