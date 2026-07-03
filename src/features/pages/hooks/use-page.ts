import { useQuery } from "@tanstack/react-query";
import { getPage } from "../api/get-page";

export function usePage(id: number) {
  return useQuery({
    queryKey: ["page", id],
    queryFn: () => getPage(id),
    enabled: id > 0,
  });
}
