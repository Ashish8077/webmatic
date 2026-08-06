import { RowDataPacket } from "mysql2";
import db from "../connection";
import { testimonialsData } from "../data/testimonials";

export async function seedTestimonials() {
  console.log("Seeding testimonials...");

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [existingTestimonials] = await connection.execute<RowDataPacket[]>(
      `SELECT title FROM testimonials`
    );

    const existingTitles = new Set(existingTestimonials.map((row) => row.title));

    for (const testimonial of testimonialsData) {
      if (existingTitles.has(testimonial.title)) {
        console.log(`Testimonial '${testimonial.title}' already exists. Updating...`);
        await connection.execute(
          `
          UPDATE testimonials SET
            client_name = ?, designation = ?, description = ?, rating = ?, sort_order = ?
          WHERE title = ?
          `,
          [
            testimonial.client_name,
            testimonial.designation,
            testimonial.description,
            testimonial.rating,
            testimonial.sort_order,
            testimonial.title,
          ]
        );
        continue;
      }

      await connection.execute(
        `
        INSERT INTO testimonials (
          client_name, designation, title, description, rating, sort_order, status, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'published', CURRENT_TIMESTAMP)
        `,
        [
          testimonial.client_name,
          testimonial.designation,
          testimonial.title,
          testimonial.description,
          testimonial.rating,
          testimonial.sort_order,
        ]
      );

      console.log(`Created testimonial: ${testimonial.title}`);
    }

    await connection.commit();
    console.log("Testimonials seeded successfully");
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
