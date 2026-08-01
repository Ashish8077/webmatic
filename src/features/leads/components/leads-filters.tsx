import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Search, X } from "lucide-react";
import { useLeadsFilters } from "../hooks/use-leads-filters";
import { useExportLeads } from "../hooks/use-export-leads";

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in_progress" },
  { label: "Contacted", value: "contacted" },
  { label: "Closed", value: "closed" },
  { label: "Spam", value: "spam" },
];

export function LeadsFilters() {
  const { query, updateFilters } = useLeadsFilters();
  const { exportLeads, isExporting } = useExportLeads();
  
  // Local state for debounced search
  const [localSearch, setLocalSearch] = useState(query.search || "");

  useEffect(() => {
    setLocalSearch(query.search || "");
  }, [query.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== (query.search || "")) {
        updateFilters({ search: localSearch });
      }
    }, 400); // 300-400ms as requested
    return () => clearTimeout(timer);
  }, [localSearch, query.search, updateFilters]);

  const handleExport = () => {
    const { page, limit, ...exportParams } = query;
    exportLeads(exportParams);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-1">
        <div className="relative w-full max-w-xs">
          <Input
            placeholder="Search leads..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          {localSearch && (
            <button
              onClick={() => setLocalSearch("")}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="w-full sm:w-48">
          <Select
            options={STATUS_OPTIONS}
            value={query.status || ""}
            onChange={(e) => updateFilters({ status: e.target.value as any })}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="secondary" 
          onClick={handleExport}
          disabled={isExporting}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          {isExporting ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export CSV
        </Button>
      </div>
    </div>
  );
}
