import { z } from "zod";
import { requiredString, optionalString, optionalUrl } from "./common.schema";

// ─── Contact CTA content schema ──────────────────────────────────────────────

export const contactCtaContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  description: optionalString(2000),
  buttonText: requiredString("Button text"),
  buttonUrl: optionalUrl(),
});

export type ContactCtaContentValues = z.infer<typeof contactCtaContentSchema>;

export const DEFAULT_CONTACT_CTA_CONTENT: ContactCtaContentValues = {
  badge: "SUBMIT A REQUEST",
  heading: "Ready to start your next project?",
  description: "",
  buttonText: "Request a Demo",
  buttonUrl: "",
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
