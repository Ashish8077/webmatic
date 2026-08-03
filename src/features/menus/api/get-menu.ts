import { apiClient } from "@/lib/api";
import { Menu, MenuItem } from "@/modules/menus/types/menu.types";

export interface GetMenuResponse {
  data: {
    menu: Menu;
    items: MenuItem[];
  };
  message: string;
}

export async function getMenu(id: number): Promise<GetMenuResponse> {
  const response = await apiClient.get<GetMenuResponse>(`/admin/menus/${id}`);
  return response.data;
}
