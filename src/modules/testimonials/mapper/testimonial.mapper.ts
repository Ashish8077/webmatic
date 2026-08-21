import { TestimonialRow } from "../types/repository.types";
import { CreateTestimonialPayload, TestimonialItem, UpdateTestimonialPayload } from "../types/service.types";
import { CreateTestimonialInput } from "../validation/create-testimonial.schema";
import { UpdateTestimonialInput } from "../validation/update-testimonial.schema";

export function mapTestimonialRowToItem(row: TestimonialRow): TestimonialItem {
  return {
    id: row.id,
    clientName: row.client_name,
    designation: row.designation,
    companyName: row.company_name,
    profileImageId: row.profile_image_id,
    title: row.title,
    description: row.description,
    rating: row.rating,
    status: row.status,
    sortOrder: row.sort_order,
    publishedAt: row.published_at?.toISOString() ?? null,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function toCreateTestimonialPayload(data: CreateTestimonialInput): CreateTestimonialPayload {
  return {
    client_name: data.clientName,
    designation: data.designation ?? null,
    company_name: data.companyName ?? null,
    profile_image_id: data.profileImageId ?? null,
    title: data.title ?? null,
    description: data.description,
    rating: data.rating,
    status: data.status,
    sort_order: data.sortOrder,
  };
}

export function toUpdateTestimonialPayload(data: UpdateTestimonialInput, currentStatus: string): UpdateTestimonialPayload {
  const payload: UpdateTestimonialPayload = {};

  if (data.clientName !== undefined) payload.client_name = data.clientName;
  if (data.designation !== undefined) payload.designation = data.designation;
  if (data.companyName !== undefined) payload.company_name = data.companyName;
  if (data.profileImageId !== undefined) payload.profile_image_id = data.profileImageId;
  if (data.title !== undefined) payload.title = data.title;
  if (data.description !== undefined) payload.description = data.description;
  if (data.rating !== undefined) payload.rating = data.rating;
  if (data.sortOrder !== undefined) payload.sort_order = data.sortOrder;

  if (data.status !== undefined && data.status !== currentStatus) {
    payload.status = data.status;
    
    // Manage published_at timestamp
    if (data.status === "published") {
      payload.published_at = new Date();
    } else {
      payload.published_at = null;
    }
  }

  return payload;
}
