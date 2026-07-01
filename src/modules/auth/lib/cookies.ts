import { env } from "@/config/env.server";
import { NextResponse } from "next/server";
import { durationToSeconds } from "./jwt";

export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
): void {
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: durationToSeconds(env.JWT_ACCESS_EXPIRES_IN),
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: durationToSeconds(env.JWT_REFRESH_EXPIRES_IN),
  });
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.delete("accessToken");

  response.cookies.delete("refreshToken");
}
