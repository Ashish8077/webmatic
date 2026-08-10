import type { BlogListItem } from "@/modules/blogs/types/service.types";
import { BlogCard } from "../../_components/blog-card";

interface RelatedBlogsProps {
  blogs: BlogListItem[];
}

/**
 * Presentational component for displaying related blog posts.
 * No data fetching. No filtering. No business logic.
 */
export function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 lg:py-20 border-t border-slate-200">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[28px] sm:text-[32px] font-bold text-navy mb-3">
            Related Articles
          </h2>
          <p className="text-slate-500 text-[16px]">
            Continue reading with these related posts
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
