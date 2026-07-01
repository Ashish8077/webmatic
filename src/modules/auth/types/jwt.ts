import { SignOptions } from "jsonwebtoken";
// export interface ApiContextData {
//   user: AuthUser;
//   ipAddress?: string;
//   userAgent?: string;
//   requestId?: string;
// }

export type JwtExpiresIn = SignOptions["expiresIn"];

export interface JwtPayload {
  sub: number;
  iat: number;
  exp: number;
}
