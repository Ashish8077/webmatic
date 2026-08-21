import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../api/get-menu";

export function useMenu(id: number) {
  return useQuery({
    queryKey: ["menus", id],
    queryFn: () => getMenu(id),
    enabled: !!id,
  });
}
