import type { RawServiceContent, ServiceContent } from "./types";

export function normalizeServiceContent(
  raw: RawServiceContent,
): ServiceContent {
  return {
    badge: raw.badge,
    heading: raw.heading,
    highlight: raw.highlight,

    viewAllButton: raw.viewAllButton
      ? {
          text: raw.viewAllButton.text,
          to: raw.viewAllButton.url,
        }
      : undefined,

    bottomText: raw.bottomText,

    primaryButton: raw.primaryButton
      ? {
          text: raw.primaryButton.text,
          to: raw.primaryButton.url,
        }
      : undefined,
  };
}
