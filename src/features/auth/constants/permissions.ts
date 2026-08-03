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

  MENUS_VIEW: "menu.view",

  //service permissions
  SERVICES_CREATE: "service.create",
  SERVICES_VIEW: "service.view",
  SERVICES_UPDATE: "service.update",
  SERVICES_DELETE: "service.delete",
  SERVICES_PUBLISH: "service.publish",

  BLOG_VIEW: "blog.view",
  BLOG_CREATE: "blog.create",
  BLOG_UPDATE: "blog.update",
  BLOG_DELETE: "blog.delete",
  BLOG_PUBLISH: "blog.publish",

  // media permissions
  MEDIA_VIEW: "media.view",
  MEDIA_CREATE: "media.create",
  MEDIA_UPDATE: "media.update",
  MEDIA_DELETE: "media.delete",

  // lead permissions
  LEAD_VIEW: "lead.view",
  LEAD_UPDATE: "lead.update",
  LEAD_DELETE: "lead.delete",
  LEAD_EXPORT: "lead.export",

  // Continue for the remaining permissions...
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
