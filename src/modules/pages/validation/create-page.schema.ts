import {
  emptyStringToNull,
  nullableImageId,
  nullableUrl,
} from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import { PAGE_STATUS } from "../constants/page.constants";

export const createPageSchema = z.object({
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

  status: z.enum(PAGE_STATUS).optional(),

  // SEO
  seoTitle: emptyStringToNull(255).optional(),
  metaDescription: emptyStringToNull(1000).optional(),
  metaKeywords: emptyStringToNull(1000).optional(),
  canonicalUrl: nullableUrl("Invalid canonical URL").optional(),

  // Open Graph
  ogTitle: emptyStringToNull(255).optional(),
  ogDescription: emptyStringToNull(1000).optional(),
  ogImageId: nullableImageId,

  // Twitter Card
  twitterTitle: emptyStringToNull(255).optional(),
  twitterDescription: emptyStringToNull(1000).optional(),
  twitterImageId: nullableImageId,

  // Robots tags
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),

  // Structured Data
  schemaMarkup: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
