import { z } from "zod";
import { WORK_CATEGORIES } from "../constants/work.constants";

export const createWorkProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  category: z.enum(WORK_CATEGORIES),
  shortDescription: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  projectUrl: z.string().url().nullable().optional().or(z.literal("")),
  featuredImageId: z.number().nullable().optional(),
  
  seoTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  metaKeywords: z.string().nullable().optional(),
  canonicalUrl: z.string().nullable().optional(),

  openGraphTitle: z.string().nullable().optional(),
  openGraphDescription: z.string().nullable().optional(),
  openGraphImageId: z.number().nullable().optional(),

  twitterTitle: z.string().nullable().optional(),
  twitterDescription: z.string().nullable().optional(),
  twitterImageId: z.number().nullable().optional(),

  schemaMarkup: z.string().nullable().optional(),

  status: z.enum(["draft", "published"]).optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().min(0).optional(),
});

export const updateWorkProjectSchema = createWorkProjectSchema.partial();

export type CreateWorkProjectInput = z.infer<typeof createWorkProjectSchema>;
export type UpdateWorkProjectInput = z.infer<typeof updateWorkProjectSchema>;
