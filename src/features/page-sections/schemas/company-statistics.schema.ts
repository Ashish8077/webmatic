import { z } from "zod";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";
import { requiredString, optionalString, imageIdSchema } from "./common.schema";
import { numberSetting } from "./common-settings.schema";

// ─── Company Statistics Item Schema ─────────────────────────────────────────────

const companyStatisticsItemSchema = z
  .object({
    number: requiredString("Number"),
    suffix: optionalString(50),
    title: requiredString("Title"),
    description: optionalString(500),
    visualType: visualAssetSchema.shape.visualType,
    iconName: visualAssetSchema.shape.iconName,
    imageId: visualAssetSchema.shape.imageId,
    sortOrder: numberSetting(0, 1000).default(0),
  })
  .superRefine((data, ctx) => {
    if (
      data.visualType === "none" &&
      (data.iconName !== null || data.imageId !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["visualType"],
        message: "Invalid visual asset configuration.",
      });
    }
    if (
      data.visualType === "icon" &&
      (data.iconName === null || data.imageId !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["visualType"],
        message: "Invalid visual asset configuration.",
      });
    }
    if (
      data.visualType === "image" &&
      (data.imageId === null || data.iconName !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["visualType"],
        message: "Invalid visual asset configuration.",
      });
    }
  });

// ─── Company Statistics Content Schema ────────────────────────────────────────

export const companyStatisticsContentSchema = z.object({
  items: z.array(companyStatisticsItemSchema),
});

export type CompanyStatisticsContentValues = z.infer<
  typeof companyStatisticsContentSchema
>;

export const DEFAULT_COMPANY_STATISTICS_CONTENT: CompanyStatisticsContentValues =
  {
    items: [],
  };
