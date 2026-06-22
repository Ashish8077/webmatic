// Shared app infrastructure
import { createHash } from "@/shared/utils/crypto/hash";

// Auth module
import { revokeRefreshToken } from "@/modules/auth/repositories/refresh-token.repository";

export async function logoutService(refreshToken: string) {
  const tokenHash = createHash(refreshToken);
  await revokeRefreshToken(tokenHash);
}
