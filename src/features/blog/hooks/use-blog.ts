import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../api/get-blog";

export function useBlog(id: number) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
    enabled: id > 0,
  });
}
