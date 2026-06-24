import { env } from "@/config/env";

export const superAdmin = {
  firstName: env.SUPER_ADMIN_FIRST_NAME,
  lastName: env.SUPER_ADMIN_LAST_NAME,
  email: env.SUPER_ADMIN_EMAIL,
  password: env.SUPER_ADMIN_PASSWORD,
};
