import { AboutType, RawAboutContent } from "./types";

export function normaliseAboutContent(raw: RawAboutContent): AboutType {
  return {
    badge: raw.badge,
    heading: raw.heading,
    highlight: raw.highlight,
    description: raw.description,
    learnMoreButton: {
      text: raw.learnMoreButton?.text,
      url: raw.learnMoreButton?.url,
    },
    bottomText: raw.bottomText,
    primaryButton: {
      text: raw.primaryButton?.text,
      url: raw.primaryButton?.url,
    },
    cards: raw.cards ?? [],
  };
}
