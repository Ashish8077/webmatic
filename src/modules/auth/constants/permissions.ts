export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",

  PAGE_CREATE: "page.create",
  PAGE_READ: "page.read",
  PAGE_UPDATE: "page.update",
  PAGE_DELETE: "page.delete",

  BLOG_CREATE: "blog.create",
  BLOG_READ: "blog.read",
  BLOG_UPDATE: "blog.update",
  BLOG_DELETE: "blog.delete",

  SEO_MANAGE: "seo.manage",

  LEAD_VIEW: "lead.view",
  LEAD_EXPORT: "lead.export",

  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",

  AUDIT_LOG_VIEW: "audit-log.view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
