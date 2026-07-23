import type { RawServiceContent, ServiceContent } from "./types";

export function normaliseServiceContent(
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

    services: (raw.services || []).map((service) => ({
      key: service.key,
      title: service.title,
      description: service.description,
      imageId: service.imageId,
      slug: service.slug,
      ctaButtonText: service.ctaButtonText,
    })),

    bottomText: raw.bottomText,

    primaryButton: raw.primaryButton
      ? {
          text: raw.primaryButton.text,
          to: raw.primaryButton.url,
        }
      : undefined,
  };
}
