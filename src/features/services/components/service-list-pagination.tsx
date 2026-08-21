import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select } from "@/components/ui/select";
import type { PaginationMeta } from "@/shared/types/pagination";

type ServiceListPaginationProps = {
  pagination: PaginationMeta;
  onPaginationChange: (page: number, limit?: number) => void;
};

export function ServiceListPagination({
  pagination,
  onPaginationChange,
}: ServiceListPaginationProps) {
  const { page: currentPage, totalPages, totalItems, limit: pageSize } = pagination;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPaginationChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPaginationChange(currentPage + 1);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    // Reset to page 1 when changing items per page to prevent empty states
    onPaginationChange(1, newLimit);
  };

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        {totalItems > 0 ? (
          <>
            Showing <span className="font-medium text-foreground">{startRecord}</span> to{" "}
            <span className="font-medium text-foreground">{endRecord}</span> of{" "}
            <span className="font-medium text-foreground">{totalItems}</span> results
          </>
        ) : (
          <span>No results found</span>
        )}
      </div>

      <div className="flex items-center gap-4 order-1 sm:order-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page:</span>
          <div className="w-30">
            <Select
              options={[
                { label: "10", value: "10" },
                { label: "20", value: "20" },
                { label: "50", value: "50" },
                { label: "100", value: "100" },
              ]}
              value={pageSize.toString()}
              onChange={handleLimitChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md border border-card-border bg-card-bg text-muted-foreground hover:text-foreground hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="text-sm font-medium px-2 text-foreground">
            {currentPage} / {totalPages || 1}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 rounded-md border border-card-border bg-card-bg text-muted-foreground hover:text-foreground hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
