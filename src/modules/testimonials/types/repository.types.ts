import { PaginationQuery } from "@/shared/types/pagination";
import { RowDataPacket } from "mysql2";
import { TestimonialStatus } from "../constants/testimonial.constants";

export interface TestimonialRow extends RowDataPacket {
  id: number;
  client_name: string;
  designation: string | null;
  company_name: string | null;
  profile_image_id: number | null;
  title: string | null;
  description: string;
  rating: number;
  status: TestimonialStatus;
  sort_order: number;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface GetTestimonialsQuery extends PaginationQuery {
  search?: string;
  status?: TestimonialStatus;
  sortBy?: "client_name" | "rating" | "created_at" | "updated_at" | "published_at" | "sort_order";
  sortOrder?: "asc" | "desc";
}

export interface CountRow extends RowDataPacket {
  total: number;
}
