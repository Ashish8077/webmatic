import { createHash } from "@/shared/utils/hash";
import { findRefreshTokenByHash } from "../repositories/refresh-token.repository";
import { AppError } from "@/lib/errors/app-error";
import { generateAccessToken } from "../../../lib/auth/jwt";

export interface RefreshTokenResponse {
  accessToken: string;
}

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
