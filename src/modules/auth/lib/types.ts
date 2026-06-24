export interface AuthUser {
  userId: number;
  email: string;
  roles: string[];
  permissions: string[];
}

export interface JwtPayload {
  sub: number;
  iat: number;
  exp: number;
}
