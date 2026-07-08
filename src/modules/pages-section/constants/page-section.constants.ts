export const SECTION_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export type SectionStatus =
  (typeof SECTION_STATUS)[keyof typeof SECTION_STATUS];

export const PAGE_SECTION_TYPES = [
  "hero",
  "about",
  "services",
  "why_choose_us",
  "testimonials",
  "faq",
  "cta",
  "rich_text",
  "gallery",
  "team",
  "contact_form",
] as const;
