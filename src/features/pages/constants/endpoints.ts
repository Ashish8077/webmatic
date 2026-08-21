export const PAGES_ENDPOINTS = {
  CREATE_PAGE: "/pages",
  GET_PAGES: "/pages",
  GET_PAGE_BY_ID: (id: number) => `/pages/${id}`,
  UPDATE_PAGE: (id: number) => `/pages/${id}`,
  DELETE_PAGE: (id: number) => `/pages/${id}`,
  UPDATE_PAGE_STATUS: (id: number) => `/pages/${id}/status`,
  BULK_DELETE: "/pages/bulk-delete",
} as const;
