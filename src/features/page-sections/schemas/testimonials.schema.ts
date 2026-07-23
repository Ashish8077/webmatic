import { z } from "zod";
import {
  requiredString,
  optionalString,
  imageIdSchema,
} from "./common.schema";
import { sliderSettingsSchema, DEFAULT_SLIDER_SETTINGS, type SliderSettings } from "./common-settings.schema";

// ─── Testimonial item schema ─────────────────────────────────────────────────

const testimonialItemSchema = z.object({
  clientName: requiredString("Client name"),
  clientDesignation: optionalString(),
  companyName: optionalString(),
  imageId: imageIdSchema,
  testimonialTitle: optionalString(),
  testimonialDescription: requiredString("Description").max(2000, {
    message: "Description must not exceed 2000 characters.",
  }),
  rating: z.coerce.number().min(1).max(5).default(5),
  sortOrder: z.coerce.number().min(0).default(0),
  status: z.enum(["published", "draft"]).default("published"),
});

// ─── Testimonials content schema ──────────────────────────────────────────────

export const testimonialsContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  description: optionalString(2000),
  backgroundColor: optionalString(),
  backgroundImageId: imageIdSchema,
  testimonials: z.array(testimonialItemSchema),
});

export type TestimonialsContentValues = z.infer<typeof testimonialsContentSchema>;

export const DEFAULT_TESTIMONIALS_CONTENT: TestimonialsContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  backgroundColor: "",
  backgroundImageId: null,
  testimonials: [],
};

// ─── Testimonials settings schema ─────────────────────────────────────────────

export const testimonialsSettingsSchema = sliderSettingsSchema;

export type TestimonialsSettingsValues = SliderSettings;

export const DEFAULT_TESTIMONIALS_SETTINGS: TestimonialsSettingsValues = DEFAULT_SLIDER_SETTINGS;
