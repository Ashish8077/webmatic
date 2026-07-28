import { z } from "zod";
import {
  requiredString,
  optionalString,
  imageIdSchema,
} from "./common.schema";

// ─── About Hero content schema ──────────────────────────────────────────────────

export const aboutHeroContentSchema = z.object({
  badge: requiredString("Badge").max(100),
  heading: requiredString("Heading").max(200),
  highlight: optionalString(100),
  description: optionalString(1000),
  ctaLabel: optionalString(50),
  ctaTargetId: optionalString(50),
  imageId: imageIdSchema, // Used for the background hero image
});

export type AboutHeroContentValues = z.infer<typeof aboutHeroContentSchema>;

export const DEFAULT_ABOUT_HERO_CONTENT: AboutHeroContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  ctaLabel: "",
  ctaTargetId: "",
  imageId: null,
};
