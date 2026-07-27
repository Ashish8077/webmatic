import {
  emptyStringToNull,
  faqItemSchema,
  nonNegativeInt,
  nullablePositiveInt,
  nullableUrl,
  stringArray,
} from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";
import { SERVICE_STATUS } from "../constants/service.constants";

export const createServiceSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Service name is required" })
      .max(255, { message: "Service name must not exceed 255 characters" }),

    slug: z
      .string()
      .trim()
      .min(1, { message: "Slug is required" })
      .max(255, { message: "Slug must not exceed 255 characters" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug may contain only lowercase letters, numbers, and hyphens",
      }),

    shortDescription: emptyStringToNull(2000).default(null),

    description: emptyStringToNull(50000).default(null),

    featuredImageId: nullablePositiveInt,

    bannerImageId: nullablePositiveInt,

    visualType: visualAssetSchema.shape.visualType,
    iconName: visualAssetSchema.shape.iconName,
    imageId: visualAssetSchema.shape.imageId,

    keyFeatures: stringArray(255).default([]),

    benefits: stringArray(255).default([]),

    faq: z.array(faqItemSchema).default([]),

    ctaTitle: emptyStringToNull(255).default(null),

    ctaDescription: emptyStringToNull(5000).default(null),

    ctaButtonText: emptyStringToNull(100).default(null),

    ctaButtonUrl: nullableUrl("Invalid URL").default(null),

    seoTitle: emptyStringToNull(255).default(null),

    metaDescription: emptyStringToNull(500).default(null),

    metaKeywords: emptyStringToNull(500).default(null),

    canonicalUrl: nullableUrl("Invalid URL").default(null),

    openGraphTitle: emptyStringToNull(255).default(null),

    openGraphDescription: emptyStringToNull(500).default(null),

    openGraphImageId: nullablePositiveInt,

    twitterTitle: emptyStringToNull(255).default(null),

    twitterDescription: emptyStringToNull(500).default(null),

    twitterImageId: nullablePositiveInt,

    schemaMarkup: z.json().nullable().default(null),

    status: z.enum(SERVICE_STATUS).default("draft"),

    isFeatured: z.boolean().default(false),

    sortOrder: nonNegativeInt.default(0),
  })
  .superRefine((data, ctx) => {
    // Run the visualAssetSchema superRefine rules manually here since we merged the shapes
    const isIconNull = data.iconName === null || data.iconName === undefined;
    const isImageNull = data.imageId === null || data.imageId === undefined;

    if (data.visualType === "none" && (!isIconNull || !isImageNull)) {
      ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
    }
    if (data.visualType === "icon" && (isIconNull || !isImageNull)) {
      ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
    }
    if (data.visualType === "image" && (isImageNull || !isIconNull)) {
      ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
    }

    if (data.status !== "published") return;

    if (!data.description) {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "Description is required when publishing.",
      });
    }

    if (!data.featuredImageId) {
      ctx.addIssue({
        code: "custom",
        path: ["featuredImageId"],
        message: "Featured image is required when publishing.",
      });
    }

    if (!data.seoTitle) {
      ctx.addIssue({
        code: "custom",
        path: ["seoTitle"],
        message: "SEO title is required when publishing.",
      });
    }

    if (!data.metaDescription) {
      ctx.addIssue({
        code: "custom",
        path: ["metaDescription"],
        message: "Meta description is required when publishing.",
      });
    }
  });

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
