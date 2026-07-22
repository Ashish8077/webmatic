import { z } from "zod";
import {
  requiredString,
  optionalString,
  optionalButtonSchema,
  imageIdSchema,
} from "./common.schema";

// ─── About Hero content schema ──────────────────────────────────────────────────

export const aboutHeroContentSchema = z.object({
  badge: optionalString(100),
  heading: requiredString("Heading"),
  highlight: optionalString(100),
  description: requiredString("Description").max(1000, {
    message: "Description must not exceed 1000 characters.",
  }),
  button: optionalButtonSchema,
  imageId: imageIdSchema, // Used for the background hero image
});

export type AboutHeroContentValues = z.infer<typeof aboutHeroContentSchema>;

export const DEFAULT_ABOUT_HERO_CONTENT: AboutHeroContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  button: { text: "", url: "" },
  imageId: null,
};
