import db from "@/database/connection";
import { RefreshTokenRow } from "./types";

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

export async function findRefreshTokenByHash(
  tokenHash: string,
): Promise<RefreshTokenRow | null> {
  const [rows] = await db.execute<RefreshTokenRow[]>(
    `
    SELECT
      id,
      user_id,
      token_hash,
      is_revoked,
      expires_at
    FROM refresh_tokens
    WHERE token_hash = ?
    LIMIT 1
    `,
    [tokenHash],
  );

  return rows[0] ?? null;
}

export async function revokeAllRefreshTokensForUser(
  userId: number,
): Promise<void> {
  await db.execute(
    `
    UPDATE refresh_tokens
    SET
      is_revoked = 1,
      revoked_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
      AND is_revoked = 0
    `,
    [userId],
  );
}
