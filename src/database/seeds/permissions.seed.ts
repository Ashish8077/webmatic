import db from "../connection";
import { permissions } from "../data/permissions";

export async function seedPermissions() {
  console.log("Seeding permissions...");

  for (const permission of permissions) {
    await db.execute(
      `
      INSERT INTO permissions
      (
        name,
        slug,
        module
      )
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      module = VALUES(module)
      `,
      [permission.name, permission.slug, permission.module],
    );
  }

  console.log("Permissions seeded");
}
