export const USER_STATUS = ["active", "inactive", "suspended"] as const;
export type UserStatus = (typeof USER_STATUS)[number];
