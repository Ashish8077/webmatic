import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/shared/hooks/use-debounce";

type TagListFiltersProps = {
  query: { search?: string };
  onSearchChange: (search: string) => void;
};

export function TagListFilters({
  query,
  onSearchChange,
}: TagListFiltersProps) {
  const [localSearch, setLocalSearch] = useState(query.search || "");
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    const trimmedLocal = debouncedSearch.trim();
    const currentQuerySearch = query.search || "";
    if (trimmedLocal !== currentQuerySearch) {
      onSearchChange(trimmedLocal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Search tags..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
