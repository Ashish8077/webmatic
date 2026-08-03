import { apiClient } from "@/lib/api";
import { Menu } from "@/modules/menus/types/menu.types";

export async function getMenus(): Promise<{ data: Menu[], message: string }> {
  const response = await apiClient.get<{ data: Menu[], message: string }>("/admin/menus");
  return response.data;
}
