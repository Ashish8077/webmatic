import { RawFaqContent, FaqContent } from "./types";

export function normaliseFaqContent(raw: RawFaqContent): FaqContent {
  return {
    badge: raw.badge,
    heading: raw.heading,
    highlight: raw.highlight,
    description: raw.description,
    items: raw.items?.map((item) => ({
      question: item.question,
      answer: item.answer,
    })) || [],
    bottomText: raw.bottomText,
    primaryButton: {
      text: raw.primaryButton?.text,
      to: raw.primaryButton?.url,
    },
  };
}
