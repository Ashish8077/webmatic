import { z } from "zod";

export const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required." })
      .max(100, { message: "First name must not exceed 100 characters." }),
    lastName: z
      .string()
      .max(100, { message: "Last name must not exceed 100 characters." })
      .optional(),
    profileImageId: z
      .number()
      .nullable()
      .optional(),
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
