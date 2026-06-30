import {
  emptyStringToNull,
  nullableUrl,
} from "@/shared/utils/validators/zod-helpers";
import z from "zod";

export const updatePageSchema = z
  .object({
    title: z.string().trim().min(1).max(255),

    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .max(255)
      .regex(
        /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
        "Slug must start with a letter and contain only lowercase letters, numbers and hyphens",
      ),

    status: z.enum(["draft", "published"]),

    template: emptyStringToNull(100).optional(),

    seoTitle: emptyStringToNull(255).optional(),

    metaDescription: emptyStringToNull(1000).optional(),

    metaKeywords: emptyStringToNull(1000).optional(),

    canonicalUrl: nullableUrl("Invalid canonical URL").optional(),

    robotsIndex: z.boolean().optional(),

    robotsFollow: z.boolean().optional(),

    schemaMarkup: z.record(z.string(), z.unknown()).nullable().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type UpdatePageInput = z.infer<typeof updatePageSchema>;
