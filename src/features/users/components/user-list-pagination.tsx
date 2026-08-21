import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { UserListResult } from "@/modules/users/types/user.types";

interface UserListPaginationProps {
  pagination: UserListResult["pagination"] | undefined;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function UserListPagination({
  pagination,
  onPageChange,
  isLoading,
}: UserListPaginationProps) {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {Math.min(
            (pagination.page - 1) * pagination.limit + 1,
            pagination.totalItems
          )}
        </span>{" "}
        to{" "}
        <span className="font-medium text-foreground">
          {Math.min(pagination.page * pagination.limit, pagination.totalItems)}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">
          {pagination.totalItems}
        </span>{" "}
        results
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!pagination.hasPreviousPage || isLoading}
          className="p-2 rounded-xl border border-card-border bg-card-bg text-muted-foreground hover:text-foreground hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === pagination.totalPages ||
                Math.abs(page - pagination.page) <= 1
            )
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2 text-muted-foreground">...</span>
                )}
                <button
                  onClick={() => onPageChange(page)}
                  disabled={isLoading}
                  className={`min-w-8 h-8 text-sm font-medium rounded-lg transition-all ${
                    pagination.page === page
                      ? "bg-accent text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}
        </div>

        <button
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNextPage || isLoading}
          className="p-2 rounded-xl border border-card-border bg-card-bg text-muted-foreground hover:text-foreground hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
