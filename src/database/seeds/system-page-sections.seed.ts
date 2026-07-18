// src/database/seeds/system-page-sections.seed.ts

import { RowDataPacket } from "mysql2/promise";

import db from "../connection";

import { homeSections } from "../data/home-sections";
import { toJson } from "@/shared/utils/database/json";
import { aboutSections } from "../data/about-sections";
import { contactSections } from "../data/contact-sections";
import { blogListSections } from "../data/blog-list-sections";
import { serviceListSections } from "../data/service-list-sections";

interface PageIdRow extends RowDataPacket {
  id: number;
}

export async function seedSystemPageSections(): Promise<void> {
  console.log("Seeding system page sections...");

  await seedSectionsByTemplate("home", homeSections);
  await seedSectionsByTemplate("about", aboutSections);
  await seedSectionsByTemplate("service-list", serviceListSections);
  await seedSectionsByTemplate("blog-list", blogListSections);
  await seedSectionsByTemplate("contact", contactSections);

  console.log("System page sections seeded");
}

/**
 * Seeds the default sections for a system page.
 */
async function seedSectionsByTemplate(
  template: string,
  sections: readonly {
    sectionType: string;
    sortOrder: number;
    content: Record<string, unknown>;
  }[],
): Promise<void> {
  const pageId = await findSystemPageIdByTemplate(template);
  for (const section of sections) {
    await db.execute(
      `
      INSERT INTO page_sections
      (
        page_id,
        section_type,
        sort_order,
        content,
        status
      )
      VALUES
      (
        ?, ?, ?, ?, 'published'
      )
      ON DUPLICATE KEY UPDATE
        sort_order = VALUES(sort_order)
      `,
      [pageId, section.sectionType, section.sortOrder, toJson(section.content)],
    );
  }
}

/**
 * Returns the system page id for the given template.
 */
async function findSystemPageIdByTemplate(template: string): Promise<number> {
  const [rows] = await db.execute<PageIdRow[]>(
    `
    SELECT id
    FROM pages
    WHERE template = ?
      AND is_system = TRUE
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [template],
  );

  const page = rows[0];

  if (!page) {
    throw new Error(`System page with template "${template}" was not found.`);
  }

  return page.id;
}
