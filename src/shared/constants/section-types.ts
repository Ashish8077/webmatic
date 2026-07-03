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
