export interface AuthUser {
  userId: number;
}

export interface JwtPayload {
  sub: number;
  iat: number;
  exp: number;
}
