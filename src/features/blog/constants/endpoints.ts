export const BLOG_ENDPOINTS = {
  // Blogs
  CREATE_BLOG: "/blogs",
  GET_BLOGS: "/blogs",
  GET_BLOG_BY_ID: (id: number) => `/blogs/${id}`,
  UPDATE_BLOG: (id: number) => `/blogs/${id}`,
  DELETE_BLOG: (id: number) => `/blogs/${id}`,
  UPDATE_BLOG_STATUS: (id: number) => `/blogs/${id}/status`,

  // Categories
  GET_CATEGORIES: "/blogs/categories",
  CREATE_CATEGORY: "/blogs/categories",
  UPDATE_CATEGORY: (id: number) => `/blogs/categories/${id}`,
  DELETE_CATEGORY: (id: number) => `/blogs/categories/${id}`,

  // Tags
  GET_TAGS: "/blogs/tags",
  CREATE_TAG: "/blogs/tags",
  UPDATE_TAG: (id: number) => `/blogs/tags/${id}`,
  DELETE_TAG: (id: number) => `/blogs/tags/${id}`,
} as const;
