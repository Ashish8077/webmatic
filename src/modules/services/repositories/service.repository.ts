import { ResultSetHeader } from "mysql2";
import db from "@/database/connection";
import { CreateServiceInput } from "../validation/create-service.schema";
import { toJson } from "@/shared/utils/database/json";

export async function createService(
  service: CreateServiceInput,
  userId: number,
): Promise<number> {
  const publishedAt = service.status === "published" ? new Date() : null;

  const [result] = await db.execute<ResultSetHeader>(
    `
      INSERT INTO services (
        name,
        slug,
        short_description,
        description,
        featured_image_id,
        banner_image_id,
        key_features,
        benefits,
        faq,
        cta_title,
        cta_description,
        cta_button_text,
        cta_button_url,
        seo_title,
        meta_description,
        meta_keywords,
        canonical_url,
        open_graph_title,
        open_graph_description,
        open_graph_image_id,
        twitter_title,
        twitter_description,
        twitter_image_id,
        schema_markup,
        status,
        is_featured,
        sort_order,
        published_at,
        created_by,
        updated_by
      )
      VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `,
    [
      service.name,
      service.slug,
      service.shortDescription ?? null,
      service.description ?? null,

      service.featuredImageId ?? null,
      service.bannerImageId ?? null,

      toJson(service.keyFeatures),

      toJson(service.benefits),

      toJson(service.faq),

      service.ctaTitle ?? null,
      service.ctaDescription ?? null,
      service.ctaButtonText ?? null,
      service.ctaButtonUrl ?? null,

      service.seoTitle ?? null,
      service.metaDescription ?? null,
      service.metaKeywords ?? null,
      service.canonicalUrl ?? null,

      service.openGraphTitle ?? null,
      service.openGraphDescription ?? null,
      service.openGraphImageId ?? null,

      service.twitterTitle ?? null,
      service.twitterDescription ?? null,
      service.twitterImageId ?? null,

      toJson(service.schemaMarkup),

      service.status ?? "draft",
      service.isFeatured ?? false,
      service.sortOrder ?? 0,

      publishedAt,

      userId,
      userId,
    ],
  );

  return result.insertId;
}
