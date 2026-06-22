import { z } from "zod";

export const createPageSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers and hyphens",
    ),

  status: z.enum(["draft", "published"]).default("draft"),

  template: z.string().trim().max(100).nullable().optional(),

  seoTitle: z.string().trim().max(255).nullable().optional(),

  metaDescription: z.string().trim().max(500).nullable().optional(),

  metaKeywords: z.string().trim().max(1000).nullable().optional(),

  canonicalUrl: z.url("Invalid canonical URL").nullable().optional(),

  robotsIndex: z.boolean().default(true),

  schemaMarkup: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
