import { comparePassword } from "../utils/password";

import { findUserByEmail } from "../repositories/user.repository";

import {
  durationToDate,
  durationToSeconds,
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiryDate,
} from "../utils/jwt";

import { LoginInput } from "../validators/login.schema";
import { AppError } from "@/lib/errors/app-error";
import { createHash } from "@/shared/utils/hash";
import { env } from "@/config/env";
import { createRefreshToken } from "../repositories/refresh-token.repository";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export async function loginService(data: LoginInput): Promise<LoginResponse> {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== "active") {
    throw new Error("Account is not active");
  }

  const isValidPassword = await comparePassword(
    data.password,
    user.password_hash,
  );

  if (!isValidPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  const tokenHash = createHash(refreshToken);

  const expiresAt = durationToDate(env.JWT_REFRESH_EXPIRES_IN);

  await createRefreshToken(user.id, tokenHash, expiresAt);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role_slug,
    },
  };
}
