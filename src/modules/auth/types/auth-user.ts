import { Permission } from "../constants/permissions";

export interface AuthUser {
  userId: number;
  email: string;
  roles: string[];
  permissions: Permission[];
}
