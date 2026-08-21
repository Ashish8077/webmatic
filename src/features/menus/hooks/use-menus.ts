import { useQuery } from "@tanstack/react-query";
import { getMenus } from "../api/get-menus";

export function useMenus() {
  return useQuery({
    queryKey: ["menus"],
    queryFn: () => getMenus(),
  });
}
