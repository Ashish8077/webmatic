export const SECTION_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export type SectionStatus =
  (typeof SECTION_STATUS)[keyof typeof SECTION_STATUS];
