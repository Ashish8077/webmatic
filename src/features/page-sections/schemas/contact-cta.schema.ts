import { z } from "zod";
import {
  requiredString,
  optionalString,
  buttonSchema,
  optionalButtonSchema,
  imageIdSchema,
} from "./common.schema";
import { numberSetting } from "./common-settings.schema";

// ─── Contact CTA content schema ──────────────────────────────────────────────

export const contactCtaContentSchema = z.object({
  badge: optionalString(),
  heading: requiredString("Heading"),
  description: optionalString(2000),
  primaryButton: buttonSchema,
  secondaryButton: optionalButtonSchema,
  backgroundImageId: imageIdSchema,
});

export type ContactCtaContentValues = z.infer<typeof contactCtaContentSchema>;

export const DEFAULT_CONTACT_CTA_CONTENT: ContactCtaContentValues = {
  badge: "",
  heading: "",
  description: "",
  primaryButton: { text: "", url: "" },
  secondaryButton: { text: "", url: "" },
  backgroundImageId: null,
};

// ─── Contact CTA settings schema ──────────────────────────────────────────────

export const contactCtaSettingsSchema = z.object({
  overlayOpacity: numberSetting(0, 100).default(50),
});

export type ContactCtaSettingsValues = z.infer<typeof contactCtaSettingsSchema>;

export const DEFAULT_CONTACT_CTA_SETTINGS: ContactCtaSettingsValues = {
  overlayOpacity: 50,
};
