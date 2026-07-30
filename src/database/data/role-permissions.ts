export const rolePermissions = {
  "super-admin": [
    "*", // grant all permissions
  ],

  editor: [
    // Pages
    "page.view",
    "page.create",
    "page.update",
    "page.delete",
    "page.publish",

    // Page Builder
    "page-builder.view",
    "page-builder.manage",

    // Blogs
    "blog.view",
    "blog.create",
    "blog.update",
    "blog.delete",
    "blog.publish",

    // Blog Categories
    "blog-category.view",
    "blog-category.create",
    "blog-category.update",
    "blog-category.delete",

    // Blog Tags
    "blog-tag.view",
    "blog-tag.create",
    "blog-tag.update",
    "blog-tag.delete",

    // Media
    "media.view",
    "media.upload",
    "media.update",
    "media.delete",
    "media.manage",
    "media.restore",
  ],

  "marketing-manager": [
    // Blogs
    "blog.view",
    "blog.create",
    "blog.update",
    "blog.delete",
    "blog.publish",

    // Blog Categories
    "blog-category.view",
    "blog-category.create",
    "blog-category.update",
    "blog-category.delete",

    // Blog Tags
    "blog-tag.view",
    "blog-tag.create",
    "blog-tag.update",
    "blog-tag.delete",

    // SEO
    "seo.view",
    "seo.manage",

    // Redirects
    "redirect.view",
    "redirect.manage",

    // Sitemap
    "sitemap.view",
    "sitemap.manage",

    // Leads
    "lead.view",
    "lead.export",

    // Analytics
    "analytics.manage",
  ],

  "content-manager": [
    // Pages
    "page.view",
    "page.create",
    "page.update",
    "page.delete",
    "page.publish",

    // Page Builder
    "page-builder.view",
    "page-builder.manage",

    // Services
    "service.view",
    "service.create",
    "service.update",
    "service.delete",
    "service.publish",

    // Media
    "media.view",
    "media.upload",
    "media.update",
    "media.delete",
    "media.manage",
    "media.restore",
  ],

  "sales-manager": [
    // Contact Forms
    "contact.view",
    "contact.export",

    // Leads
    "lead.view",
    "lead.update",
    "lead.export",
    "lead.delete",
  ],
};
