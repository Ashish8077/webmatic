export const HOME_SECTION_TYPES = [
  "hero",
  "about",
  "services",
  "why-choose-us", // change this to why_choose_use and same fro contact-cta 
  "testimonials",
  "faq",
  "contact-cta",
] as const;

export type HomeSectionType = (typeof HOME_SECTION_TYPES)[number];
