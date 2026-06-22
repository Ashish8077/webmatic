import jwt from "jsonwebtoken";
import { env } from "@/config/env";
import type { JwtPayload } from "./types";
import { AppError } from "@/shared/utils/errors/app-error";

export function generateAccessToken(userId: number) {
  return jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  });
}

export function generateRefreshToken(userId: number) {
  return jwt.sign(
    {
      sub: userId,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    },
  );
}

export function verifyAccessToken(accessToken: string): JwtPayload {
  const decoded = jwt.verify(accessToken, env.JWT_ACCESS_SECRET);
  if (typeof decoded === "string" || !decoded.sub) {
    throw new AppError("Invalid access token", 401);
  }

  return {
    sub: Number(decoded.sub),
    iat: Number(decoded.iat),
    exp: Number(decoded.exp),
  };
}

export function durationToSeconds(value: string): number {
  const amount = Number(value.slice(0, -1));
  const unit = value.slice(-1);

  switch (unit) {
    case "m":
      return amount * 60;

    case "h":
      return amount * 60 * 60;

    case "d":
      return amount * 24 * 60 * 60;

    default:
      throw new Error("Invalid duration");
  }
}

export function durationToDate(value: string): Date {
  const maxAgeInSeconds = durationToSeconds(value);
  return new Date(Date.now() + maxAgeInSeconds * 1000);
}
