import { VisualAssetDTO } from "@/shared/schemas/visual-asset.schema";
import { MenuLocation, MenuItemType, MenuTargetType } from "../constants/menu.constants";

export type { MenuLocation, MenuItemType, MenuTargetType };
export interface Menu {
  id: number;
  name: string;
  slug: string;
  location: MenuLocation;
  isActive: boolean;
  createdBy: number | null;
  updatedBy: number | null;
  deletedBy: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MenuItem {
  id: number;
  menuId: number;
  parentId: number | null;
  title: string;
  itemType: MenuItemType;
  targetType: MenuTargetType | null;
  referenceId: number | null;
  url: string | null;
  target: string | null;
  rel: string | null;
  icon: VisualAssetDTO | null;
  description: string | null;
  settings: Record<string, any> | null;
  sortOrder: number;
  isActive: boolean;
  createdBy: number | null;
  updatedBy: number | null;
  deletedBy: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MenuNode {
  id: number;
  title: string;
  href: string;
  target: string | null;
  rel: string | null;
  icon: VisualAssetDTO | null;
  description: string | null;
  children: MenuNode[];
  layout: "link" | "dropdown" | "mega";
}

export interface ReorderMenuItemPayload {
  id: number;
  parentId: number | null;
  sortOrder: number;
}
