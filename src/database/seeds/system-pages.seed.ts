import db from "../connection";
import { systemPages } from "../data/system-pages";

export async function seedSystemPages() {
  console.log("Seeding system pages...");

  for (const page of systemPages) {
    await db.execute(
      `
      INSERT INTO pages
      (
        title,
        slug,
        template,
        is_system,
        status,
        published_at
      )
      VALUES (?, ?, ?, TRUE, ?, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE
        status = VALUES(status)
      `,
      [page.title, page.slug, page.template, page.status],
    );
  }

  console.log("System pages seeded");
}
