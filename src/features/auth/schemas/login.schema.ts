import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({
      message: "Enter a valid email address",
    })
    .trim()
    .transform((email) => email.toLowerCase()),

  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
