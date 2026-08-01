import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { GetLeadsQuerySchemaData } from "@/modules/leads/validation/admin-lead.schema";
import { LEAD_STATUS } from "@/modules/leads/constants/lead.constants";

export function useLeadsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract values from URL
  const query = useMemo<GetLeadsQuerySchemaData>(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      search: searchParams.get("search") || undefined,
      status: (searchParams.get("status") as any) || undefined,
      assignedTo: searchParams.get("assignedTo") ? Number(searchParams.get("assignedTo")) : undefined,
      sortBy: (searchParams.get("sortBy") as any) || "created_at",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
      fromDate: searchParams.get("fromDate") || undefined,
      toDate: searchParams.get("toDate") || undefined,
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (newFilters: Partial<GetLeadsQuerySchemaData>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update params
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      // If search or status changes, reset page to 1
      if ("search" in newFilters || "status" in newFilters || "assignedTo" in newFilters || "fromDate" in newFilters || "toDate" in newFilters) {
        if (params.has("page")) {
          params.set("page", "1");
        }
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return { query, updateFilters };
}
