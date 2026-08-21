import { z } from "zod";
import {
  requiredString,
  optionalString,
  buttonSchema,
  optionalButtonSchema,
  imageIdSchema,
} from "./common.schema";
import { sliderSettingsSchema, DEFAULT_SLIDER_SETTINGS, type SliderSettings } from "./common-settings.schema";

// ─── Hero slide schema ────────────────────────────────────────────────────────

const heroSlideSchema = z.object({
  badge: requiredString("Badge"),
  headline: requiredString("Headline"),
  highlight: optionalString(),
  subheadline: optionalString(500),
  primaryButton: buttonSchema,
  secondaryButton: optionalButtonSchema,
  backgroundImageId: imageIdSchema,
  backgroundImage: z.any().nullable().optional(),
});

// ─── Hero content schema ──────────────────────────────────────────────────────

export const heroContentSchema = z.object({
  slides: z
    .array(heroSlideSchema)
    .min(1, { message: "At least one slide is required." }),
});

export type HeroContentValues = z.infer<typeof heroContentSchema>;

export const DEFAULT_HERO_CONTENT: HeroContentValues = {
  slides: [
    {
      badge: "",
      headline: "",
      highlight: "",
      subheadline: "",
      primaryButton: { text: "", url: "" },
      secondaryButton: { text: "", url: "" },
      backgroundImageId: null,
    },
  ],
};

// ─── Hero settings schema ─────────────────────────────────────────────────────

export const heroSettingsSchema = sliderSettingsSchema;

export type HeroSettingsValues = SliderSettings;

export const DEFAULT_HERO_SETTINGS: HeroSettingsValues = DEFAULT_SLIDER_SETTINGS;
