export const MENU_LOCATIONS = {
  HEADER: "header",
  FOOTER: "footer",
} as const;

export type MenuLocation = typeof MENU_LOCATIONS[keyof typeof MENU_LOCATIONS];

export const MENU_ITEM_TYPES = [
  "link",
  "group",
  "separator",
  "heading",
] as const;

export type MenuItemType = typeof MENU_ITEM_TYPES[number];

export const MENU_TARGET_TYPES = [
  "page",
  "service",
  "blog_category",
  "external",
  "custom",
] as const;

export type MenuTargetType = typeof MENU_TARGET_TYPES[number];
