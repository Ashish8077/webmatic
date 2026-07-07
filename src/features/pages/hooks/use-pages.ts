// features/pages/hooks/usePages.ts

import { useQuery } from "@tanstack/react-query";
import { getPages } from "../api/get-pages";
import type { PageQuery } from "../types/page-query";

export function usePages(params: PageQuery) {
  return useQuery({
    queryKey: ["pages", params],
    queryFn: () => getPages(params),
    staleTime: 60 * 1000, 
    gcTime: 5 * 60 * 1000,  
    placeholderData: (previousData) => previousData,
  });
}
