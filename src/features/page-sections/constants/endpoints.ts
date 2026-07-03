export const PAGE_SECTION_ENDPOINTS = {
  CREATE_PAGE_SECTION: (pageId: number) => `/pages/${pageId}/sections`,
  GET_PAGE_SECTIONS: (pageId: number) => `/pages/${pageId}/sections`,
  GET_PAGE_SECTION: (sectionId: number) => `/page-sections/${sectionId}`,
  UPDATE_PAGE_SECTION: (sectionId: number) => `/page-sections/${sectionId}`,
  DELETE_PAGE_SECTION: (sectionId: number) => `/page-sections/${sectionId}`,
} as const;
