import db from "../connection";

import { superAdmin } from "../data/superAdmin";

import { hashPassword } from "@/modules/auth/lib/password";

type RoleRow = {
  id: number;
};

type UserRow = {
  id: number;
};

export async function seedSuperAdmin() {
  console.log("Seeding super admin...");

  /**
   * Check if super admin already exists.
   *
   * Prevents duplicate users when
   * seeding multiple times.
   */
  const [existingUsers] = await db.execute(
    `
    SELECT id
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [superAdmin.email],
  );

  const existingUser = (existingUsers as UserRow[])[0];

  if (existingUser) {
    console.log("Super admin already exists. Skipping...");

    return;
  }

  /**
   * Resolve Super Admin role.
   */
  const [roleRows] = await db.execute(
    `
    SELECT id
    FROM roles
    WHERE slug = ?
    LIMIT 1
    `,
    ["super-admin"],
  );

  const role = (roleRows as RoleRow[])[0];

  if (!role) {
    throw new Error("Super Admin role not found. Run role seeds first.");
  }

  /**
   * Hash password before saving.
   */
  const passwordHash = await hashPassword(superAdmin.password);

  /**
   * Create bootstrap admin account.
   */
  await db.execute(
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
      superAdmin.firstName,
      superAdmin.lastName,
      superAdmin.email,
      passwordHash,

      "active",

      true,
    ],
  );

  console.log("Super admin created successfully");
}
