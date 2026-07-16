import type { RawServiceContent, ServiceContent } from "./types";

export function normaliseServiceContent(
  raw: RawServiceContent,
): ServiceContent {
  return {
    badge: raw.badge,
    heading: raw.heading,
    highlight: raw.highlight,

    viewAllButton: {
      text: raw.viewAllButton.text,
      to: raw.viewAllButton.url,
    },

    services: raw.services.map((service) => ({
      key: service.key,
      title: service.title,
      description: service.description,
      imageId: service.imageId,

      button: {
        text: service.button.text,
        to: service.button.url,
      },
    })),

    bottomText: raw.bottomText,

    primaryButton: {
      text: raw.primaryButton.text,
      to: raw.primaryButton.url,
    },
  };
}
