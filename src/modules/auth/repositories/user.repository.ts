import db from "@/database/connection";
import type { ResultSetHeader } from "mysql2";

import { UserRow, UserPasswordRow } from "./types";

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

export async function findUserPasswordHashById(
  userId: number,
): Promise<UserPasswordRow | null> {
  const [rows] = await db.execute<UserPasswordRow[]>(
    `
    SELECT
      id,
      password_hash
    FROM users
    WHERE id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [userId],
  );

  return rows[0] ?? null;
}

export async function updateUserPassword(
  userId: number,
  passwordHash: string,
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE users
    SET password_hash = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [passwordHash, userId],
  );

  return result.affectedRows > 0;
}
