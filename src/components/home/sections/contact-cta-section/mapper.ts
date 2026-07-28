import { str } from "@/components/home/content-helpers";
import type { ContactCtaContent } from "./types";

export function normaliseContactCtaContent(
  raw: Record<string, unknown>,
): ContactCtaContent {
  return {
    heading: str(raw.heading, "Ready to start your next project?"),
    description: str(raw.description),
    privacyNote: str(
      raw.privacyNote,
      "Note: Your details are kept strictly confidential as per our Privacy Policy.",
    ),
    buttonText: str(raw.buttonText, "Request a Demo"),
    buttonUrl: str(raw.buttonUrl),
  };
}
