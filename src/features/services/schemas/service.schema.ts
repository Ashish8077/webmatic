import {
  emptyStringToNull,
  faqItemSchema,
  nonNegativeInt,
  nullablePositiveInt,
  nullableUrl,
  stringArray,
} from "@/shared/utils/validators/zod-helpers";
import { z } from "zod";
import type { JsonObject } from "@/shared/types/json";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";

export const SERVICE_STATUS = ["draft", "published"] as const;

export const serviceBenefitSchema = z.object({
  title: z.string().trim().min(1, { message: "Benefit title is required" }).max(255),
  visualType: visualAssetSchema.shape.visualType,
  iconName: visualAssetSchema.shape.iconName.optional(),
  imageId: visualAssetSchema.shape.imageId.optional(),
}).superRefine((data, ctx) => {
  if (data.visualType) {
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
  }
});

export const serviceSchema = z
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

    shortDescription: emptyStringToNull(2000).optional(),

    description: emptyStringToNull(50000).optional(),

    featuredImageId: nullablePositiveInt.optional(),

    bannerImageId: nullablePositiveInt.optional(),

    visualType: visualAssetSchema.shape.visualType.optional(),
    iconName: visualAssetSchema.shape.iconName.optional(),
    imageId: visualAssetSchema.shape.imageId.optional(),

    keyFeatures: stringArray(255).optional(),

    benefits: z.array(serviceBenefitSchema).optional(),

    faq: z.array(faqItemSchema).nullable().optional(),

    ctaTitle: emptyStringToNull(255).optional(),

    ctaDescription: emptyStringToNull(5000).optional(),

    ctaButtonText: emptyStringToNull(100).optional(),

    ctaButtonUrl: nullableUrl("Invalid URL").optional(),

    seoTitle: emptyStringToNull(255).optional(),

    metaDescription: emptyStringToNull(500).optional(),

    metaKeywords: emptyStringToNull(500).optional(),

    canonicalUrl: nullableUrl("Invalid URL").optional(),

    openGraphTitle: emptyStringToNull(255).optional(),

    openGraphDescription: emptyStringToNull(500).optional(),

    openGraphImageId: nullablePositiveInt.optional(),

    twitterTitle: emptyStringToNull(255).optional(),

    twitterDescription: emptyStringToNull(500).optional(),

    twitterImageId: nullablePositiveInt.optional(),

    schemaMarkup: z.custom<JsonObject>().nullable().optional(),

    status: z.enum(SERVICE_STATUS).optional(),

    isFeatured: z.boolean().optional(),

    sortOrder: nonNegativeInt.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.visualType) {
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
    }

    if (data.status === "published") {
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
    }
  });

export type ServiceFormValues = z.infer<typeof serviceSchema>;
