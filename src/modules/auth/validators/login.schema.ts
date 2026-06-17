import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(255, "Password is too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
