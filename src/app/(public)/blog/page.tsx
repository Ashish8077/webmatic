import type { Metadata } from "next";
import { getBlogsService } from "@/modules/blogs/services/get-blogs.service";
import { BlogCard } from "./_components/blog-card";
import { PublicPagination } from "./_components/public-pagination";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getBlogListPageData } from "@/modules/pages/services/get-public-page";
import type { BlogListContent } from "@/features/page-sections/schemas/blog-list.schema";
import { buildPageMetadata, serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getBlogListPageData();

  if (!pageData) {
    return {
      title: "Blog",
      description: "Read our latest articles and resources.",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: pageData.meta.title,
    seoTitle: pageData.meta.seoTitle,
    metaDescription: pageData.meta.metaDescription,
    metaKeywords: pageData.meta.metaKeywords,
    canonicalUrl: pageData.meta.canonicalUrl ?? null,
    ogTitle: pageData.meta.ogTitle ?? null,
    ogDescription: pageData.meta.ogDescription ?? null,
    ogImageUrl: pageData.meta.ogImageUrl ?? null,
    twitterTitle: pageData.meta.twitterTitle ?? null,
    twitterDescription: pageData.meta.twitterDescription ?? null,
    twitterImageUrl: pageData.meta.twitterImageUrl ?? null,
    robotsIndex: pageData.meta.robotsIndex ?? true,
    robotsFollow: pageData.meta.robotsFollow ?? true,
    schemaMarkup: pageData.meta.schemaMarkup ?? null,
  });
}

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams;
  const pageParam = typeof searchParams.page === "string" ? searchParams.page : Array.isArray(searchParams.page) ? searchParams.page[0] : "1";
  const page = parseInt(pageParam, 10);
  const validPage = isNaN(page) || page < 1 ? 1 : page;

  const pageData = await getBlogListPageData();
  const blogListSection = pageData?.sections.find((s) => s.sectionType === "blog-list");
  const blogListContent = blogListSection?.content as BlogListContent | undefined;

  const title = blogListContent?.heading || "Webmatic Technology Blog";
  const subtitle = blogListContent?.subheading || "Check out the resources below for more proof on how we help brands grow to their fullest potential";

  const blogsResponse = await getBlogsService({
    page: validPage,
    limit: 9, // 3x3 grid
    status: "published",
    sortBy: "published_at",
    sortOrder: "desc",
  });

  const jsonLd = serializeSchemaMarkup(pageData?.meta.schemaMarkup ?? null);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <main className="pt-26 bg-white min-h-screen">
        <div className="mx-auto max-w-292.5 px-5 sm:px-8 py-12 lg:py-16">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            {/* Breadcrumb */}
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
            
            {/* Title & Subtitle */}
            <h1 className="text-[32px] md:text-[40px] font-bold text-navy leading-tight mb-4">
              {title}
            </h1>
            <p className="text-[16px] text-slate-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Blog Grid */}
          {blogsResponse.items.length > 0 ? (
            <>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {blogsResponse.items.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <PublicPagination
                currentPage={blogsResponse.pagination.page}
                totalPages={blogsResponse.pagination.totalPages}
                basePath="/blog"
              />
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center border border-slate-200 border-dashed rounded-2xl bg-slate-50">
              <h3 className="text-xl font-bold text-navy mb-2">No blogs found</h3>
              <p className="text-slate-500">Check back later for new articles and resources.</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}