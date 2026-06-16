import pool from "@/lib/db";

export class UserRepository {
  async findByEmail(email: string) {
    const [rows] = await pool.query(
      `SELECT
         u.id,
         u.first_name,
         u.last_name,
         u.email,
         u.phone,
         u.password_hash,
         u.profile_image,
         u.status,
         u.email_verified,
         u.failed_login_attempts,
         u.locked_until,
         u.last_login_at,
         u.password_changed_at
       FROM users u
       WHERE u.email = ?
         AND u.deleted_at IS NULL
       LIMIT 1`,
      [email],
    );
    return (rows as any[])[0] ?? null;
  }

  async updateLastLogin(userId: number, ip: string) {
    await pool.query(
      `UPDATE users
       SET last_login_at = NOW(),
           last_login_ip = ?,
           failed_login_attempts = 0
       WHERE id = ?`,
      [ip, userId],
    );
  }

  async incrementFailedAttempts(userId: number) {
    await pool.query(
      `UPDATE users
       SET failed_login_attempts = failed_login_attempts + 1,
           locked_until = CASE
             WHEN failed_login_attempts + 1 >= 5
             THEN DATE_ADD(NOW(), INTERVAL 15 MINUTE)
             ELSE locked_until
           END
       WHERE id = ?`,
      [userId],
    );
  }

  async findById(id: number) {
    const [rows] = await pool.query(
      `SELECT id, first_name, last_name, email, phone, profile_image, status, email_verified
       FROM users
       WHERE id = ? AND deleted_at IS NULL
       LIMIT 1`,
      [id],
    );
    return (rows as any[])[0] ?? null;
  }

  async getUserPermissions(userId: number): Promise<string[]> {
    const [rows] = await pool.query(
      `SELECT DISTINCT p.slug
       FROM permissions p
       JOIN role_permissions rp ON rp.permission_id = p.id
       JOIN user_roles ur ON ur.role_id = rp.role_id
       WHERE ur.user_id = ?`,
      [userId],
    );
    return (rows as { slug: string }[]).map((r) => r.slug);
  }
}
