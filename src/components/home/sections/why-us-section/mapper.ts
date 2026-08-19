import { RawWhyUsContent, WhyUsContent } from "./types";

export function normalizeWhyUsContent(raw: RawWhyUsContent): WhyUsContent {
  return {
    badge: raw.badge,
    heading: raw.heading,
    highlight: raw.highlight,
    description: raw.description,

    learnMoreButton: {
      text: raw.learnMoreButton?.text,
      to: raw.learnMoreButton?.url,
    },

    reasons: raw.reasons?.map((reason) => ({
      key: reason.key,
      title: reason.title,
      description: reason.description,
      button: {
        text: reason.button?.text,
        to: reason.button?.url,
      },
      visualType: reason.visualType,
      iconName: reason.iconName,
      imageId: reason.imageId,
      image: reason.image,
    })),

    bottomText: raw.bottomText,

    primaryButton: {
      text: raw.primaryButton?.text,
      to: raw.primaryButton?.url,
    },
  };
}
