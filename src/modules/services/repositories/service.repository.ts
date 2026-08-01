import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";

import { GetServicesQuery } from "../validation/get-services-query.schema";
import { toJson } from "@/shared/utils/database/json";
import { QueryValue } from "@/shared/types/database";
import {
  CountRow,
  ServiceDetailsRow,
  ServiceListRow,
  ServiceSlugRow,
} from "../types/repository.types";
import {
  CreateServicePayload,
  UpdateServicePayload,
} from "../types/service.types";

type SortBy = NonNullable<GetServicesQuery["sortBy"]>;

export const SORT_COLUMNS: Record<SortBy, string> = {
  name: "name",
  slug: "slug",
  status: "status",
  sort_order: "sort_order",
  created_at: "created_at",
  updated_at: "updated_at",
  published_at: "published_at",
};

/**
 * Finds a service by slug.
 */
export async function findServiceSlug(
  name: string,
  slug: string,
): Promise<ServiceSlugRow | null> {
  const [rows] = await db.execute<ServiceSlugRow[]>(
    `
    SELECT
      id,
      slug,
      name
    FROM services
    WHERE deleted_at IS NULL
      AND (name = ? OR slug = ?)
    LIMIT 1
    `,
    [name, slug],
  );

  return rows[0] ?? null;
}

/**
 * Finds a service by slug, excluding a specific service ID.
 */
export async function findServiceByNameOrSlugExcludingServiceId(
  name: string | undefined,
  slug: string | undefined,
  serviceId: number,
): Promise<ServiceSlugRow | null> {
  const [rows] = await db.execute<ServiceSlugRow[]>(
    `
    SELECT
      id,
      slug,
      name
    FROM services
    WHERE deleted_at IS NULL
      AND id <> ?
      AND (name = ? OR slug = ?)
    LIMIT 1
    `,
    [serviceId, name ?? null, slug ?? null],
  );

  return rows[0] ?? null;
}

/**
 * Finds services by query.
 */
