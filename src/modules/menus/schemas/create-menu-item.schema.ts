import { z } from "zod";
import { MENU_ITEM_TYPES, MENU_TARGET_TYPES } from "../constants/menu.constants";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";

export const createMenuItemBaseSchema = z.object({
  menuId: z.number().int().positive(),
  parentId: z.number().int().positive().nullable().optional(),
  title: z.string().min(1, "Title is required").max(255),
  itemType: z.enum(MENU_ITEM_TYPES),
  targetType: z.enum(MENU_TARGET_TYPES).nullable().optional(),
  referenceId: z.number().int().positive().nullable().optional(),
  url: z.string().max(255).nullable().optional(),
  target: z.string().max(50).nullable().optional(),
  rel: z.string().max(50).nullable().optional(),
  icon: visualAssetSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  settings: z.record(z.string(), z.any()).nullable().optional(),
  isActive: z.boolean().default(true),
});

export const createMenuItemSchema = createMenuItemBaseSchema.superRefine((data, ctx) => {
  if (data.itemType === "group") {
    if (data.url || data.referenceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Group cannot have URL or reference",
        path: ["itemType"],
      });
    }
  }

  if (data.itemType === "separator") {
    if (data.url || data.referenceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Separator cannot have URL or reference",
        path: ["itemType"],
      });
    }
  }

  if (data.targetType === "external" || data.targetType === "custom") {
    if (!data.url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "External/custom targets require a URL",
        path: ["url"],
      });
    }
  }

  if (data.targetType === "page" || data.targetType === "service" || data.targetType === "blog_category") {
    if (!data.referenceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Internal targets require a reference ID",
        path: ["referenceId"],
      });
    }
  }
});

export type CreateMenuItemDTO = z.infer<typeof createMenuItemSchema>;
