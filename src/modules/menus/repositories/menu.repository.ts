import db from "@/database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Menu, MenuLocation } from "../types/menu.types";
import { CreateMenuDTO } from "../schemas/create-menu.schema";
import { UpdateMenuDTO } from "../schemas/update-menu.schema";

export interface MenuRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  location: MenuLocation;
  is_active: boolean;
  created_by: number | null;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

function mapMenuRow(row: MenuRow): Menu {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    location: row.location,
    isActive: Boolean(row.is_active),
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}

export const menuRepository = {
  async create(data: CreateMenuDTO, adminId: number): Promise<Menu> {
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO menus (name, slug, location, is_active, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [data.name, data.slug, data.location, data.isActive, adminId]
    );

    return this.findById(result.insertId) as Promise<Menu>;
  },

  async update(id: number, data: UpdateMenuDTO, adminId: number): Promise<Menu | null> {
    const updates: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];

    if (data.name !== undefined) {
      updates.push("name = ?");
      params.push(data.name);
    }
    if (data.slug !== undefined) {
      updates.push("slug = ?");
      params.push(data.slug);
    }
    if (data.location !== undefined) {
      updates.push("location = ?");
      params.push(data.location);
    }
    if (data.isActive !== undefined) {
      updates.push("is_active = ?");
      params.push(data.isActive);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push("updated_by = ?");
    params.push(adminId);
    params.push(id);

    await db.execute<ResultSetHeader>(
      `UPDATE menus SET ${updates.join(", ")} WHERE id = ? AND deleted_at IS NULL`,
      params
    );

    return this.findById(id);
  },

  async findById(id: number): Promise<Menu | null> {
    const [rows] = await db.execute<MenuRow[]>(
      `SELECT * FROM menus WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
      [id]
    );
    return rows.length ? mapMenuRow(rows[0]) : null;
  },

  async findByLocation(location: MenuLocation): Promise<Menu | null> {
    const [rows] = await db.execute<MenuRow[]>(
      `SELECT * FROM menus WHERE location = ? AND deleted_at IS NULL LIMIT 1`,
      [location]
    );
    return rows.length ? mapMenuRow(rows[0]) : null;
  },
  
  async findBySlug(slug: string): Promise<Menu | null> {
    const [rows] = await db.execute<MenuRow[]>(
      `SELECT * FROM menus WHERE slug = ? AND deleted_at IS NULL LIMIT 1`,
      [slug]
    );
    return rows.length ? mapMenuRow(rows[0]) : null;
  },

  async findAll(): Promise<Menu[]> {
    const [rows] = await db.execute<MenuRow[]>(
      `SELECT * FROM menus WHERE deleted_at IS NULL ORDER BY created_at DESC`
    );
    return rows.map(mapMenuRow);
  },

  async softDelete(id: number, adminId: number): Promise<boolean> {
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE menus SET deleted_at = CURRENT_TIMESTAMP, deleted_by = ? WHERE id = ? AND deleted_at IS NULL`,
      [adminId, id]
    );
    return result.affectedRows > 0;
  }
};
