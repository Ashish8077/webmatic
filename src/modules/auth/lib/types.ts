export interface AuthUser {
  userId: number;
  email: string;
  roles: string[];
  permissions: string[];
}

// export interface ApiContextData {
//   user: AuthUser;
//   ipAddress?: string;
//   userAgent?: string;
//   requestId?: string;
// }

export interface JwtPayload {
  sub: number;
  iat: number;
  exp: number;
}
