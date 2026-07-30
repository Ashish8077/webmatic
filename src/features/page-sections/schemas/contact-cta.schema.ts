import { z } from "zod";
import { requiredString, optionalString, optionalUrl } from "./common.schema";

// ─── Contact CTA content schema ──────────────────────────────────────────────

export const contactCtaContentSchema = z.object({
  heading: requiredString("Heading"),
  description: optionalString(2000),
  privacyNote: optionalString(500),
  buttonText: requiredString("Button text"),
  buttonUrl: optionalUrl(),
});

export type ContactCtaContentValues = z.infer<typeof contactCtaContentSchema>;

export const DEFAULT_CONTACT_CTA_CONTENT: ContactCtaContentValues = {
  heading: "Ready to start your next project?",
  description: "",
  privacyNote:
    "Note: Your details are kept strictly confidential as per our Privacy Policy.",
  buttonText: "Request a Demo",
  buttonUrl: "",
};
