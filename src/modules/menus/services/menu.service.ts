import { revalidatePath, revalidateTag } from "next/cache";
import { menuRepository } from "../repositories/menu.repository";
import { menuItemRepository } from "../repositories/menu-item.repository";
import { Menu, MenuItem, MenuLocation, MenuNode, ReorderMenuItemPayload } from "../types/menu.types";
import { CreateMenuDTO } from "../schemas/create-menu.schema";
import { UpdateMenuDTO } from "../schemas/update-menu.schema";
import { CreateMenuItemDTO } from "../schemas/create-menu-item.schema";
import { UpdateMenuItemDTO } from "../schemas/update-menu-item.schema";
import { findPageById } from "@/modules/pages/repositories/page.repository";
import { findServiceById } from "@/modules/services/repositories/service.repository";

interface ResolvedTarget {
  href: string;
  exists: boolean;
}

export const menuService = {
  // --- MENU CRUD ---
  
  async createMenu(data: CreateMenuDTO, adminId: number): Promise<Menu> {
    return menuRepository.create(data, adminId);
  },

  async updateMenu(id: number, data: UpdateMenuDTO, adminId: number): Promise<Menu | null> {
    const menu = await menuRepository.update(id, data, adminId);
    if (menu) this.invalidateCache(menu.location);
    return menu;
  },

  async deleteMenu(id: number, adminId: number): Promise<boolean> {
    const menu = await menuRepository.findById(id);
    if (!menu) return false;
    
    // Check if it has items
    const items = await menuItemRepository.findByMenuId(id);
    if (items.length > 0) {
      throw new Error("Cannot delete menu with existing items.");
    }

    const deleted = await menuRepository.softDelete(id, adminId);
    if (deleted) this.invalidateCache(menu.location);
    return deleted;
  },

  async getAdminMenu(id: number): Promise<{ menu: Menu; items: MenuItem[] }> {
    const menu = await menuRepository.findById(id);
    if (!menu) throw new Error("Menu not found");
    
    const items = await menuItemRepository.findByMenuId(id);
    return { menu, items };
  },

  async getMenus(): Promise<Menu[]> {
    return menuRepository.findAll();
  },

  async getMenuById(id: number): Promise<Menu | null> {
    return menuRepository.findById(id);
  },

  // --- MENU ITEM CRUD ---

  async createMenuItem(data: CreateMenuItemDTO, adminId: number): Promise<MenuItem> {
    this.validateTarget(data);
    const item = await menuItemRepository.create(data, adminId);
    const menu = await menuRepository.findById(data.menuId);
    if (menu) this.invalidateCache(menu.location);
    return item;
  },

  async updateMenuItem(id: number, data: UpdateMenuItemDTO, adminId: number): Promise<MenuItem | null> {
    const existing = await menuItemRepository.findById(id);
    if (!existing) return null;

    const item = await menuItemRepository.update(id, data, adminId);
    const menu = await menuRepository.findById(existing.menuId);
    if (menu) this.invalidateCache(menu.location);
    return item;
  },

  async deleteMenuItem(id: number, adminId: number): Promise<boolean> {
    const existing = await menuItemRepository.findById(id);
    if (!existing) return false;

    const childrenCount = await menuItemRepository.countChildren(id);
    if (childrenCount > 0) {
      throw new Error("Cannot delete menu item that has children.");
    }

    const deleted = await menuItemRepository.softDelete(id, adminId);
    const menu = await menuRepository.findById(existing.menuId);
    if (menu) this.invalidateCache(menu.location);
    return deleted;
  },

  async reorderMenuItems(menuId: number, items: ReorderMenuItemPayload[], adminId: number): Promise<void> {
    // Validate circular references
    const idMap = new Map<number, number | null>();
    items.forEach(i => idMap.set(i.id, i.parentId));

    for (const item of items) {
      let currentParent = item.parentId;
      const visited = new Set<number>([item.id]);
      
      while (currentParent) {
        if (visited.has(currentParent)) {
          throw new Error("Circular reference detected.");
        }
        visited.add(currentParent);
        currentParent = idMap.get(currentParent) || null;
      }
    }

    await menuItemRepository.reorder(items, adminId);
    
    const menu = await menuRepository.findById(menuId);
    if (menu) this.invalidateCache(menu.location);
  },

  // --- PUBLIC API ---

  async getPublicMenu(location: MenuLocation): Promise<MenuNode[]> {
    const menu = await menuRepository.findByLocation(location);
    if (!menu || !menu.isActive) return [];

    const items = await menuItemRepository.findByMenuId(menu.id);
    const activeItems = items.filter(item => item.isActive);

    return this.buildMenuTree(activeItems, null);
  },

  // --- INTERNAL UTILS ---

  invalidateCache(location: MenuLocation) {
    revalidatePath("/", "layout");
    
    // Also revalidate by tag for more granular layout components
    // @ts-expect-error next/cache types mismatch
    revalidateTag(`menu-${location}`);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateTarget(_data: Partial<CreateMenuItemDTO>) {
    // Basic structural validation handled by Zod
  },

  async resolveTarget(item: MenuItem): Promise<ResolvedTarget> {
    if (item.itemType === 'group' || item.itemType === 'separator' || item.itemType === 'heading') {
      return { href: "#", exists: true };
    }

    if (item.targetType === "external" || item.targetType === "custom") {
      return { href: item.url || "#", exists: !!item.url };
    }

    if (item.targetType === "page" && item.referenceId) {
      const page = await findPageById(item.referenceId);
      if (!page || page.status !== 'published') return { href: "", exists: false };
      return { href: `/${page.slug === 'home' ? '' : page.slug}`, exists: true };
    }

    if (item.targetType === "service" && item.referenceId) {
      const service = await findServiceById(item.referenceId);
      if (!service || service.status !== 'published') return { href: "", exists: false };
      return { href: `/services/${service.slug}`, exists: true };
    }

    if (item.targetType === "blog_category" && item.referenceId) {
      // Stub for future blog module
      return { href: `/blog/category/${item.referenceId}`, exists: true };
    }

    return { href: "#", exists: false };
  },

  async buildMenuTree(items: MenuItem[], parentId: number | null): Promise<MenuNode[]> {
    const children = items.filter(i => i.parentId === parentId);
    const nodes: MenuNode[] = [];

    for (const child of children) {
      const target = await this.resolveTarget(child);
      if (!target.exists && child.itemType === 'link') {
        continue; // Skip broken links
      }

      const nodeChildren = await this.buildMenuTree(items, child.id);
      
      const rawChildren = items.filter(i => i.parentId === child.id);
      let layout: "link" | "dropdown" | "mega" = "link";

      if (rawChildren.length > 0) {
        const hasGroup = rawChildren.some(c => c.itemType === "group");
        layout = hasGroup ? "mega" : "dropdown";
      }
      
      nodes.push({
        id: child.id,
        title: child.title,
        href: target.href,
        target: child.target,
        rel: child.rel,
        icon: child.icon,
        description: child.description,
        children: nodeChildren,
        layout,
      });
    }

    return nodes;
  }
};
