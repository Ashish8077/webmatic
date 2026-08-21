import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.preprocess(
      (value) => {
        if (typeof value !== "string") {
          return value;
        }

        return value.trim().toLowerCase();
      },
      z.email({
        message: "Please enter a valid email address.",
      }),
    ),

    password: z
      .string()
      .min(1, {
        message: "Password is required.",
      })
      .max(255, {
        message: "Password is too long.",
      }),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;
