import { z } from "zod";
import { USER_STATUS } from "../constants/user.constants";

import { passwordSchema } from "@/shared/utils/validators/password.schema";

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "First name is required" })
    .max(100, { error: "First name must not exceed 100 characters" }),

  lastName: z
    .string()
    .trim()
    .min(1, { error: "Last name is required" })
    .max(100, { error: "Last name must not exceed 100 characters" }),

  email: z
    .email({ error: "Invalid email address" })
    .max(255, { error: "Email must not exceed 255 characters" }),

  password: passwordSchema.optional().or(z.literal("")),

  roleId: z
    .number()
    .int()
    .positive({ error: "Role is required" }),

  status: z
    .enum(USER_STATUS)
    .default("active"),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;