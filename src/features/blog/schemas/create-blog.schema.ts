
import { z } from "zod";
import type { Media } from "@/features/media/types/media.types";

const nullableImageId = z.coerce
  .number()
  .int()
  .positive("Invalid image id")
  .nullable()
  .optional();

export const createBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title cannot exceed 255 characters" }),

  slug: z
    .string()
    .trim()
    .min(1, { message: "Slug is required" })
    .max(255, { message: "Slug cannot exceed 255 characters" })
    .regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must start with a letter and contain only lowercase letters, numbers and hyphens",
    }),

  excerpt: z.string().trim().max(1000, { message: "Excerpt cannot exceed 1000 characters" }).optional(),
  content: z.string().optional(),
  
  featuredImageId: nullableImageId,
  featuredImage: z.custom<Media>().nullable().optional(),

  status: z.enum(["draft", "published", "scheduled"]).default("draft"),
  
  isFeatured: z.boolean().default(false),
  
  categoryIds: z.array(z.coerce.number().int().positive()).default([]),
  tagIds: z.array(z.coerce.number().int().positive()).default([]),

  seoTitle: z
    .string()
    .trim()
    .max(255, { message: "SEO title cannot exceed 255 characters" })
    .optional(),

  metaDescription: z
    .string()
    .trim()
    .max(1000, { message: "Meta description cannot exceed 1000 characters" })
    .optional(),

  metaKeywords: z
    .string()
    .trim()
    .max(1000, { message: "Meta keywords cannot exceed 1000 characters" })
    .optional(),

  canonicalUrl: z
    .string()
    .url({ message: "Invalid canonical URL" })
    .or(z.literal(""))
    .optional(),

  ogTitle: z
    .string()
    .trim()
    .max(255, { message: "Open Graph title cannot exceed 255 characters" })
    .optional(),

  ogDescription: z
    .string()
    .trim()
    .max(1000, {
      message: "Open Graph description cannot exceed 1000 characters",
    })
    .optional(),

  ogImageId: nullableImageId,
  ogImage: z.custom<Media>().nullable().optional(),

  twitterTitle: z
    .string()
    .trim()
    .max(255, { message: "Twitter title cannot exceed 255 characters" })
    .optional(),

  twitterDescription: z
    .string()
    .trim()
    .max(1000, { message: "Twitter description cannot exceed 1000 characters" })
    .optional(),

  twitterImageId: nullableImageId,
  twitterImage: z.custom<Media>().nullable().optional(),

  robotsIndex: z.boolean(),
  robotsFollow: z.boolean(),

  schemaMarkup: z.record(z.string(), z.unknown()).optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
