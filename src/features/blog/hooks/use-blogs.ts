import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/get-blogs";
import type { BlogQuery } from "../types/blog-query";

export function useBlogs(params: BlogQuery) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogs(params),
    staleTime: 60 * 1000, 
    gcTime: 5 * 60 * 1000,  
    placeholderData: (previousData) => previousData,
  });
}
