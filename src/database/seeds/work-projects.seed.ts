import db from "../connection";
import { workProjectsData } from "../data/work-projects";

export async function seedWorkProjects() {
  console.log("Seeding work projects...");

  for (const project of workProjectsData) {
    await db.execute(
      `
      INSERT INTO work_projects
      (
        title,
        slug,
        category,
        short_description,
        description,
        status,
        is_featured,
        sort_order,
        published_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        category = VALUES(category),
        short_description = VALUES(short_description),
        description = VALUES(description),
        status = VALUES(status),
        is_featured = VALUES(is_featured),
        sort_order = VALUES(sort_order),
        published_at = VALUES(published_at)
      `,
      [
        project.title,
        project.slug,
        project.category,
        project.short_description,
        project.description,
        project.status,
        project.is_featured,
        project.sort_order,
        project.status === "published" ? new Date() : null,
      ]
    );
  }

  console.log("Work projects seeded.");
}
