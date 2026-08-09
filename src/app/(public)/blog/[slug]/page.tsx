import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicBlogBySlugService } from "@/modules/blogs/services/get-public-blog.service";
import { getRelatedBlogsService } from "@/modules/blogs/services/get-related-blogs.service";
import { toBlogViewModel } from "@/features/blog/mappers/to-blog-view-model";
import { BlogHero } from "./_components/blog-hero";
import { BlogBody } from "./_components/blog-body";
import { RelatedBlogs } from "./_components/related-blogs";

/**
 * ISR revalidation interval in seconds.
 * Colocated here since only this route uses it currently.
 */
const BLOG_REVALIDATE_SECONDS = 60;
export const revalidate = BLOG_REVALIDATE_SECONDS;

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await getPublicBlogBySlugService(slug);
    const vm = toBlogViewModel(blog);

    // Truncate content for description fallback (strip HTML, limit to 160 chars)
    const contentFallback = blog.content
      ? blog.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
      : "";

    const title = vm.seo.seoTitle || vm.title;
    const description = vm.seo.metaDescription || vm.excerpt || contentFallback;

    return {
      title: `${title} | Blog`,
      description,
      keywords: vm.seo.metaKeywords ?? undefined,
      alternates: {
        ...(vm.seo.canonicalUrl && { canonical: vm.seo.canonicalUrl }),
      },
      openGraph: {
        title: vm.seo.ogTitle || vm.seo.seoTitle || vm.title,
        description: vm.seo.ogDescription || vm.seo.metaDescription || vm.excerpt || description,
        type: "article",
        ...(vm.publishedAt && { publishedTime: vm.publishedAt }),
        ...(vm.seo.ogImageUrl && {
          images: [{ url: vm.seo.ogImageUrl }],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: vm.seo.twitterTitle || vm.seo.ogTitle || vm.seo.seoTitle || vm.title,
        description:
          vm.seo.twitterDescription ||
          vm.seo.ogDescription ||
          vm.seo.metaDescription ||
          vm.excerpt ||
          description,
        ...(vm.seo.twitterImageUrl && {
          images: [vm.seo.twitterImageUrl],
        }),
      },
      robots: {
        index: vm.seo.robotsIndex,
        follow: vm.seo.robotsFollow,
      },
    };
  } catch {
    return {
      title: "Blog Not Found",
    };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailsPage({ params }: BlogPageProps) {
  let blog;

  try {
    const { slug } = await params;
    blog = await getPublicBlogBySlugService(slug);
  } catch {
    notFound();
  }

  // Map to ViewModel once — components receive this, not the raw service response
  const vm = toBlogViewModel(blog);

  // Fetch related blogs — the service handles the algorithm internally
  const relatedBlogs = await getRelatedBlogsService(blog);

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero / Header */}
      <BlogHero
        title={vm.title}
        excerpt={vm.excerpt}
        publishedAt={vm.publishedAt}
        readingTime={vm.readingTime}
        author={vm.author}
        categories={vm.categories}
        featuredImage={vm.featuredImage}
      />

      {/* 2. Blog Content + Tags */}
      <BlogBody content={vm.content} tags={vm.tags} />

      {/* 3. Related Blogs */}
      <RelatedBlogs blogs={relatedBlogs} />
    </main>
  );
}
