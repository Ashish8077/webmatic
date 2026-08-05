import { useQuery } from "@tanstack/react-query";
import { getTags } from "../api/get-tags";
import { GetTagsQuery } from "@/modules/blogs/validation/get-tags-query.schema";

export function useTags(query?: Partial<GetTagsQuery>) {
  return useQuery({
    queryKey: ["blog-tags", query],
    queryFn: () => getTags(query),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
