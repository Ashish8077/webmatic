export const PAGE_SECTION_TYPES = [
  "hero",
  "about",
  "services",
  "portfolio",
  "why-choose-us", // change this to why_choose_use and same fro contact-cta
  "testimonials",
  "faq",
  "contact-cta",
  "about-hero",
  "services-hero",
  "development-process",
  "company-statistics",
  "company-overview",
  "core-values",
  "mission-vision",
  "team-members",
  "contact-information",
  "blog-list",
] as const;

export type PageSectionType = (typeof PAGE_SECTION_TYPES)[number];
