export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",

  // Pages permissions
  PAGES_CREATE: "page.create",
  PAGES_VIEW: "page.view",
  PAGES_UPDATE: "page.update",
  PAGES_DELETE: "page.delete",
  PAGES_PUBLISH: "page.publish",
  PAGES_RESTORE: "page.restore",

  // Page Sections permissions
  PAGE_SECTIONS_CREATE: "page-section.create",
  PAGE_SECTIONS_VIEW: "page-section.view",
  PAGE_SECTIONS_UPDATE: "page-section.update",
  PAGE_SECTIONS_DELETE: "page-section.delete",

  // Menus permissions
  MENUS_VIEW: "menu.view",
  MENUS_CREATE: "menu.create",
  MENUS_UPDATE: "menu.update",
  MENUS_DELETE: "menu.delete",

  //service permissions
  SERVICES_CREATE: "service.create",
  SERVICES_VIEW: "service.view",
  SERVICES_UPDATE: "service.update",
  SERVICES_DELETE: "service.delete",
  SERVICES_PUBLISH: "service.publish",

  // Blog permissions
  BLOG_CREATE: "blog.create",
  BLOG_VIEW: "blog.view",
  BLOG_UPDATE: "blog.update",
  BLOG_DELETE: "blog.delete",
  BLOG_PUBLISH: "blog.publish",
  BLOG_UNPUBLISH: "blog.unpublish",
 

  //Blog Categories permissions
  BLOG_CATEGORIES_VIEW: "blog-category.view",
  BLOG_CATEGORIES_CREATE: "blog-category.create",
  BLOG_CATEGORIES_UPDATE: "blog-category.update",
  BLOG_CATEGORIES_DELETE: "blog-category.delete",

  //Blog Tags permissions
  BLOG_TAGS_VIEW: "blog-tag.view",
  BLOG_TAGS_CREATE: "blog-tag.create",
  BLOG_TAGS_UPDATE: "blog-tag.update",
  BLOG_TAGS_DELETE: "blog-tag.delete",

  // SEO permissions
  SEO_VIEW: "seo.view",
  SEO_UPDATE: "seo.update",

  //Redirects permissions
  REDIRECT_VIEW: "redirect.view",
  REDIRECT_CREATE: "redirect.create",
  REDIRECT_UPDATE: "redirect.update",
  REDIRECT_DELETE: "redirect.delete",

  // Settings permissions
  SETTINGS_VIEW: "settings.view",
  SETTINGS_UPDATE: "settings.update",

  // Profile permissions
  PROFILE_UPDATE: "profile.update",
  PROFILE_CHANGE_PASSWORD: "profile.change-password",

  // ROles & permissions
  ROLES_VIEW: "roles.view",
  ROLES_CREATE: "roles.create",
  ROLES_UPDATE: "roles.update",
  ROLES_DELETE: "roles.delete",

  // Leads permissions
  LEAD_VIEW: "lead.view",
  LEAD_UPDATE: "lead.update",
  LEAD_DELETE: "lead.delete",
  LEAD_EXPORT: "lead.export",

  // Users permissions
  USER_VIEW: "user.view",
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",
  USER_RESET_PASSWORD: "user.reset-password",

  // Media permissions
  MEDIA_VIEW: "media.view",
  MEDIA_UPLOAD: "media.upload",
  MEDIA_UPDATE: "media.update",
  MEDIA_DELETE: "media.delete",
  MEDIA_RESTORE: "media.restore",

  // Contact forms permissions
  CONTACT_VIEW: "contact.view",
  CONTACT_EXPORT: "contact.export",
  CONTACT_DELETE: "contact.delete",

  AUDIT_LOG_VIEW: "audit-log.view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
