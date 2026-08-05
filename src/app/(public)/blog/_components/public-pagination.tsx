import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PublicPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. "/blog"
}

export function PublicPagination({
  currentPage,
  totalPages,
  basePath,
}: PublicPaginationProps) {
  if (totalPages <= 1) return null;

  // Ensure valid page range
  const current = Math.max(1, Math.min(currentPage, totalPages));

  // Determine pages to show
  // We'll show a small window of pages around the current page
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-between lg:justify-center gap-2 mt-12 mb-8" aria-label="Pagination">
      <Link
        href={current > 1 ? `${basePath}?page=${current - 1}` : "#"}
        className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          current > 1
            ? "bg-slate-100 text-navy hover:bg-slate-200"
            : "bg-slate-50 text-slate-300 pointer-events-none"
        }`}
        aria-disabled={current <= 1}
      >
        <span className="sr-only">Previous Page</span>
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
              page === current
                ? "bg-primary text-white shadow-sm shadow-primary/20"
                : "bg-slate-100 text-navy hover:bg-slate-200"
            }`}
            aria-current={page === current ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={current < totalPages ? `${basePath}?page=${current + 1}` : "#"}
        className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          current < totalPages
            ? "bg-slate-100 text-navy hover:bg-slate-200"
            : "bg-slate-50 text-slate-300 pointer-events-none"
        }`}
        aria-disabled={current >= totalPages}
      >
        <span className="sr-only">Next Page</span>
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
}
