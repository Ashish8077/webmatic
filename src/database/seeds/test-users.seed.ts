import { ResultSetHeader } from "mysql2";

import db from "../connection";
import { testUsers } from "../data/test-users";

import { hashPassword } from "@/modules/auth/lib/password";
import { AuthUserRow } from "@/modules/auth/repositories/types";

export async function seedTestUsers(): Promise<void> {
  console.log("Seeding test users...");

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    for (const user of testUsers) {
      const [existingUsers] = await connection.execute<AuthUserRow[]>(
        `
          SELECT id
          FROM users
          WHERE email = ?
          LIMIT 1
          `,
        [user.email],
      );

      const existingUser = existingUsers[0];

      if (existingUser) {
        console.log(`User ${user.email} already exists. Skipping...`);

        continue;
      }

      const [roleRows] = await connection.execute<AuthUserRow[]>(
        `
          SELECT id
          FROM roles
          WHERE slug = ?
          LIMIT 1
          `,
        [user.role],
      );

      const role = roleRows[0];

      if (!role) {
        throw new Error(`Role '${user.role}' not found. Run role seeds first.`);
      }

      const passwordHash = await hashPassword(user.password);

      const [result] = await connection.execute<ResultSetHeader>(
        `
          INSERT INTO users
          (
            first_name,
            last_name,
            email,
            password_hash,
            status,
            email_verified,
            email_verified_at,
            password_changed_at
          )
          VALUES
          (
            ?, ?, ?, ?, ?, ?, NOW(), NOW()
          )
          `,
        [
          user.firstName,
          user.lastName,
          user.email,
          passwordHash,
          "active",
          true,
        ],
      );

      await connection.execute(
        `
        INSERT INTO user_roles
        (
          user_id,
          role_id
        )
        VALUES
        (
          ?, ?
        )
        `,
        [result.insertId, role.id],
      );

      console.log(`Created test user: ${user.email}`);
    }

    await connection.commit();

    console.log("Test users seeded successfully");
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}
