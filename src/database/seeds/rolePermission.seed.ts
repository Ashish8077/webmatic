import db from "../connection";
import { rolePermissions } from "../data/rolePermissions";

type DatabaseRow = {
  id: number;
  slug: string;
};

export async function seedRolePermissions() {
  console.log("Seeding role permissions...");

  /**
   * Load all roles once.
   *
   * Example:
   *
   * [
   *   { id: 1, slug: "super-admin" },
   *   { id: 2, slug: "editor" },
   *   { id: 3, slug: "marketing-manager" }
   * ]
   *
   * We avoid querying the database repeatedly inside loops.
   */
  const [roleRows] = await db.execute(
    `
    SELECT
      id,
      slug
    FROM roles
    `,
  );

  /**
   * Load all permissions once.
   *
   * Example:
   *
   * [
   *   { id: 1, slug: "page.view" },
   *   { id: 2, slug: "page.create" },
   *   { id: 3, slug: "page.update" }
   * ]
   */
  const [permissionRows] = await db.execute(
    `
    SELECT
      id,
      slug
    FROM permissions
    `,
  );

  const roles = roleRows as DatabaseRow[];
  const permissions = permissionRows as DatabaseRow[];

  /**
   * Create an in-memory lookup map.
   *
   * Instead of:
   *
   * SELECT id FROM roles WHERE slug = ?
   *
   * for every role,
   * we perform one query and use O(1) lookups.
   *
   * Example:
   *
   * roleMap.get("editor") => 2
   */
  const roleMap = new Map<string, number>(
    roles.map((role) => [role.slug, role.id]),
  );

  /**
   * Create permission lookup map.
   *
   * Example:
   *
   * permissionMap.get("page.view") => 1
   */
  const permissionMap = new Map<string, number>(
    permissions.map((permission) => [permission.slug, permission.id]),
  );

  /**
   * Iterate through role-permission configuration.
   *
   * Example:
   *
   * {
   *   "super-admin": ["*"],
   *   "editor": [
   *     "page.view",
   *     "page.create"
   *   ]
   * }
   */
  for (const [roleSlug, permissionSlugs] of Object.entries(rolePermissions)) {
    /**
     * Resolve role slug to database ID.
     */
    const roleId = roleMap.get(roleSlug);

    if (!roleId) {
      throw new Error(`Role not found: ${roleSlug}`);
    }

    /**
     * Special case:
     *
     * Super Admin gets every permission.
     *
     * rolePermissions.ts:
     *
     * "super-admin": ["*"]
     */
    if (permissionSlugs.includes("*")) {
      for (const permission of permissions) {
        await db.execute(
          `
          INSERT IGNORE INTO role_permissions
          (
            role_id,
            permission_id
          )
          VALUES (?, ?)
          `,
          [roleId, permission.id],
        );
      }

      continue;
    }

    /**
     * Process normal role permissions.
     */
    for (const permissionSlug of permissionSlugs) {
      /**
       * Resolve permission slug to ID.
       */
      const permissionId = permissionMap.get(permissionSlug);

      if (!permissionId) {
        throw new Error(`Permission not found: ${permissionSlug}`);
      }

      /**
       * Create role-permission mapping.
       *
       * Example:
       *
       * role_id = 2 (Editor)
       * permission_id = 1 (page.view)
       */
      await db.execute(
        `
        INSERT IGNORE INTO role_permissions
        (
          role_id,
          permission_id
        )
        VALUES (?, ?)
        `,
        [roleId, permissionId],
      );
    }
  }

  console.log("Role permissions seeded");
}
