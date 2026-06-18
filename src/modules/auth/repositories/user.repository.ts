import db from "@/database/connection";

import { RowDataPacket } from "mysql2";

export interface UserRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  password_hash: string;
  status: string;
  role_id: number | null;
  role_slug: string | null;
}

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
export async function findUserById(userId: number) {
  const [rows] = await db.execute(
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

  return (rows as any[])[0] ?? null;
}
