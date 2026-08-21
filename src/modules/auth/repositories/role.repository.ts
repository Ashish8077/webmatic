import db from "@/database/connection";
import type { RowDataPacket } from "mysql2";

export interface RoleRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
}

export async function findAllRoles(): Promise<RoleRow[]> {
  const [rows] = await db.execute<RoleRow[]>(
    `
    SELECT id, name, slug
    FROM roles
    ORDER BY id ASC
    `
  );
  return rows;
}
