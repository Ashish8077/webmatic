export interface RawTestimonialItem {
  title: string;
  description: string;
  authorName: string;
  authorDesignation: string;
  authorImageId: number | null;
}

export interface RawTestimonialContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  testimonials: RawTestimonialItem[];
}

export interface TestimonialItem {
  title: string;
  description: string;
  authorName: string;
  authorDesignation: string;
  authorImageId: number | null;
}

export interface TestimonialContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  testimonials: TestimonialItem[];
}
