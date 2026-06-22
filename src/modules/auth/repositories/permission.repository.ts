import db from "@/database/connection";

import type { PermissionRow } from "./types";

export async function findPermissionsByUserId(
  userId: number,
): Promise<string[]> {
  const [rows] = await db.execute<PermissionRow[]>(
    `
      SELECT DISTINCT p.slug
      FROM permissions p

      INNER JOIN role_permissions rp
        ON rp.permission_id = p.id

      INNER JOIN user_roles ur
        ON ur.role_id = rp.role_id

      WHERE ur.user_id = ?
      `,
    [userId],
  );

  return rows.map((permission) => permission.slug);
}

export async function hasPermission(
  userId: number,
  permission: string,
): Promise<boolean> {
  const [rows] = await db.execute(
    `
    SELECT 1
    FROM permissions p

    INNER JOIN role_permissions rp
      ON rp.permission_id = p.id

    INNER JOIN user_roles ur
      ON ur.role_id = rp.role_id

    WHERE ur.user_id = ?
      AND p.slug = ?
    LIMIT 1
    `,
    [userId, permission],
  );

  return Array.isArray(rows) && rows.length > 0;
}