export async function findServices(
  options: GetServicesQuery,
): Promise<ServiceListRow[]> {
  const offset = (options.page - 1) * options.limit;

  const where: string[] = ["deleted_at IS NULL"];
  const params: (string | number | boolean)[] = [];

  if (options.search) {
    where.push("(name LIKE ? OR slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  if (options.isFeatured !== undefined) {
    where.push("is_featured = ?");
    params.push(options.isFeatured ? 1 : 0);
  }

  const sortColumn = SORT_COLUMNS[options.sortBy];
  const sortDirection: "ASC" | "DESC" =
    options.sortOrder === "asc" ? "ASC" : "DESC";

  params.push(offset, options.limit);

  const [rows] = await db.query<ServiceListRow[]>(
    `
    SELECT
      id,
      name,
      slug,
      short_description,
      visual_type,
      icon_name,
      image_id,
      featured_image_id,
      cta_button_text,
      status,
      is_featured,
      sort_order,
      published_at,
      created_at,
      updated_at
    FROM services
    WHERE ${where.join(" AND ")}
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT ?, ?
    `,
    params,
  );

  return rows;
}

/**
 * Finds a service by ID.
 */
export async function findServiceById(
  id: number,
): Promise<ServiceDetailsRow | null> {
  const [rows] = await db.execute<ServiceDetailsRow[]>(
    `
    SELECT
      id,
      name,
      slug,
      short_description,
      description,
      featured_image_id,
      banner_image_id,
      visual_type,
      icon_name,
      image_id,
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
      created_at,
      updated_at,
      created_by,
      updated_by
    FROM services
    WHERE id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [id],
  );

  return rows[0] ?? null;
}

export async function findPublishedServiceBySlug(
  slug: string,
): Promise<ServiceDetailsRow | null> {
  const [rows] = await db.execute<ServiceDetailsRow[]>(
    `
    SELECT
      id,
      name,
      slug,
      short_description,
      description,
      featured_image_id,
      banner_image_id,
      visual_type,
      icon_name,
      image_id,
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
      created_at,
      updated_at,
      created_by,
      updated_by
    FROM services
    WHERE slug = ?
      AND status = 'published'
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );

  return rows[0] ?? null;
}

export async function countServices(
  options: GetServicesQuery,
): Promise<number> {
  const where: string[] = ["deleted_at IS NULL"];
  const params: (string | number | boolean)[] = [];

  if (options.search) {
    where.push("(name LIKE ? OR slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  if (options.isFeatured !== undefined) {
    where.push("is_featured = ?");
    params.push(options.isFeatured ? 1 : 0);
  }

  const [rows] = await db.query<CountRow[]>(
    `
    SELECT COUNT(*) AS total
    FROM services
    WHERE ${where.join(" AND ")}
    `,
    params,
  );

  return Number(rows[0].total);
}

/**
 * Creates a new service.
 */
export async function createService(
  service: CreateServicePayload,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO services
    (
      name,
      slug,
      short_description,
      description,
      featured_image_id,
      banner_image_id,
      visual_type,
      icon_name,
      image_id,
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END, ?, ?)
    `,
    [
      service.name,
      service.slug,
      service.short_description,
      service.description,
      service.featured_image_id,
      service.banner_image_id,
      service.visual_type,
      service.icon_name,
      service.image_id,
      service.key_features,
      service.benefits,
      service.faq,
      service.cta_title,
      service.cta_description,
      service.cta_button_text,
      service.cta_button_url,
      service.seo_title,
      service.meta_description,
      service.meta_keywords,
      service.canonical_url,
      service.open_graph_title,
      service.open_graph_description,
      service.open_graph_image_id,
      service.twitter_title,
      service.twitter_description,
      service.twitter_image_id,
      toJson(service.schema_markup),
      service.status,
      service.is_featured ? 1 : 0,
      service.sort_order,
      service.status === "published",
      userId,
      userId,
    ],
  );

  return result.insertId;
}

/**
 * Updates an existing service.
 */
export async function updateService(
  serviceId: number,
  updateData: UpdateServicePayload,
  userId: number,
): Promise<number> {
  const updates: string[] = [];
  const values: QueryValue[] = [];

  if (updateData.name !== undefined) {
    updates.push("name = ?");
    values.push(updateData.name);
  }

  if (updateData.slug !== undefined) {
    updates.push("slug = ?");
    values.push(updateData.slug);
  }

  if (updateData.short_description !== undefined) {
    updates.push("short_description = ?");
    values.push(updateData.short_description);
  }

  if (updateData.description !== undefined) {
    updates.push("description = ?");
    values.push(updateData.description);
  }

  if (updateData.featured_image_id !== undefined) {
    updates.push("featured_image_id = ?");
    values.push(updateData.featured_image_id);
  }

  if (updateData.banner_image_id !== undefined) {
    updates.push("banner_image_id = ?");
    values.push(updateData.banner_image_id);
  }

  if (updateData.visual_type !== undefined) {
    updates.push("visual_type = ?");
    values.push(updateData.visual_type);
  }

  if (updateData.icon_name !== undefined) {
    updates.push("icon_name = ?");
    values.push(updateData.icon_name);
  }

  if (updateData.image_id !== undefined) {
    updates.push("image_id = ?");
    values.push(updateData.image_id);
  }

  if (updateData.key_features !== undefined) {
    updates.push("key_features = ?");
    values.push(updateData.key_features);
  }

  if (updateData.benefits !== undefined) {
    updates.push("benefits = ?");
    values.push(updateData.benefits);
  }

  if (updateData.faq !== undefined) {
    updates.push("faq = ?");
    values.push(updateData.faq);
  }

  if (updateData.cta_title !== undefined) {
    updates.push("cta_title = ?");
    values.push(updateData.cta_title);
  }

  if (updateData.cta_description !== undefined) {
    updates.push("cta_description = ?");
    values.push(updateData.cta_description);
  }

  if (updateData.cta_button_text !== undefined) {
    updates.push("cta_button_text = ?");
    values.push(updateData.cta_button_text);
  }

  if (updateData.cta_button_url !== undefined) {
    updates.push("cta_button_url = ?");
    values.push(updateData.cta_button_url);
  }

  if (updateData.seo_title !== undefined) {
    updates.push("seo_title = ?");
    values.push(updateData.seo_title);
  }

  if (updateData.meta_description !== undefined) {
    updates.push("meta_description = ?");
    values.push(updateData.meta_description);
  }

  if (updateData.meta_keywords !== undefined) {
    updates.push("meta_keywords = ?");
    values.push(updateData.meta_keywords);
  }

  if (updateData.canonical_url !== undefined) {
    updates.push("canonical_url = ?");
    values.push(updateData.canonical_url);
  }

  if (updateData.open_graph_title !== undefined) {
    updates.push("open_graph_title = ?");
    values.push(updateData.open_graph_title);
  }

  if (updateData.open_graph_description !== undefined) {
    updates.push("open_graph_description = ?");
    values.push(updateData.open_graph_description);
  }

  if (updateData.open_graph_image_id !== undefined) {
    updates.push("open_graph_image_id = ?");
    values.push(updateData.open_graph_image_id);
  }

  if (updateData.twitter_title !== undefined) {
    updates.push("twitter_title = ?");
    values.push(updateData.twitter_title);
  }

  if (updateData.twitter_description !== undefined) {
    updates.push("twitter_description = ?");
    values.push(updateData.twitter_description);
  }

  if (updateData.twitter_image_id !== undefined) {
    updates.push("twitter_image_id = ?");
    values.push(updateData.twitter_image_id);
  }

  if (updateData.schema_markup !== undefined) {
    updates.push("schema_markup = ?");
    values.push(
      updateData.schema_markup === null
        ? null
        : toJson(updateData.schema_markup),
    );
  }

  if (updateData.status !== undefined) {
    updates.push("status = ?");
    values.push(updateData.status);

    updates.push(
      "published_at = CASE WHEN ? THEN COALESCE(published_at, CURRENT_TIMESTAMP) ELSE published_at END",
    );
    values.push(updateData.status === "published" ? 1 : 0);
  }

  if (updateData.is_featured !== undefined) {
    updates.push("is_featured = ?");
    values.push(
      updateData.is_featured === null ? null : updateData.is_featured ? 1 : 0,
    );
  }

  if (updateData.sort_order !== undefined) {
    updates.push("sort_order = ?");
    values.push(updateData.sort_order);
  }

  updates.push("updated_by = ?");
  values.push(userId);

  values.push(serviceId);


  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE services
    SET
      ${updates.join(",\n      ")}
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    values,
  );

  return result.affectedRows;
}

/**
 * Soft deletes a service.
 */
export async function softDeleteService(
  serviceId: number,
  deletedBy: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE services
    SET
      slug = CONCAT(
        LEFT(slug, 255 - CHAR_LENGTH(CONCAT('__deleted__', id))),
        '__deleted__',
        id
      ),
      deleted_at = CURRENT_TIMESTAMP,
      deleted_by = ?
    WHERE id = ?
      AND deleted_at IS NULL
    `,
    [deletedBy, serviceId],
  );

  return result.affectedRows;
}
