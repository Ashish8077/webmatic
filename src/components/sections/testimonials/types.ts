export interface RawTestimonialItem {
  clientName?: string;
  clientDesignation?: string;
  companyName?: string;
  imageId?: number | null;
  testimonialTitle?: string;
  testimonialDescription?: string;
  rating?: number;
  sortOrder?: number;
  status?: string;
}

export interface RawTestimonialContent {
  badge?: string;
  heading?: string;
  highlight?: string;
  description?: string;
  backgroundColor?: string;
  backgroundImageId?: number | null;
  testimonials?: RawTestimonialItem[];
}

export interface TestimonialItem {
  clientName: string;
  clientDesignation: string;
  companyName: string;
  imageId: number | null;
  testimonialTitle: string;
  testimonialDescription: string;
  rating: number;
  sortOrder: number;
  status: string;
}

export interface TestimonialContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  backgroundColor: string;
  backgroundImageId: number | null;
  testimonials: TestimonialItem[];
}
