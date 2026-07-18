import { z } from "zod";
import {
  requiredString,
  optionalString,
  imageIdSchema,
} from "./common.schema";
import { sliderSettingsSchema, DEFAULT_SLIDER_SETTINGS, type SliderSettings } from "./common-settings.schema";

// ─── Testimonial item schema ─────────────────────────────────────────────────

const testimonialItemSchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description").max(2000, {
    message: "Description must not exceed 2000 characters.",
  }),
  authorName: requiredString("Author name"),
  authorDesignation: optionalString(),
  authorImageId: imageIdSchema,
});

// ─── Testimonials content schema ──────────────────────────────────────────────

export const testimonialsContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  description: optionalString(2000),
  testimonials: z.array(testimonialItemSchema),
});

export type TestimonialsContentValues = z.infer<typeof testimonialsContentSchema>;

export const DEFAULT_TESTIMONIALS_CONTENT: TestimonialsContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  testimonials: [],
};

// ─── Testimonials settings schema ─────────────────────────────────────────────

export const testimonialsSettingsSchema = sliderSettingsSchema;

export type TestimonialsSettingsValues = SliderSettings;

export const DEFAULT_TESTIMONIALS_SETTINGS: TestimonialsSettingsValues = DEFAULT_SLIDER_SETTINGS;
