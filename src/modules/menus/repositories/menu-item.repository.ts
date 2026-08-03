import db from "@/database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { MenuItem, MenuItemType, MenuTargetType, ReorderMenuItemPayload } from "../types/menu.types";
import { CreateMenuItemDTO } from "../schemas/create-menu-item.schema";
import { UpdateMenuItemDTO } from "../schemas/update-menu-item.schema";

export interface MenuItemRow extends RowDataPacket {
  id: number;
  menu_id: number;
  parent_id: number | null;
  title: string;
  item_type: MenuItemType;
  target_type: MenuTargetType | null;
  reference_id: number | null;
  url: string | null;
  target: string | null;
  rel: string | null;
  icon: any; // JSON
  description: string | null;
  settings: any; // JSON
  sort_order: number;
  is_active: boolean;
  created_by: number | null;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export function mapMenuItemRow(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    menuId: row.menu_id,
    parentId: row.parent_id,
    title: row.title,
    itemType: row.item_type,
    targetType: row.target_type,
    referenceId: row.reference_id,
    url: row.url,
    target: row.target,
    rel: row.rel,
    icon: typeof row.icon === 'string' ? JSON.parse(row.icon) : row.icon,
    description: row.description,
    settings: typeof row.settings === 'string' ? JSON.parse(row.settings) : row.settings,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}

export const menuItemRepository = {
  async create(data: CreateMenuItemDTO, adminId: number): Promise<MenuItem> {
    const [sortRows] = await db.execute<RowDataPacket[]>(
      `SELECT MAX(sort_order) as maxSort FROM menu_items WHERE menu_id = ? AND parent_id ${data.parentId ? '= ?' : 'IS NULL'} AND deleted_at IS NULL`,
      data.parentId ? [data.menuId, data.parentId] : [data.menuId]
    );
    const nextSortOrder = (sortRows[0]?.maxSort ?? 0) + 1;

    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO menu_items (
        menu_id, parent_id, title, item_type, target_type, reference_id, url, target, rel, icon, description, settings, sort_order, is_active, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.menuId,
        data.parentId ?? null,
        data.title,
        data.itemType,
        data.targetType ?? null,
        data.referenceId ?? null,
        data.url ?? null,
        data.target ?? null,
        data.rel ?? null,
        data.icon ? JSON.stringify(data.icon) : null,
        data.description ?? null,
        data.settings ? JSON.stringify(data.settings) : null,
        nextSortOrder,
        data.isActive,
        adminId
      ]
    );

    return this.findById(result.insertId) as Promise<MenuItem>;
  },

  async update(id: number, data: UpdateMenuItemDTO, adminId: number): Promise<MenuItem | null> {
    const updates: string[] = [];
    const params: any[] = [];

    if (data.title !== undefined) { updates.push("title = ?"); params.push(data.title); }
    if (data.itemType !== undefined) { updates.push("item_type = ?"); params.push(data.itemType); }
    if (data.targetType !== undefined) { updates.push("target_type = ?"); params.push(data.targetType ?? null); }
    if (data.referenceId !== undefined) { updates.push("reference_id = ?"); params.push(data.referenceId ?? null); }
    if (data.url !== undefined) { updates.push("url = ?"); params.push(data.url ?? null); }
    if (data.target !== undefined) { updates.push("target = ?"); params.push(data.target ?? null); }
    if (data.rel !== undefined) { updates.push("rel = ?"); params.push(data.rel ?? null); }
    if (data.icon !== undefined) { updates.push("icon = ?"); params.push(data.icon ? JSON.stringify(data.icon) : null); }
    if (data.description !== undefined) { updates.push("description = ?"); params.push(data.description ?? null); }
    if (data.settings !== undefined) { updates.push("settings = ?"); params.push(data.settings ? JSON.stringify(data.settings) : null); }
    if (data.isActive !== undefined) { updates.push("is_active = ?"); params.push(data.isActive); }

    if (updates.length === 0) return this.findById(id);

    updates.push("updated_by = ?");
    params.push(adminId);
    params.push(id);

    await db.execute<ResultSetHeader>(
      `UPDATE menu_items SET ${updates.join(", ")} WHERE id = ? AND deleted_at IS NULL`,
      params
    );

    return this.findById(id);
  },

  async findById(id: number): Promise<MenuItem | null> {
    const [rows] = await db.execute<MenuItemRow[]>(
      `SELECT * FROM menu_items WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
      [id]
    );
    return rows.length ? mapMenuItemRow(rows[0]) : null;
  },

  async findByMenuId(menuId: number): Promise<MenuItem[]> {
    const [rows] = await db.execute<MenuItemRow[]>(
      `SELECT * FROM menu_items WHERE menu_id = ? AND deleted_at IS NULL ORDER BY sort_order ASC`,
      [menuId]
    );
    return rows.map(mapMenuItemRow);
  },

  async countChildren(id: number): Promise<number> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM menu_items WHERE parent_id = ? AND deleted_at IS NULL`,
      [id]
    );
    return rows[0].count;
  },

  async softDelete(id: number, adminId: number): Promise<boolean> {
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE menu_items SET deleted_at = CURRENT_TIMESTAMP, deleted_by = ? WHERE id = ? AND deleted_at IS NULL`,
      [adminId, id]
    );
    return result.affectedRows > 0;
  },

  async reorder(items: ReorderMenuItemPayload[], adminId: number): Promise<void> {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      
      for (const item of items) {
        await connection.execute(
          `UPDATE menu_items SET parent_id = ?, sort_order = ?, updated_by = ? WHERE id = ? AND deleted_at IS NULL`,
          [item.parentId ?? null, item.sortOrder, adminId, item.id]
        );
      }
      
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};
