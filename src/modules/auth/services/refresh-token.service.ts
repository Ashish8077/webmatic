/// Shared app infrastructure
import { createHash } from "@/shared/utils/crypto/hash";
import { AppError } from "@/shared/utils/errors/app-error";

// Auth module
import { findRefreshTokenByHash } from "@/modules/auth/repositories/refresh-token.repository";
import { generateAccessToken } from "@/modules/auth/lib/jwt";
import { RefreshTokenResponse } from "@/modules/auth/services/types";

export async function refreshTokenService(
  refreshToken: string,
): Promise<RefreshTokenResponse> {
  const tokenHash = createHash(refreshToken);

  const storedToken = await findRefreshTokenByHash(tokenHash);

  if (!storedToken)
    throw new AppError("Refresh token is invalid or expired", 401);

  if (storedToken.is_revoked)
    throw new AppError("Refresh token is revoked", 401);

  if (storedToken.expires_at < new Date())
    throw new AppError("Refresh token is expired", 401);

  const accessToken = generateAccessToken(storedToken.user_id);

  // TODO:
  // Implement refresh token rotation.
  // Revoke current refresh token.
  // Generate new refresh token.
  // Store new refresh token hash.
  // Set new refresh token cookie.

  return { accessToken };
}
