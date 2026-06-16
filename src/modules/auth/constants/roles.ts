export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  EDITOR: "EDITOR",
  MARKETING_MANAGER: "MARKETING_MANAGER",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
