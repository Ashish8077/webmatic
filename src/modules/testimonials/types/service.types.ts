import { PaginationMeta } from "@/shared/types/pagination";
import { TestimonialStatus } from "../constants/testimonial.constants";
import { Media } from "@/modules/media/types";

export interface CreateTestimonialResponse {
  testimonial: {
    id: number;
    clientName: string;
    status: TestimonialStatus;
  };
}

export interface TestimonialItem {
  id: number;
  clientName: string;
  designation: string | null;
  companyName: string | null;
  profileImageId: number | null;
  profileImage?: Media | null;
  title: string | null;
  description: string;
  rating: number;
  status: TestimonialStatus;
  sortOrder: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialListResponse {
  items: TestimonialItem[];
  pagination: PaginationMeta;
}

export interface CreateTestimonialPayload {
  client_name: string;
  designation: string | null;
  company_name: string | null;
  profile_image_id: number | null;
  title: string | null;
  description: string;
  rating: number;
  status: TestimonialStatus;
  sort_order: number;
}

export interface UpdateTestimonialPayload extends Partial<CreateTestimonialPayload> {
  published_at?: Date | null;
}
