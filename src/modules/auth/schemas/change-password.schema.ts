import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, {
        message: "Current password is required.",
      })
      .max(255, {
        message: "Current password is too long.",
      }),

    newPassword: z
      .string()
      .min(8, {
        message: "New password must be at least 8 characters.",
      })
      .max(255, {
        message: "New password is too long.",
      }),

    confirmPassword: z
      .string()
      .min(1, {
        message: "Please confirm your new password.",
      }),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from the current password.",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
