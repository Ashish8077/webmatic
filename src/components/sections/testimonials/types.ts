import type { Media } from "@/features/media/types";

export interface RawTestimonialContent {
  badge?: string;
  heading?: string;
  highlight?: string;
  description?: string;
  backgroundColor?: string;
  backgroundImageId?: number | null;
  backgroundImage?: Media | null;
}

export interface TestimonialContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  backgroundColor: string;
  backgroundImageId: number | null;
  backgroundImage?: Media | null;
}
