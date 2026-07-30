export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",

  // Pages permissions
  PAGES_CREATE: "page.create",
  PAGES_VIEW: "page.view",
  PAGES_UPDATE: "page.update",
  PAGES_DELETE: "page.delete",
  PAGES_PUBLISH: "page.publish",

  // Page Sections permissions
  PAGE_SECTIONS_CREATE: "page-section.create",
  PAGE_SECTIONS_VIEW: "page-section.view",
  PAGE_SECTIONS_UPDATE: "page-section.update",
  PAGE_SECTIONS_DELETE: "page-section.delete",

  //service permissions
  SERVICES_CREATE: "service.create",
  SERVICES_VIEW: "service.view",
  SERVICES_UPDATE: "service.update",
  SERVICES_DELETE: "service.delete",
  SERVICES_PUBLISH: "service.publish",

  // Blog permissions
  BLOG_CREATE: "blog.create",
  BLOG_VIEW: "blog.read",
  BLOG_UPDATE: "blog.update",
  BLOG_DELETE: "blog.delete",
  BLOG_PUBLISH: "blog.publish",
  BLOG_UNPUBLISH: "blog.unpublish",

  SEO_MANAGE: "seo.manage",

  LEAD_VIEW: "lead.view",
  LEAD_EXPORT: "lead.export",

  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",

  // Media permissions
  MEDIA_VIEW: "media.view",
  MEDIA_UPLOAD: "media.upload",
  MEDIA_UPDATE: "media.update",
  MEDIA_DELETE: "media.delete",
  MEDIA_MANAGE: "media.manage",
  MEDIA_RESTORE: "media.restore",

  AUDIT_LOG_VIEW: "audit-log.view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
