import db from "@/database/connection";

import { RowDataPacket } from "mysql2";
import { UserRow } from "./types";

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const [rows] = await db.execute<UserRow[]>(
    `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.password_hash,
      u.status,
      r.id AS role_id,
      r.slug AS role_slug
    FROM users u
    LEFT JOIN user_roles ur
      ON ur.user_id = u.id
    LEFT JOIN roles r
      ON r.id = ur.role_id
    WHERE u.email = ?
      AND u.deleted_at IS NULL
    LIMIT 1
    `,
    [email],
  );

  return rows[0] ?? null;
}
export async function findUserById(userId: number): Promise<UserRow | null> {
  const [rows] = await db.execute<UserRow[]>(
    `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.status,
      u.deleted_at
    FROM users u
    WHERE u.id = ?
    LIMIT 1
    `,
    [userId],
  );

  return rows[0] ?? null;
}
