import db from "@/database/connection";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { GetUsersQuery } from "../validation/get-users-query.schema";
import { CreateUserInput } from "../validation/create-user.schema";
import { UpdateUserInput } from "../validation/update-user.schema";

export interface UserModuleRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at: string;
  role_id: number | null;
  role_name: string | null;
}

type CreateUserRecord = CreateUserInput & {
  passwordHash: string;
};

export async function findUsers(query: GetUsersQuery): Promise<UserModuleRow[]> {
  let sql = `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.status,
      u.created_at,
      r.id as role_id,
      r.name as role_name
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.deleted_at IS NULL
  `;
  const params: (string | number)[] = [];

  if (query.status) {
    sql += ` AND u.status = ?`;
    params.push(query.status);
  }

  if (query.search) {
    sql += ` AND (u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?)`;
    const searchParam = `%${query.search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  // Sorting
  const sortMap: Record<string, string> = {
    name: "u.first_name",
    email: "u.email",
    status: "u.status",
    created_at: "u.created_at",
  };
  const sortCol = sortMap[query.sortBy || "created_at"] || "u.created_at";
  const sortDir = query.sortOrder === "asc" ? "ASC" : "DESC";

  sql += ` ORDER BY ${sortCol} ${sortDir}`;
  sql += ` LIMIT ? OFFSET ?`;

  const offset = (query.page - 1) * query.limit;
  params.push(query.limit, offset);

  const [rows] = await db.query<UserModuleRow[]>(sql, params);
  return rows;
}

export async function countUsers(query: GetUsersQuery): Promise<number> {
  let sql = `
    SELECT COUNT(*) as total
    FROM users u
    WHERE u.deleted_at IS NULL
  `;
  const params: (string | number)[] = [];

  if (query.status) {
    sql += ` AND u.status = ?`;
    params.push(query.status);
  }

  if (query.search) {
    sql += ` AND (u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?)`;
    const searchParam = `%${query.search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  const [rows] = await db.execute<RowDataPacket[]>(sql, params);
  return rows[0].total as number;
}

export async function findUserById(id: number): Promise<UserModuleRow | null> {
  const [rows] = await db.execute<UserModuleRow[]>(
    `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.status,
      u.created_at,
      r.id as role_id,
      r.name as role_name
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.id = ? AND u.deleted_at IS NULL
    LIMIT 1
    `,
    [id]
  );
  return rows[0] ?? null;
}

export async function insertUser(
  createUserRecord: CreateUserRecord
): Promise<number> {
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    const [result] = await conn.execute<ResultSetHeader>(
      `
      INSERT INTO users (first_name, last_name, email, password_hash, status)
      VALUES (?, ?, ?, ?, ?)
      `,
      [createUserRecord.firstName, createUserRecord.lastName, createUserRecord.email, createUserRecord.passwordHash, createUserRecord.status]
    );

    const userId = result.insertId;

    if (createUserRecord.roleId) {
      await conn.execute(
        `
        INSERT INTO user_roles (user_id, role_id)
        VALUES (?, ?)
        `,
        [userId, createUserRecord.roleId]
      );
    }

    await conn.commit();
    return userId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

export async function updateUser(
  id: number,
  updateUserRecord: UpdateUserInput & { passwordHash?: string },
  currentRoleId: number | null
): Promise<boolean> {
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    let updateSql = `
      UPDATE users 
      SET first_name = ?, last_name = ?, email = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    `;
    const updateParams: (string | number | null)[] = [updateUserRecord.firstName, updateUserRecord.lastName, updateUserRecord.email ?? null, updateUserRecord.status];

    if (updateUserRecord.passwordHash) {
      updateSql += `, password_hash = ?`;
      updateParams.push(updateUserRecord.passwordHash);
    }

    updateSql += ` WHERE id = ? AND deleted_at IS NULL`;
    updateParams.push(id);

    await conn.execute<ResultSetHeader>(updateSql, updateParams);

    if (currentRoleId !== updateUserRecord.roleId) {
      // Delete existing roles for user
      await conn.execute(
        `DELETE FROM user_roles WHERE user_id = ?`,
        [id]
      );
      // Insert new role
      await conn.execute(
        `INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`,
        [id, updateUserRecord.roleId]
      );
    }

    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

export async function softDeleteUser(id: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE users 
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = ? AND deleted_at IS NULL
    `,
    [id]
  );
  return result.affectedRows > 0;
}
