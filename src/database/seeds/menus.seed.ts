import db from "../connection";
import { findPageSlug } from "@/modules/pages/repositories/page.repository";
import { findServiceSlug } from "@/modules/services/repositories/service.repository";

export async function seedMenus() {
  console.log("Seeding menus...");

  const adminId = 1;

  // Clear existing
  await db.execute("SET FOREIGN_KEY_CHECKS=0");
  await db.execute("TRUNCATE TABLE menu_items");
  await db.execute("TRUNCATE TABLE menus");
  await db.execute("SET FOREIGN_KEY_CHECKS=1");

  // Create Header Menu
  const [headerMenuRes] = await db.execute<any>(
    `INSERT INTO menus (name, slug, location, is_active, created_by) VALUES (?, ?, ?, ?, ?)`,
    ["Main Navigation", "header", "header", true, adminId]
  );
  const headerMenuId = headerMenuRes.insertId;

  // Create Footer Menu
  const [footerMenuRes] = await db.execute<any>(
    `INSERT INTO menus (name, slug, location, is_active, created_by) VALUES (?, ?, ?, ?, ?)`,
    ["Footer Navigation", "footer", "footer", true, adminId]
  );
  const footerMenuId = footerMenuRes.insertId;

  // Resolve pages
  const homePage = await findPageSlug("");
  const aboutPage = await findPageSlug("about-us"); // Assuming slug is about-us based on common patterns
  const blogPage = await findPageSlug("blog");
  const contactPage = await findPageSlug("contact");

  // Create Home Link
  if (homePage) {
    await db.execute(
      `INSERT INTO menu_items (menu_id, title, item_type, target_type, reference_id, sort_order, is_active, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [headerMenuId, "Home", "link", "page", homePage.id, 1, true, adminId]
    );
  }

  // Create Services Dropdown Group
  const [servicesGroupRes] = await db.execute<any>(
    `INSERT INTO menu_items (menu_id, title, item_type, sort_order, is_active, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [headerMenuId, "Services", "group", 3, true, adminId]
  );
  const servicesGroupId = servicesGroupRes.insertId;

  // Create Column 1: Brand Strategy
  const [brandStrategyRes] = await db.execute<any>(
    `INSERT INTO menu_items (menu_id, parent_id, title, item_type, sort_order, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [headerMenuId, servicesGroupId, "Brand Strategy", "group", 1, true, adminId]
  );
  const brandStrategyId = brandStrategyRes.insertId;

  const brandLinks = ["Logo Design", "Graphic Design", "Corporate Identity", "Packaging Design Services", "Talk Brand Strategy"];
  for (let i = 0; i < brandLinks.length; i++) {
    await db.execute(
      `INSERT INTO menu_items (menu_id, parent_id, title, item_type, target_type, url, sort_order, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [headerMenuId, brandStrategyId, brandLinks[i], "link", "custom", "#", i + 1, true, adminId]
    );
  }

  // Create Column 2: Website Design
  const [websiteDesignRes] = await db.execute<any>(
    `INSERT INTO menu_items (menu_id, parent_id, title, item_type, sort_order, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [headerMenuId, servicesGroupId, "Website Design", "group", 2, true, adminId]
  );
  const websiteDesignId = websiteDesignRes.insertId;

  const webLinks = ["Web Design & Development", "User Interface Design", "User Experience Design", "Content Strategy", "Talk Website Design"];
  for (let i = 0; i < webLinks.length; i++) {
    await db.execute(
      `INSERT INTO menu_items (menu_id, parent_id, title, item_type, target_type, url, sort_order, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [headerMenuId, websiteDesignId, webLinks[i], "link", "custom", "#", i + 1, true, adminId]
    );
  }

  // Create Column 3: Digital Marketing
  const [digitalMarketingRes] = await db.execute<any>(
    `INSERT INTO menu_items (menu_id, parent_id, title, item_type, sort_order, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [headerMenuId, servicesGroupId, "Digital Marketing", "group", 3, true, adminId]
  );
  const digitalMarketingId = digitalMarketingRes.insertId;

  const marketingLinks = ["Content Marketing", "Social Media Strategy", "Email Marketing", "SEO Strategy", "Talk Digital Marketing"];
  for (let i = 0; i < marketingLinks.length; i++) {
    await db.execute(
      `INSERT INTO menu_items (menu_id, parent_id, title, item_type, target_type, url, sort_order, is_active, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [headerMenuId, digitalMarketingId, marketingLinks[i], "link", "custom", "#", i + 1, true, adminId]
    );
  }

  // Create About Link
  if (aboutPage) {
    await db.execute(
      `INSERT INTO menu_items (menu_id, title, item_type, target_type, reference_id, sort_order, is_active, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [headerMenuId, "About", "link", "page", aboutPage.id, 2, true, adminId]
    );
  }

  // Create Blog Link
  if (blogPage) {
    await db.execute(
      `INSERT INTO menu_items (menu_id, title, item_type, target_type, reference_id, sort_order, is_active, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [headerMenuId, "Blog", "link", "page", blogPage.id, 4, true, adminId]
    );
  }

  // Create Contact Link
  if (contactPage) {
    await db.execute(
      `INSERT INTO menu_items (menu_id, title, item_type, target_type, reference_id, sort_order, is_active, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [headerMenuId, "Contact", "link", "page", contactPage.id, 5, true, adminId]
    );
  }

  // Quick Links for footer
  const footerLinks = [
    { title: "Brand Strategy", target: "custom", url: "#" },
    { title: "About Us", target: "page", ref: aboutPage?.id },
    { title: "Services", target: "custom", url: "/services" },
    { title: "Website Design", target: "custom", url: "#" },
    { title: "Our Work", target: "custom", url: "/work" },
    { title: "Contact Us", target: "page", ref: contactPage?.id },
    { title: "Digital Marketing", target: "custom", url: "#" },
    { title: "Forum Support", target: "custom", url: "/support" }
  ];

  for (let i = 0; i < footerLinks.length; i++) {
    const link = footerLinks[i];
    if (link.target === "page" && !link.ref) continue;

    await db.execute(
      `INSERT INTO menu_items (menu_id, title, item_type, target_type, reference_id, url, sort_order, is_active, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        footerMenuId,
        link.title,
        "link",
        link.target,
        link.ref || null,
        link.url || null,
        i + 1,
        true,
        adminId
      ]
    );
  }

  console.log("Menus seeded successfully.");
}
