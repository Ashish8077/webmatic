export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",

  // Pages permissions  
  PAGE_CREATE: "page.create",
  PAGE_VIEW: "page.view",
  PAGE_UPDATE: "page.update",
  PAGE_DELETE: "page.delete",
  PAGE_PUBLISH: "page.publish",

  // Page Sections permissions
  PAGE_SECTION_CREATE: "page-section.create",
  PAGE_SECTION_VIEW: "page-section.view",
  PAGE_SECTION_UPDATE: "page-section.update",
  PAGE_SECTION_DELETE: "page-section.delete",


 // Blog permissions
  BLOG_CREATE: "blog.create",
  BLOG_READ: "blog.read",
  BLOG_UPDATE: "blog.update",
  BLOG_DELETE: "blog.delete",
  BLOG_PUBLISH: "blog.publish",
  BLOG_UNPUBLISH: "blog.unpublish",

  SEO_MANAGE: "seo.manage",

  LEAD_VIEW: "lead.view",
  LEAD_EXPORT: "lead.export",

  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",

  AUDIT_LOG_VIEW: "audit-log.view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
