import db from "@/database/connection";
import type { ResultSetHeader } from "mysql2";

import { UserRow, UserPasswordRow, UserProfileRow } from "./types";

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

export async function findUserProfileById(
  userId: number,
): Promise<UserProfileRow | null> {
  const [rows] = await db.execute<UserProfileRow[]>(
    `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.profile_image_id,
      u.status,
      u.created_at,
      r.slug AS role_slug,
      m.storage_path AS profile_image_storage_path,
      m.disk AS profile_image_disk,
      m.mime_type AS profile_image_type,
      m.original_name AS profile_image_name
    FROM users u
    LEFT JOIN user_roles ur ON ur.user_id = u.id
    LEFT JOIN roles r ON r.id = ur.role_id
    LEFT JOIN media m ON m.id = u.profile_image_id
    WHERE u.id = ?
      AND u.deleted_at IS NULL
    LIMIT 1
    `,
    [userId],
  );

  return rows[0] ?? null;
}

export async function updateUserProfile(
  userId: number,
  firstName: string,
  lastName: string | undefined,
  profileImageId: number | null,
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE users
    SET first_name = ?,
        last_name = ?,
        profile_image_id = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [firstName, lastName ?? "", profileImageId, userId],
  );

  return result.affectedRows > 0;
}
