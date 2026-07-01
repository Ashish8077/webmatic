import { z } from "zod";

export const createPageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(255, "Title cannot exceed 255 characters")
    .refine((value) => /[A-Za-z]/.test(value), {
      message: "Title must contain at least one letter.",
    }),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(255, "Slug cannot exceed 255 characters")
    .regex(
      /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
      "Slug must start with a letter and contain only lowercase letters, numbers and hyphens",
    ),

  status: z.enum(["draft", "published"]),

  template: z.string().trim().max(100, "Template cannot exceed 100 characters"),

  seoTitle: z
    .string()
    .trim()
    .max(255, "SEO title cannot exceed 255 characters"),

  metaDescription: z
    .string()
    .trim()
    .max(1000, "Meta description cannot exceed 1000 characters"),

  metaKeywords: z
    .string()
    .trim()
    .max(1000, "Meta keywords cannot exceed 1000 characters"),
  canonicalUrl: z
    .string()
    .trim()
    .url("Invalid canonical URL")
    .or(z.literal(""))
    .optional(),
});

export type CreatePageFormValues = z.infer<typeof createPageSchema>;
