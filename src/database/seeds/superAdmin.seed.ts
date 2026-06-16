// import db from "../connection";
// import { superAdmin } from "@/config/env";
// import { hashPassword } from "@/modules/auth/utils/password";

// export async function seedSuperAdmin() {
//   console.log("Seeding super admin...");

//   const [roles] = await db.execute(
//     `
//     SELECT id
//     FROM roles
//     WHERE slug = ?
//     LIMIT 1
//     `,
//     ["super-admin"],
//   );

//   const role = (roles as any[])[0];

//   if (!role) {
//     throw new Error("Super Admin role not found");
//   }

//   const hashedPassword = await hashPassword(superAdmin.password);

//   await db.execute(
//     `
//     INSERT INTO users
//     (
//       first_name,
//       last_name,
//       email,
//       password,
//       role_id
//     )
//     VALUES (?, ?, ?, ?, ?)
//     ON DUPLICATE KEY UPDATE
//       first_name = VALUES(first_name),
//       last_name = VALUES(last_name),
//       role_id = VALUES(role_id)
//     `,
//     [
//       superAdmin.firstName,
//       superAdmin.lastName,
//       superAdmin.email,
//       hashedPassword,
//       role.id,
//     ],
//   );

//   console.log("Super admin seeded");
// }
