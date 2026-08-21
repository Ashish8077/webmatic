import { icons } from "lucide-react";

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

export function getIconComponent(name: string) {
  if (name in icons) {
    return icons[name as IconName];
  }
  return null;
}
