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

  console.log("Roles seeded");
}
