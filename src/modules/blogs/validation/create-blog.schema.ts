import {
  emptyStringToNull,
  nullableImageId,
  nullableUrl,
} from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import { BLOG_STATUS } from "../constants/blog.constants";

export const createBlogSchema = z.object({
  // Basic Information
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
  slug: z
    .string()
    .trim()
    .min(1, { message: "Slug is required" })
    .max(255, { message: "Slug must be less than 255 characters" })
    .regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must start with a letter and contain only lowercase letters, numbers and hyphens",
    }),

  excerpt: emptyStringToNull(1000).default(null),
  
  content: z.string().min(1, { message: "Content is required" }),

  authorId: z.coerce.number().int().positive().nullable().default(null),
  featuredImageId: nullableImageId,

  status: z.enum(BLOG_STATUS).default("draft"),
  
  isFeatured: z.boolean().default(false),

  // SEO
  seoTitle: emptyStringToNull(255).default(null),
  metaDescription: emptyStringToNull(1000).default(null),
  metaKeywords: emptyStringToNull(1000).default(null),
  canonicalUrl: nullableUrl("Invalid canonical URL").default(null),

  // Open Graph
  ogTitle: emptyStringToNull(255).default(null),
  ogDescription: emptyStringToNull(1000).default(null),
  ogImageId: nullableImageId,

  // Twitter Card
  twitterTitle: emptyStringToNull(255).default(null),
  twitterDescription: emptyStringToNull(1000).default(null),
  twitterImageId: nullableImageId,

  // Robots tags
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),

  // Structured Data
  schemaMarkup: z.record(z.string(), z.unknown()).nullable().default(null),
  
  // Relations
  categoryIds: z.array(z.coerce.number().int().positive()).default([]),
  tagIds: z.array(z.coerce.number().int().positive()).default([]),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
