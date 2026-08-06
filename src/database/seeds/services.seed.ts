import { RowDataPacket } from "mysql2";
import db from "../connection";
import { servicesData } from "../data/services";

export async function seedServices() {
  console.log("Seeding services...");

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [existingServices] = await connection.execute<RowDataPacket[]>(
      `SELECT slug FROM services`
    );

    const existingSlugs = new Set(existingServices.map((row) => row.slug));

    for (const service of servicesData) {
      if (existingSlugs.has(service.slug)) {
        console.log(`Service '${service.slug}' already exists. Updating...`);
        await connection.execute(
          `
          UPDATE services SET
            name = ?, short_description = ?, description = ?, key_features = ?, benefits = ?, faq = ?,
            seo_title = ?, meta_description = ?, visual_type = ?, icon_name = ?, cta_button_text = ?
          WHERE slug = ?
          `,
          [
            service.name, service.short_description, service.description, service.key_features, service.benefits, service.faq,
            service.seo_title, service.meta_description, service.visual_type, service.icon_name, service.cta_button_text,
            service.slug
          ]
        );
        continue;
      }

      await connection.execute(
        `
        INSERT INTO services (
          name, slug, short_description, description, key_features, benefits, faq,
          seo_title, meta_description, visual_type, icon_name, cta_button_text,
          status, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', CURRENT_TIMESTAMP)
        `,
        [
          service.name,
          service.slug,
          service.short_description,
          service.description,
          service.key_features,
          service.benefits,
          service.faq,
          service.seo_title,
          service.meta_description,
          service.visual_type,
          service.icon_name,
          service.cta_button_text,
        ]
      );

      console.log(`Created service: ${service.slug}`);
    }

    await connection.commit();
    console.log("Services seeded successfully");
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
