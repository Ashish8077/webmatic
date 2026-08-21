import db from "../connection";
import { roles } from "../data/roles";

export async function seedRoles() {
  console.log("Seeding roles...");

  for (const role of roles) {
    await db.execute(
      `
      INSERT INTO roles
      (
        name,
        slug
      )
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name)
      `,
      [role.name, role.slug],
    );
  }

  // Delete obsolete roles
  if (roles.length > 0) {
    const roleSlugs = roles.map((r) => r.slug);
    const placeholders = roleSlugs.map(() => "?").join(", ");
    await db.execute(
      `DELETE FROM roles WHERE slug NOT IN (${placeholders})`,
      roleSlugs,
    );
  } else {
    await db.execute(`DELETE FROM roles`);
  }

  console.log("Roles seeded");
}
