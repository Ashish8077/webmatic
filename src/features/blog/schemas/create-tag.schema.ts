import { z } from "zod";

export const createTagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name cannot exceed 255 characters" }),
  slug: z
    .string()
    .trim()
    .min(1, { message: "Slug is required" })
    .max(255, { message: "Slug cannot exceed 255 characters" })
    .regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must start with a letter and contain only lowercase letters, numbers and hyphens",
    }),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
