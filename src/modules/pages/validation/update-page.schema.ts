import {
  emptyStringToNull,
  nullableImageId,
  nullableUrl,
} from "@/shared/utils/validators/zod-helpers";
import z from "zod";
import { PAGE_STATUS } from "../constants/page.constants";
import { customPageTemplateSchema } from "../constants/page-templates";

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

    status: z.enum(PAGE_STATUS).optional(),

    template: customPageTemplateSchema.default("default"),

    seoTitle: emptyStringToNull(255).optional(),

    metaDescription: emptyStringToNull(1000).optional(),

    metaKeywords: emptyStringToNull(1000).optional(),

    canonicalUrl: nullableUrl("Invalid canonical URL").optional(),

    ogTitle: emptyStringToNull(255).optional(),

    ogDescription: emptyStringToNull(1000).optional(),

    ogImageId: nullableImageId,

    twitterTitle: emptyStringToNull(255).optional(),

    twitterDescription: emptyStringToNull(1000).optional(),

    twitterImageId: nullableImageId,

    robotsIndex: z.boolean().optional(),

    robotsFollow: z.boolean().optional(),

    schemaMarkup: z.record(z.string(), z.unknown()).nullable().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type UpdatePageInput = z.infer<typeof updatePageSchema>;
