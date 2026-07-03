export const Permission = {
  DASHBOARD_VIEW: "dashboard.view",

  PAGE_VIEW: "page.view",
  PAGE_CREATE: "page.create",
  PAGE_UPDATE: "page.update",
  PAGE_DELETE: "page.delete",
  PAGE_PUBLISH: "page.publish",

  PAGE_SECTION_VIEW: "page-section.view",
  PAGE_SECTION_CREATE: "page-section.create",
  PAGE_SECTION_UPDATE: "page-section.update",
  PAGE_SECTION_DELETE: "page-section.delete",

  SERVICE_VIEW: "service.view",
  SERVICE_CREATE: "service.create",
  SERVICE_UPDATE: "service.update",
  SERVICE_DELETE: "service.delete",
  SERVICE_PUBLISH: "service.publish",

  BLOG_VIEW: "blog.view",
  BLOG_CREATE: "blog.create",
  BLOG_UPDATE: "blog.update",
  BLOG_DELETE: "blog.delete",
  BLOG_PUBLISH: "blog.publish",

  // Continue for the remaining permissions...
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
