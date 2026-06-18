import db from "../connection";

export async function seedUserRoles(): Promise<void> {
  console.log("Seeding user roles...");

  await db.execute(
    `
    INSERT INTO user_roles
    (
      user_id,
      role_id
    )
    SELECT
      u.id,
      r.id
    FROM users u
    INNER JOIN roles r
      ON r.slug = 'super-admin'
    WHERE u.email = 'admin@example.com'
    AND NOT EXISTS (
      SELECT 1
      FROM user_roles ur
      WHERE ur.user_id = u.id
        AND ur.role_id = r.id
    )
    `,
  );

  console.log("User roles seeded");
}
