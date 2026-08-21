import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, {
    error: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    error: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, {
    error: "Password must contain at least one number",
  })
  .regex(/[^A-Za-z0-9]/, {
    error: "Password must contain at least one special character",
  })
  .max(255, {
    error: "Password must not exceed 255 characters",
  });
