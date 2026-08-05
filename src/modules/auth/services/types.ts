export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    role: string;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
}

import { Permission } from "../constants/permissions";

export interface PermissionsResponse {
  permissions: Permission[];
}
