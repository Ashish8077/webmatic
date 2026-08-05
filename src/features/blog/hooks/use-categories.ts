import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/get-categories";
import { GetCategoriesQuery } from "@/modules/blogs/validation/get-categories-query.schema";

export function useCategories(query?: Partial<GetCategoriesQuery>) {
  return useQuery({
    queryKey: ["blog-categories", query],
    queryFn: () => getCategories(query),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
