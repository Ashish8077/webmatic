import { RawTestimonialContent, TestimonialContent } from "./types";

export function normaliseTestimonialContent(
  raw: RawTestimonialContent | undefined | null,
): TestimonialContent {
  const safeRaw = raw || {};

  return {
    badge: safeRaw.badge || "",
    heading: safeRaw.heading || "",
    highlight: safeRaw.highlight || "",
    description: safeRaw.description || "",
    backgroundColor: safeRaw.backgroundColor || "",
    backgroundImageId:
      typeof safeRaw.backgroundImageId === "number"
        ? safeRaw.backgroundImageId
        : null,
    backgroundImage: safeRaw.backgroundImage,
  };
}
