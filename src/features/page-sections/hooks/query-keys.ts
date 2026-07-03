export const pageSectionKeys = {
  all: ["page-sections"] as const,
  lists: () => [...pageSectionKeys.all, "list"] as const,
  list: (pageId: number) => [...pageSectionKeys.lists(), pageId] as const,
  details: () => [...pageSectionKeys.all, "detail"] as const,
  detail: (sectionId: number) =>
    [...pageSectionKeys.details(), sectionId] as const,
};
