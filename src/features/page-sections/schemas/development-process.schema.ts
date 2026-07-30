import { z } from "zod";
import { buttonSchema } from "./common.schema";

export const developmentProcessContentSchema = z.object({
  badge: z.string().default(""),
  heading: z.string().default(""),
  highlight: z.string().default(""),
  steps: z
    .array(
      z.object({
        key: z.string().default(""),
        title: z.string().default(""),
        description: z.string().default(""),
        visualType: z.enum(["icon", "image", "none"]).default("icon"),
        iconName: z.string().nullable().default(""),
        imageId: z.number().nullable().default(null),
      }),
    )
    .default([]),
  bottomText: z.string().default(""),
  primaryButton: buttonSchema.optional(),
});

export type DevelopmentProcessContentValues = z.infer<
  typeof developmentProcessContentSchema
>;

export const developmentProcessSettingsSchema = z.object({
  isVisible: z.boolean().default(true),
});

export type DevelopmentProcessSettingsValues = z.infer<
  typeof developmentProcessSettingsSchema
>;
