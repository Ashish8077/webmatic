import { z } from "zod";
import { requiredString, optionalString, optionalUrl } from "./common.schema";

// ─── Contact CTA content schema ──────────────────────────────────────────────

export const contactCtaContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  description: optionalString(2000),
  privacyNote: optionalString(500),
  successMessage: requiredString("Success Message"),
  buttonText: requiredString("Button text"),
  buttonUrl: optionalUrl(),
  map: z.object({
    embedUrl: z.string().url().or(z.literal("")).optional(),
  }).optional(),
});

export type ContactCtaContentValues = z.infer<typeof contactCtaContentSchema>;

export const DEFAULT_CONTACT_CTA_CONTENT: ContactCtaContentValues = {
  badge: "",
  heading: "Ready to start your next project?",
  description: "",
  privacyNote:
    "Note: Your details are kept strictly confidential as per our Privacy Policy.",
  successMessage: "Thank you for getting in touch! We will get back to you within two business days.",
  buttonText: "Request a Demo",
  buttonUrl: "",
  map: { embedUrl: "" },
};

export const contactCtaSettingsSchema = z.object({
  container: z.string().default("default"),
  background: z.string().default("white"),
  paddingTop: z.string().default("xl"),
  paddingBottom: z.string().default("xl"),
});

export type ContactCtaSettingsValues = z.infer<typeof contactCtaSettingsSchema>;

export const DEFAULT_CONTACT_CTA_SETTINGS: ContactCtaSettingsValues = {
  container: "default",
  background: "white",
  paddingTop: "xl",
  paddingBottom: "xl",
};
