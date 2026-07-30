import db from "./connection";

import { seedPermissions } from "./seeds/permissions.seed";
import { seedRolePermissions } from "./seeds/role-permission.seed";
import { seedRoles } from "./seeds/roles.seed";
import { seedSuperAdmin } from "./seeds/super-admin.seed";
import { seedSystemPageSections } from "./seeds/system-page-sections.seed";
import { seedSystemPages } from "./seeds/system-pages.seed";
import { seedTestUsers } from "./seeds/test-users.seed";
import { seedUserRoles } from "./seeds/user-roles.seed";
import { seedServices } from "./seeds/services.seed";

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

    /**
     * Create test users.
     *
     * Requires:
     * - users table populated
     * - roles table populated
     */
    await seedTestUsers();

    /**
     * Seed system pages.
     *
     * Requires:
     * - pages table populated
     */
    await seedSystemPages();

    /**
     * Seed system page sections.
     *
     * Requires:
     * - system-pages table populated
     */
    await seedSystemPageSections();

    /**
     * Seed services.
     */
    await seedServices();

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
