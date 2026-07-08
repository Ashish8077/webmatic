export const PAGE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export type PageStatus = (typeof PAGE_STATUS)[keyof typeof PAGE_STATUS];
