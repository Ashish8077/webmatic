import { BaseResponse } from "@/shared/types/api.types";
import { PaginationMeta } from "@/shared/types/pagination";

export type TestimonialStatus = "draft" | "published";

export interface CreateTestimonialRequest {
  clientName: string;
  designation?: string | null;
  companyName?: string | null;
  profileImageId?: number | null;
  title?: string | null;
  description: string;
  rating: number;
  status?: TestimonialStatus;
  sortOrder?: number;
}

export type UpdateTestimonialRequest = Partial<CreateTestimonialRequest>;

export interface TestimonialListItem {
  id: number;
  clientName: string;
  designation: string | null;
  companyName: string | null;
  profileImageId: number | null;
  title: string | null;
  description: string;
  rating: number;
  status: TestimonialStatus;
  sortOrder: number;
  publishedAt: string | null;
  updatedAt: string;
}

export interface TestimonialListResponse extends BaseResponse {
  data: {
    items: TestimonialListItem[];
    pagination: PaginationMeta;
  };
}

export interface Testimonial {
  id: number;
  clientName: string;
  designation: string | null;
  companyName: string | null;
  profileImageId: number | null;
  title: string | null;
  description: string;
  rating: number;
  status: TestimonialStatus;
  sortOrder: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetTestimonialResponse extends BaseResponse {
  data: Testimonial;
}

export interface CreateTestimonialResponse extends BaseResponse {
  data: {
    testimonial: {
      id: number;
      clientName: string;
      status: TestimonialStatus;
    };
  };
}
