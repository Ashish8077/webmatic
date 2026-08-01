import { z } from "zod";
import {
  requiredString,
  optionalString,
  imageIdSchema,
} from "./common.schema";

// ─── Services Hero content schema ─────────────────────────────────────────────

export const servicesHeroContentSchema = z.object({
  badge: requiredString("Badge").max(100),
  heading: requiredString("Heading").max(200),
  highlight: optionalString(100),
  description: optionalString(1000),
  ctaLabel: optionalString(50),
  ctaTargetId: optionalString(50),
  secondaryCtaLabel: optionalString(50),
  secondaryCtaTargetId: optionalString(50),
  imageId: imageIdSchema,
  image: z.any().nullable().optional(),
});

export type ServicesHeroContentValues = z.infer<
  typeof servicesHeroContentSchema
>;

export const DEFAULT_SERVICES_HERO_CONTENT: ServicesHeroContentValues = {
  badge: "Our Services",
  heading: "Full-service Digital Marketing",
  highlight: "Expert Solutions",
  description:
    "Almost Overnight, the Internet's Gone From a Technical Wonder to a Business Must.",
  ctaLabel: "Explore Our Services",
  ctaTargetId: "services",
  secondaryCtaLabel: "",
  secondaryCtaTargetId: "",
  imageId: null,
};
