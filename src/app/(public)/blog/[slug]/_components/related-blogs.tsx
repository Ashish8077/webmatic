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
    <section className="bg-slate-50 py-20 border-t border-slate-200">
      <div className="mx-auto max-w-292.5 px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[12px] font-bold text-orange-500 uppercase tracking-[0.2em]">
              Keep Reading
            </span>
          </div>
          <h2 className="text-[32px] sm:text-[36px] font-bold text-navy leading-[1.15] mb-3">
            Related Articles
          </h2>
          <p className="text-slate-600 text-[16px] leading-[1.7] max-w-2xl mx-auto">
            Continue reading with these related posts
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
