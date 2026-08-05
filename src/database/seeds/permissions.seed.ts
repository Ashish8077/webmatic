import db from "../connection";
import { permissions } from "../data/permissions";

export async function seedPermissions() {
  console.log("Seeding permissions...");

  const validSlugs = permissions.map(p => p.slug);

  // 1. Get existing permissions
  const [existingRows] = await db.execute(`SELECT id, slug FROM permissions`);
  const existingPermissions = existingRows as { id: number; slug: string }[];

  const obsoletePermissions = existingPermissions.filter(p => !validSlugs.includes(p.slug));
  const obsoleteIds = obsoletePermissions.map(p => p.id);

  if (obsoleteIds.length > 0) {
    const idsString = obsoleteIds.join(",");
    // Delete from role_permissions first to avoid foreign key errors
    await db.execute(`DELETE FROM role_permissions WHERE permission_id IN (${idsString})`);
    // Delete obsolete permissions
    await db.execute(`DELETE FROM permissions WHERE id IN (${idsString})`);
  }

  // 2. Insert or update valid permissions
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

  console.log(`Permissions seeded. Removed ${obsoleteIds.length} obsolete permissions.`);
}
