import db from "@/database/connection";

import type { AuthPermissionRow, AuthUserRow, PermissionRow } from "./types";
import { AuthUser } from "../lib/types";

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

export async function findAuthUserById(
  userId: number,
): Promise<AuthUser | null> {
  const [userRows] = await db.execute<AuthUserRow[]>(
    `
    SELECT
      id,
      email
    FROM users
    WHERE id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [userId],
  );

  const user = userRows[0];

  if (!user) {
    return null;
  }

  const [permissionRows] = await db.execute<AuthPermissionRow[]>(
    `
      SELECT DISTINCT
        r.slug AS role_slug,
        p.slug AS permission_slug
      FROM user_roles ur
      INNER JOIN roles r
        ON r.id = ur.role_id
      INNER JOIN role_permissions rp
        ON rp.role_id = r.id
      INNER JOIN permissions p
        ON p.id = rp.permission_id
      WHERE ur.user_id = ?
      `,
    [userId],
  );

  const roles = [...new Set(permissionRows.map((row) => row.role_slug))];

  const permissions = [
    ...new Set(permissionRows.map((row) => row.permission_slug)),
  ];

  return {
    userId: user.id,
    email: user.email,
    roles,
    permissions,
  };
}
