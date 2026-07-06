export const HOME_SECTION_TYPES = [
  "hero",
  "about",
  "services",
  "why-us",
  "testimonials",
  "faq",
  "contact-cta",
  "footer-cta",
] as const;

export type HomeSectionType = (typeof HOME_SECTION_TYPES)[number];

export const pageSectionTypes = [
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
