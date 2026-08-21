import { z } from "zod";

import { passwordSchema } from "@/shared/utils/validators/password.schema";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required.",
    }),

    newPassword: passwordSchema,

    confirmPassword: z.string().min(1, {
      message: "Please confirm your new password.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from the current password.",
    path: ["newPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
