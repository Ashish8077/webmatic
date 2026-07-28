import { z } from "zod";
import {
  requiredString,
  optionalString,
  imageIdSchema,
} from "./common.schema";
import { sliderSettingsSchema, DEFAULT_SLIDER_SETTINGS, type SliderSettings } from "./common-settings.schema";

// ─── Testimonials content schema ──────────────────────────────────────────────

export const testimonialsContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  description: optionalString(2000),
  backgroundColor: optionalString(),
  backgroundImageId: imageIdSchema,
});

export type TestimonialsContentValues = z.infer<typeof testimonialsContentSchema>;

export const DEFAULT_TESTIMONIALS_CONTENT: TestimonialsContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  backgroundColor: "",
  backgroundImageId: null,
};

// ─── Testimonials settings schema ─────────────────────────────────────────────

export const testimonialsSettingsSchema = sliderSettingsSchema;

export type TestimonialsSettingsValues = SliderSettings;

export const DEFAULT_TESTIMONIALS_SETTINGS: TestimonialsSettingsValues = DEFAULT_SLIDER_SETTINGS;
