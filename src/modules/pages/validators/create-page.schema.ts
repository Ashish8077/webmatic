import {
  emptyStringToNull,
  nullableUrl,
} from "@/shared/utils/validation/zod-helpers";
import { z } from "zod";

export const createPageSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
      "Slug must start with a letter and contain only lowercase letters, numbers and hyphens",
    ),

  status: z.enum(["draft", "published"]).default("draft"),

  template: emptyStringToNull(100).optional(),

  seoTitle: emptyStringToNull(255).optional(),

  metaDescription: emptyStringToNull(1000).optional(),

  metaKeywords: emptyStringToNull(1000).optional(),

  canonicalUrl: nullableUrl("Invalid canonical URL").optional(),

  schemaMarkup: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
