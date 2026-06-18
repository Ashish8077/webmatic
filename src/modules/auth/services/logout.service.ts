import { createHash } from "@/shared/utils/hash";
import { revokeRefreshToken } from "../repositories/refresh-token.repository";

export async function logoutService(refreshToken: string) {
  const tokenHash = createHash(refreshToken);
  await revokeRefreshToken(tokenHash);
}
