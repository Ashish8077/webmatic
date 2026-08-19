import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";

import { GetWorkProjectsQuery } from "../validation/get-work-projects-query.schema";
import { toJson } from "@/shared/utils/database/json";
import { QueryValue } from "@/shared/types/database";
import {
  CountRow,
  WorkProjectDetailsRow,
  WorkProjectListRow,
  WorkProjectSlugRow,
} from "../types/repository.types";
import {
  CreateWorkProjectPayload,
  UpdateWorkProjectPayload,
} from "../types/work-project.types";

type SortBy = NonNullable<GetWorkProjectsQuery["sortBy"]>;

export const SORT_COLUMNS: Record<SortBy, string> = {
  title: "title",
  slug: "slug",
  status: "status",
  category: "category",
  sort_order: "sort_order",
  created_at: "created_at",
  updated_at: "updated_at",
  published_at: "published_at",
};

export async function findWorkProjectSlug(
  title: string,
  slug: string,
): Promise<WorkProjectSlugRow | null> {
  const [rows] = await db.execute<WorkProjectSlugRow[]>(
    `
    SELECT
      id,
      slug,
      title
    FROM work_projects
    WHERE deleted_at IS NULL
      AND (title = ? OR slug = ?)
    LIMIT 1
    `,
    [title, slug],
  );

  return rows[0] ?? null;
}

export async function findWorkProjectByTitleOrSlugExcludingId(
  title: string | undefined,
  slug: string | undefined,
  projectId: number,
): Promise<WorkProjectSlugRow | null> {
  const [rows] = await db.execute<WorkProjectSlugRow[]>(
    `
    SELECT
      id,
      slug,
      title
    FROM work_projects
    WHERE deleted_at IS NULL
      AND id <> ?
      AND (title = ? OR slug = ?)
    LIMIT 1
    `,
    [projectId, title ?? null, slug ?? null],
  );

  return rows[0] ?? null;
}

