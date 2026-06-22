import db from "./connection";

import { seedPermissions } from "./seeds/permissions.seed";
import { seedRolePermissions } from "./seeds/rolePermission.seed";
import { seedRoles } from "./seeds/roles.seed";
import { seedSuperAdmin } from "./seeds/superAdmin.seed";
import { seedUserRoles } from "./seeds/userRoles.seed";

async function seedDatabase() {
  try {
    console.log("Starting database seeding...\n");

    /**
     * Seed master roles.
     */

    await seedRoles();

    /**
     * Seed master permissions.
     */

    await seedPermissions();

    /**
     * Create role-permission mappings.
     *
     * Requires:
     * - roles table populated
     * - permissions table populated
     */
    await seedRolePermissions();

    /**
     * Create Super admin.
     *
     * Requires:
     * - roles table populated
     */
    await seedSuperAdmin();

    /**
     * Create user-role mappings.
     *
     * Requires:
     * - users table populated
     * - roles table populated
     */
    await seedUserRoles();

    console.log("\nDatabase seeding completed successfully");
  } catch (error) {
    console.error("\nDatabase seeding failed");
    console.error(error);

    process.exit(1);
  } finally {
    await db.end();
  }
}

seedDatabase();
