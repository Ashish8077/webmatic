import db from "@/database/connection";

export async function findUserByEmail(email: string) {
  const [rows] = await db.execute(
    `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.password_hash,
      u.status,
      r.id AS role_id,
      r.slug AS role_slug
    FROM users u
    INNER JOIN roles r
      ON r.id = u.role_id
    WHERE u.email = ?
      AND u.deleted_at IS NULL
    LIMIT 1
    `,
    [email],
  );

  return (rows as any[])[0] ?? null;
}
