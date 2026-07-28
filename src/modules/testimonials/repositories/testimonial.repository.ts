import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { GetTestimonialsQuery, CountRow, TestimonialRow } from "../types/repository.types";
import { CreateTestimonialPayload, UpdateTestimonialPayload } from "../types/service.types";

type SortBy = NonNullable<GetTestimonialsQuery["sortBy"]>;

export const SORT_COLUMNS: Record<SortBy, string> = {
  client_name: "client_name",
  rating: "rating",
  created_at: "created_at",
  updated_at: "updated_at",
  published_at: "published_at",
  sort_order: "sort_order",
};

export async function findTestimonials(
  options: GetTestimonialsQuery,
): Promise<TestimonialRow[]> {
  const offset = (options.page - 1) * options.limit;

  const where: string[] = ["deleted_at IS NULL"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any[] = [];

  if (options.search) {
    where.push("(client_name LIKE ? OR company_name LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const sortColumn = SORT_COLUMNS[options.sortBy ?? "sort_order"] || "sort_order";
  const sortDirection = options.sortOrder?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  const orderByClause = `ORDER BY ${sortColumn} ${sortDirection}`;

  const [rows] = await db.execute<TestimonialRow[]>(
    `
    SELECT
      id,
      client_name,
      designation,
      company_name,
      profile_image_id,
      title,
      description,
      rating,
      status,
      sort_order,
      published_at,
      created_at,
      updated_at
    FROM testimonials
    ${whereClause}
    ${orderByClause}
    LIMIT ? OFFSET ?
    `,
    [...params, options.limit.toString(), offset.toString()],
  );

  return rows;
}

export async function countTestimonials(
  options: GetTestimonialsQuery,
): Promise<number> {
  const where: string[] = ["deleted_at IS NULL"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any[] = [];

  if (options.search) {
    where.push("(client_name LIKE ? OR company_name LIKE ?)");
    params.push(`%${options.search}%`, `%${options.search}%`);
  }

  if (options.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const [rows] = await db.execute<CountRow[]>(
    `
    SELECT COUNT(*) as total
    FROM testimonials
    ${whereClause}
    `,
    params,
  );

  return rows[0]?.total ?? 0;
}

export async function findTestimonialById(
  id: number,
): Promise<TestimonialRow | null> {
  const [rows] = await db.execute<TestimonialRow[]>(
    `
    SELECT *
    FROM testimonials
    WHERE id = ? AND deleted_at IS NULL
    `,
    [id],
  );

  return rows[0] ?? null;
}

export async function createTestimonial(
  payload: CreateTestimonialPayload,
  userId: number,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO testimonials (
      client_name,
      designation,
      company_name,
      profile_image_id,
      title,
      description,
      rating,
      status,
      sort_order,
      created_by,
      updated_by,
      published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      payload.client_name,
      payload.designation ?? null,
      payload.company_name ?? null,
      payload.profile_image_id ?? null,
      payload.title ?? null,
      payload.description,
      payload.rating,
      payload.status,
      payload.sort_order,
      userId,
      userId,
      payload.status === "published" ? new Date() : null,
    ],
  );

  return result.insertId;
}

export async function updateTestimonial(
  id: number,
  payload: UpdateTestimonialPayload,
  userId: number,
): Promise<void> {
  const fields: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any[] = [];

  const addField = (key: string, value: unknown) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      params.push(value);
    }
  };

  addField("client_name", payload.client_name);
  addField("designation", payload.designation);
  addField("company_name", payload.company_name);
  addField("profile_image_id", payload.profile_image_id);
  addField("title", payload.title);
  addField("description", payload.description);
  addField("rating", payload.rating);
  addField("status", payload.status);
  addField("sort_order", payload.sort_order);
  addField("published_at", payload.published_at);
  
  fields.push("updated_by = ?");
  params.push(userId);

  if (fields.length === 1) return; // Only updated_by

  params.push(id);

  await db.execute(
    `
    UPDATE testimonials
    SET ${fields.join(", ")}
    WHERE id = ? AND deleted_at IS NULL
    `,
    params,
  );
}

export async function softDeleteTestimonial(
  id: number,
  userId: number,
): Promise<void> {
  await db.execute(
    `
    UPDATE testimonials
    SET deleted_at = NOW(), deleted_by = ?
    WHERE id = ? AND deleted_at IS NULL
    `,
    [userId, id],
  );
}
