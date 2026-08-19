export const rolePermissions = {
  "super-admin": [
    "*", // grant all permissions
  ],

  editor: [
    // Dashboard
    "dashboard.view",

    // Pages
    "page.view",
    "page.create",
    "page.update",
    "page.delete",
    "page.publish",
    "page.restore",

    // Page Sections
    "page-section.view",
    "page-section.create",
    "page-section.update",
    "page-section.delete",

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
    "media.restore",

    //Menu
    "menu.view",
    "menu.create",
    "menu.update",
    "menu.delete",

    // Work
    "work.view",
    "work.create",
    "work.update",
    "work.delete",
    "work.publish",
  ],

  "marketing-manager": [
    // Dashboard
    "dashboard.view",

    // SEO
    "seo.view",
    "seo.update",

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

    // Leads
    "lead.view",
    "lead.update",
    "lead.export",
    "lead.delete",

    // Contact Forms
    "contact.view",
    "contact.export",
    "contact.delete",
  ],
};
