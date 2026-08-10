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
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: title },
          ]}
        />

        {/* Category badges */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="text-[12px] font-bold text-orange-500 uppercase tracking-wider"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.2] mb-4 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-[16px] sm:text-[18px] text-slate-500 leading-relaxed max-w-3xl mb-6 animate-fade-in"
            style={{ animationDelay: "150ms" }}
          >
            {excerpt}
          </p>
        )}

        {/* Meta row: Author, Date, Reading Time */}
        <div
          className="flex flex-wrap items-center gap-5 text-[14px] text-slate-500 mb-8 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          {author && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                <User size={16} />
              </div>
              <span className="font-medium text-navy">{author.name}</span>
            </div>
          )}

          {publishedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-slate-400" />
              <time dateTime={publishedAt ?? undefined}>{publishedDate}</time>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-slate-400" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div
          className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 animate-fade-in"
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
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
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
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
