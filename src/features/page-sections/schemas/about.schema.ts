import { z } from "zod";
import {
  requiredString,
  optionalString,
  buttonSchema,
  optionalButtonSchema,
  imageIdSchema,
} from "./common.schema";

// ─── About card schema ────────────────────────────────────────────────────────

const aboutCardSchema = z.object({
  badge: requiredString("Card badge"),
  title: requiredString("Card title"),
  description: optionalString(1000),
  button: optionalButtonSchema,
  imageId: imageIdSchema,
});

// ─── About content schema ─────────────────────────────────────────────────────

export const aboutContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  description: optionalString(2000),
  primaryButton: buttonSchema,
  learnMoreButton: optionalButtonSchema,
  bottomText: optionalString(500),
  cards: z.array(aboutCardSchema),
});

export type AboutContentValues = z.infer<typeof aboutContentSchema>;

export const DEFAULT_ABOUT_CONTENT: AboutContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  primaryButton: { text: "", url: "" },
  learnMoreButton: { text: "", url: "" },
  bottomText: "",
  cards: [],
};

// ─── About settings schema ────────────────────────────────────────────────────

export const aboutSettingsSchema = z.object({});

export type AboutSettingsValues = z.infer<typeof aboutSettingsSchema>;

export const DEFAULT_ABOUT_SETTINGS: AboutSettingsValues = {};
