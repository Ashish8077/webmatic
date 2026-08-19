import Link from "next/link";
import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { BlogListItem } from "@/modules/blogs/types/service.types";

interface BlogCardProps {
  blog: BlogListItem;
}

export function BlogCard({ blog }: BlogCardProps) {
  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Draft";

  // Get primary category if available
  const categoryNames = blog.categories?.map((c) => c.name).join(", ") || "UNCATEGORIZED";

  return (
    <article className="group flex flex-col rounded-xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Featured Image */}
      <Link href={`/blog/${blog.slug}`} className="relative h-55 w-full overflow-hidden block">
        {blog.featuredImage ? (
          <Image
            src={blog.featuredImage.url}
            alt={blog.featuredImage.altText || blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="text-slate-400 text-[13px]">No Image</span>
          </div>
        )}
        
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/5 transition-colors duration-200" />
      </Link>

      <div className="flex flex-col flex-1 p-6">
        {/* Category */}
        <div className="mb-2.5">
          <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">
            {categoryNames}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="group/link block mb-2.5">
          <h3 className="text-[18px] lg:text-[19px] font-bold text-navy leading-[1.3] group-hover/link:text-primary transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-[14px] leading-[1.6] text-slate-500 flex-1 line-clamp-3 mb-5">
          {blog.excerpt || "Click to read more about this topic..."}
        </p>

        {/* Footer (Author & Date) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <User size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                Posted by
              </span>
              <span className="text-[12px] font-semibold text-navy">
                {blog.author?.name || "admin"}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
            <Calendar size={13} />
            <time dateTime={blog.publishedAt || blog.createdAt}>
              {publishedDate}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}
