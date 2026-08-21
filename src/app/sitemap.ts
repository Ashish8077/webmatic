import type { MetadataRoute } from "next";
import db from "@/database/connection";
import type { RowDataPacket } from "mysql2";

interface SlugRow extends RowDataPacket {
  slug: string;
  updated_at: Date;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Dynamic sitemap generation.
 * Queries only published, non-deleted pages, services, and blogs.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static home page
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Published pages (dynamic [slug] routes)
  const [pages] = await db.execute<SlugRow[]>(
    `SELECT slug, updated_at FROM pages
     WHERE status = 'published' AND deleted_at IS NULL AND template = 'default'
     ORDER BY updated_at DESC`,
  );

  for (const page of pages) {
    entries.push({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: page.updated_at,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Published services
  const [services] = await db.execute<SlugRow[]>(
    `SELECT slug, updated_at FROM services
     WHERE status = 'published' AND deleted_at IS NULL
     ORDER BY updated_at DESC`,
  );

  for (const service of services) {
    entries.push({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: service.updated_at,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Services list page
  const [serviceListPage] = await db.execute<SlugRow[]>(
    `SELECT slug, updated_at FROM pages
     WHERE status = 'published' AND deleted_at IS NULL AND template = 'service-list'
     LIMIT 1`,
  );
  if (serviceListPage.length > 0) {
    entries.push({
      url: `${BASE_URL}/services`,
      lastModified: serviceListPage[0].updated_at,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Blog list page
  const [blogListPage] = await db.execute<SlugRow[]>(
    `SELECT slug, updated_at FROM pages
     WHERE status = 'published' AND deleted_at IS NULL AND template = 'blog-list'
     LIMIT 1`,
  );
  if (blogListPage.length > 0) {
    entries.push({
      url: `${BASE_URL}/blog`,
      lastModified: blogListPage[0].updated_at,
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  // About us page
  const [aboutPage] = await db.execute<SlugRow[]>(
    `SELECT slug, updated_at FROM pages
     WHERE status = 'published' AND deleted_at IS NULL AND slug = 'about-us'
     LIMIT 1`,
  );
  if (aboutPage.length > 0) {
    entries.push({
      url: `${BASE_URL}/about-us`,
      lastModified: aboutPage[0].updated_at,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
