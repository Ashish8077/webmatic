import { z } from "zod";
import { visualAssetSchema } from "@/shared/schemas/visual-asset.schema";
import {
  requiredString,
  optionalString,
  buttonSchema,
  optionalButtonSchema,
} from "./common.schema";

// ─── Reason item schema ──────────────────────────────────────────────────────

const reasonSchema = z.object({
  key: requiredString("Key"),
  title: requiredString("Title"),
  description: optionalString(1000),
  button: optionalButtonSchema,
  visualType: visualAssetSchema.shape.visualType,
  iconName: visualAssetSchema.shape.iconName,
  imageId: visualAssetSchema.shape.imageId,
  image: z.any().nullable().optional(),
}).superRefine((data, ctx) => {
  if (data.visualType === "none" && (data.iconName !== null || data.imageId !== null)) {
    ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
  }
  if (data.visualType === "icon" && (data.iconName === null || data.imageId !== null)) {
    ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
  }
  if (data.visualType === "image" && (data.imageId === null || data.iconName !== null)) {
    ctx.addIssue({ code: "custom", path: ["visualType"], message: "Invalid visual asset configuration." });
  }
});

// ─── Why Choose Us content schema ─────────────────────────────────────────────

export const whyChooseUsContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  description: optionalString(2000),
  learnMoreButton: optionalButtonSchema,
  reasons: z.array(reasonSchema),
  bottomText: optionalString(500),
  primaryButton: buttonSchema,
});

export type WhyChooseUsContentValues = z.infer<typeof whyChooseUsContentSchema>;

export const DEFAULT_WHY_CHOOSE_US_CONTENT: WhyChooseUsContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  learnMoreButton: { text: "", url: "" },
  reasons: [],
  bottomText: "",
  primaryButton: { text: "", url: "" },
};

// ─── Why Choose Us settings schema ────────────────────────────────────────────

export const whyChooseUsSettingsSchema = z.object({});

export type WhyChooseUsSettingsValues = z.infer<typeof whyChooseUsSettingsSchema>;

export const DEFAULT_WHY_CHOOSE_US_SETTINGS: WhyChooseUsSettingsValues = {};
