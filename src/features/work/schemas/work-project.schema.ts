import {
  emptyStringToNull,
  nonNegativeInt,
  nullablePositiveInt,
  nullableUrl,
} from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import type { JsonObject } from "@/shared/types/json";
import { WORK_CATEGORIES } from "@/modules/work/constants/work.constants";

export const workProjectSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { message: "Work Project title is required" })
      .max(255, { message: "Work Project title must not exceed 255 characters" }),

    slug: z
      .string()
      .trim()
      .min(1, { message: "Slug is required" })
      .max(255, { message: "Slug must not exceed 255 characters" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug may contain only lowercase letters, numbers, and hyphens",
      }),

    category: z.enum(WORK_CATEGORIES, {
      message: "Category is required"
    }),

    shortDescription: emptyStringToNull(2000).optional(),
    description: emptyStringToNull(50000).optional(),
    projectUrl: nullableUrl("Invalid URL").optional(),

    featuredImageId: nullablePositiveInt.optional(),
    featuredImage: z.any().optional(),

    seoTitle: emptyStringToNull(255).optional(),
    metaDescription: emptyStringToNull(500).optional(),
    metaKeywords: emptyStringToNull(500).optional(),
    canonicalUrl: nullableUrl("Invalid URL").optional(),

    openGraphTitle: emptyStringToNull(255).optional(),
    openGraphDescription: emptyStringToNull(500).optional(),
    openGraphImageId: nullablePositiveInt.optional(),
    openGraphImage: z.any().optional(),

    twitterTitle: emptyStringToNull(255).optional(),
    twitterDescription: emptyStringToNull(500).optional(),
    twitterImageId: nullablePositiveInt.optional(),
    twitterImage: z.any().optional(),

    schemaMarkup: z.custom<JsonObject>().nullable().optional(),

    status: z.enum(["draft", "published"]).optional(),

    isFeatured: z.boolean().optional(),

    sortOrder: nonNegativeInt.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "published") {
      if (!data.description) {
        ctx.addIssue({
          code: "custom",
          path: ["description"],
          message: "Description is required when publishing.",
        });
      }
    }
  });

export type WorkProjectFormValues = z.infer<typeof workProjectSchema>;