export async function findWorkProjects(
  options: GetWorkProjectsQuery,
): Promise<WorkProjectListRow[]> {
  const offset = (options.page - 1) * options.limit;

  const where: string[] = ["deleted_at IS NULL"];
  const params: QueryValue[] = [];

  if (options.search) {
    where.push("(title LIKE ? OR slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  if (options.category) {
    where.push("category = ?");
    params.push(options.category);
  }

  if (options.isFeatured !== undefined) {
    where.push("is_featured = ?");
    params.push(options.isFeatured);
  }

  const orderBy = SORT_COLUMNS[options.sortBy] ?? "created_at";
  const orderDir = options.sortOrder === "asc" ? "ASC" : "DESC";

  const [rows] = await db.query<WorkProjectListRow[]>(
    `
    SELECT
      id,
      title,
      slug,
      category,
      short_description,
      featured_image_id,
      status,
      is_featured,
      sort_order,
      published_at,
      updated_at
    FROM work_projects
    WHERE ${where.join(" AND ")}
    ORDER BY ${orderBy} ${orderDir}
    LIMIT ?, ?
    `,
    [...params, offset, options.limit],
  );

  return rows;
}

export async function countWorkProjects(
  options: GetWorkProjectsQuery,
): Promise<number> {
  const where: string[] = ["deleted_at IS NULL"];
  const params: QueryValue[] = [];

  if (options.search) {
    where.push("(title LIKE ? OR slug LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  if (options.category) {
    where.push("category = ?");
    params.push(options.category);
  }

  if (options.isFeatured !== undefined) {
    where.push("is_featured = ?");
    params.push(options.isFeatured);
  }

  const [rows] = await db.execute<CountRow[]>(
    `
    SELECT COUNT(*) as total
    FROM work_projects
    WHERE ${where.join(" AND ")}
    `,
    params,
  );

  return rows[0].total;
}

export async function findWorkProjectById(
  id: number,
): Promise<WorkProjectDetailsRow | null> {
  const [rows] = await db.execute<WorkProjectDetailsRow[]>(
    `
    SELECT *
    FROM work_projects
    WHERE id = ? AND deleted_at IS NULL
    LIMIT 1
    `,
    [id],
  );

  return rows[0] ?? null;
}

export async function findWorkProjectBySlug(
  slug: string,
): Promise<WorkProjectDetailsRow | null> {
  const [rows] = await db.execute<WorkProjectDetailsRow[]>(
    `
    SELECT *
    FROM work_projects
    WHERE slug = ? AND deleted_at IS NULL
    LIMIT 1
    `,
    [slug],
  );

  return rows[0] ?? null;
}

export async function insertWorkProject(
  payload: CreateWorkProjectPayload,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO work_projects (
      title, slug, category, short_description, description, project_url,
      featured_image_id,
      seo_title, meta_description, meta_keywords, canonical_url,
      open_graph_title, open_graph_description, open_graph_image_id,
      twitter_title, twitter_description, twitter_image_id, schema_markup,
      status, is_featured, sort_order, published_at, created_by, updated_by
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?
    )
    `,
    [
      payload.title,
      payload.slug,
      payload.category,
      payload.short_description,
      payload.description,
      payload.project_url,
      payload.featured_image_id,
      payload.seo_title,
      payload.meta_description,
      payload.meta_keywords,
      payload.canonical_url,
      payload.open_graph_title,
      payload.open_graph_description,
      payload.open_graph_image_id,
      payload.twitter_title,
      payload.twitter_description,
      payload.twitter_image_id,
      payload.schema_markup ? toJson(payload.schema_markup) : null,
      payload.status,
      payload.is_featured,
      payload.sort_order,
      payload.status === "published" ? new Date() : null,
      userId,
      userId,
    ],
  );

  return result.insertId;
}

export async function updateWorkProject(
  id: number,
  payload: UpdateWorkProjectPayload,
  userId: number,
): Promise<boolean> {
  const setStatements: string[] = [];
  const params: QueryValue[] = [];

  const updateFields = [
    "title",
    "slug",
    "category",
    "short_description",
    "description",
    "project_url",
    "featured_image_id",
    "seo_title",
    "meta_description",
    "meta_keywords",
    "canonical_url",
    "open_graph_title",
    "open_graph_description",
    "open_graph_image_id",
    "twitter_title",
    "twitter_description",
    "twitter_image_id",
    "status",
    "is_featured",
    "sort_order",
  ];

  for (const field of updateFields) {
    if (field in payload) {
      setStatements.push(`${field} = ?`);
      const value = payload[field as keyof UpdateWorkProjectPayload];
      params.push(value !== undefined ? (value as QueryValue) : null);
    }
  }

  if ("schema_markup" in payload) {
    setStatements.push(`schema_markup = ?`);
    params.push(
      payload.schema_markup ? toJson(payload.schema_markup) : null,
    );
  }

  if ("published_at" in payload) {
    setStatements.push(`published_at = ?`);
    params.push(payload.published_at ?? null);
  }

  setStatements.push(`updated_by = ?`);
  params.push(userId);

  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE work_projects
    SET ${setStatements.join(", ")}
    WHERE id = ? AND deleted_at IS NULL
    `,
    [...params, id],
  );

  return result.affectedRows > 0;
}

export async function updateWorkProjectStatus(
  id: number,
  status: "draft" | "published",
  userId: number,
): Promise<boolean> {
  const publishedAt = status === "published" ? new Date() : null;

  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE work_projects
    SET 
      status = ?,
      published_at = ?,
      updated_by = ?
    WHERE id = ? AND deleted_at IS NULL
    `,
    [status, publishedAt, userId, id],
  );

  return result.affectedRows > 0;
}

export async function updateWorkProjectFeatured(
  id: number,
  isFeatured: boolean,
  userId: number,
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE work_projects
    SET 
      is_featured = ?,
      updated_by = ?
    WHERE id = ? AND deleted_at IS NULL
    `,
    [isFeatured, userId, id],
  );

  return result.affectedRows > 0;
}

export async function softDeleteWorkProject(
  id: number,
  userId: number,
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    UPDATE work_projects
    SET 
      deleted_at = CURRENT_TIMESTAMP,
      deleted_by = ?
    WHERE id = ? AND deleted_at IS NULL
    `,
    [userId, id],
  );

  return result.affectedRows > 0;
}
