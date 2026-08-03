import { str } from "@/components/home/content-helpers";
import type { ContactCtaContent } from "./types";

export function normaliseContactCtaContent(
  raw: Record<string, unknown>,
): ContactCtaContent {
  return {
    badge: str(raw.badge, "SUBMIT A REQUEST"),
    heading: str(raw.heading, "Ready to start your next project?"),
    description: str(raw.description),
    privacyNote: str(
      raw.privacyNote,
      "Note: Your details are kept strictly confidential as per our Privacy Policy.",
    ),
    successMessage: str(raw.successMessage, "Thank you for getting in touch! We will get back to you within two business days."),
    buttonText: str(raw.buttonText, "Request a Demo"),
    buttonUrl: str(raw.buttonUrl),
    map: raw.map as ContactCtaContent["map"],
  };
}
