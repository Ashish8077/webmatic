export const PAGE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export type PageStatus = (typeof PAGE_STATUS)[keyof typeof PAGE_STATUS];

// export const SYSTEM_PAGE_PROTECTED_FIELDS = [
//   "title",
//   "slug",
//   "template",
// ] as const;
