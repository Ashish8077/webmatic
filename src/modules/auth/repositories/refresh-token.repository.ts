import db from "@/database/connection";

export async function createRefreshToken(
  userId: number,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> {
  await db.execute(
    `
    INSERT INTO refresh_tokens
    (
      user_id,
      token_hash,
      expires_at
    )
    VALUES (?, ?, ?)
    `,
    [userId, tokenHash, expiresAt],
  );
}

export async function revokeRefreshToken(tokenHash: string): Promise<void> {
  await db.execute(
    `
    UPDATE refresh_tokens
    SET
      is_revoked = 1,
      revoked_at = CURRENT_TIMESTAMP
    WHERE token_hash = ?
      AND is_revoked = 0
    `,
    [tokenHash],
  );
}
