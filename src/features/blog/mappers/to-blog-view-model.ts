import type { BlogDetailsResponse } from "@/modules/blogs/types/service.types";
import { calculateReadingTime } from "../utils/calculate-reading-time";

/**
 * Presentation model for the blog details page.
 * Components receive this instead of the raw service response.
 */
export interface BlogViewModel {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  publishedAt: string | null;
  readingTime: number;
  author: { name: string } | null;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  featuredImage: { url: string; alt: string } | null;

  // SEO fields (used by generateMetadata, not by components)
  seo: {
    seoTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    canonicalUrl: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImageUrl: string | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
    twitterImageUrl: string | null;
    robotsIndex: boolean;
    robotsFollow: boolean;
    schemaMarkup: Record<string, unknown> | null;
  };
}

/**
 * Maps the raw service response into a presentation ViewModel.
 * Computed values (reading time, image alt fallback) are resolved here.
 */
export function toBlogViewModel(blog: BlogDetailsResponse): BlogViewModel {
  return {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    publishedAt: blog.publishedAt,
    readingTime: calculateReadingTime(blog.content),
    author: blog.author ?? null,
    categories: blog.categories ?? [],
    tags: blog.tags ?? [],
    featuredImage: blog.featuredImage?.url
      ? {
          url: blog.featuredImage.url,
          alt: blog.featuredImage.altText || blog.title,
        }
      : null,
    seo: {
      seoTitle: blog.seoTitle,
      metaDescription: blog.metaDescription,
      metaKeywords: blog.metaKeywords,
      canonicalUrl: blog.canonicalUrl,
      ogTitle: blog.ogTitle,
      ogDescription: blog.ogDescription,
      ogImageUrl: blog.ogImage?.url ?? blog.featuredImage?.url ?? null,
      twitterTitle: blog.twitterTitle,
      twitterDescription: blog.twitterDescription,
      twitterImageUrl: blog.twitterImage?.url ?? blog.ogImage?.url ?? blog.featuredImage?.url ?? null,
      robotsIndex: blog.robotsIndex,
      robotsFollow: blog.robotsFollow,
      schemaMarkup: blog.schemaMarkup,
    },
  };
}
