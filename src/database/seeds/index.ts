import db from "../connection";

import { seedPermissions } from "./permissions.seed";
import { seedRolePermissions } from "./rolePermission.seed";
import { seedRoles } from "./roles.seed";

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
