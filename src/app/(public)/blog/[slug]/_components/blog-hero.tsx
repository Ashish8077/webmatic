import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

interface BlogHeroProps {
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  readingTime: number;
  author: { name: string } | null;
  categories: { id: number; name: string }[];
  featuredImage: { url: string; alt: string } | null;
}

export function BlogHero({
  title,
  excerpt,
  publishedAt,
  readingTime,
  author,
  categories,
  featuredImage,
}: BlogHeroProps) {
  const publishedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <header className="bg-white pt-[104px]">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8 py-12 lg:py-16">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: title },
            ]}
          />
        </div>

        {/* Category badges */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold text-orange-500 bg-orange-50 uppercase tracking-wider"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-navy leading-[1.15] mb-5 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-[16px] sm:text-[18px] text-slate-600 leading-[1.7] max-w-3xl mb-8 animate-fade-in"
            style={{ animationDelay: "150ms" }}
          >
            {excerpt}
          </p>
        )}

        {/* Meta row: Author, Date, Reading Time */}
        <div
          className="flex flex-wrap items-center gap-5 text-[14px] text-slate-500 mb-10 pb-8 border-b border-slate-200 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          {author && (
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary">
                <User size={18} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Author</span>
                <span className="font-semibold text-navy text-[14px]">{author.name}</span>
              </div>
            </div>
          )}

          {publishedDate && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" strokeWidth={2} />
              <time dateTime={publishedAt ?? undefined} className="font-medium text-slate-600">
                {publishedDate}
              </time>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400" strokeWidth={2} />
            <span className="font-medium text-slate-600">{readingTime} min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div
          className="relative w-full aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1170px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <p className="text-[13px] text-slate-400 font-medium">No featured image</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
