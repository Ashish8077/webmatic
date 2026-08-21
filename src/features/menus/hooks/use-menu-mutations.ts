import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { CreateMenuItemDTO } from "@/modules/menus/schemas/create-menu-item.schema";

export function useCreateMenuItem(menuId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMenuItemDTO) => {
      const response = await apiClient.post("/admin/menu-items", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus", menuId] });
      queryClient.invalidateQueries({ queryKey: ["menu-items", menuId] });
    },
  });
}

export function useUpdateMenuItem(menuId: number, itemId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CreateMenuItemDTO>) => {
      const response = await apiClient.put(`/admin/menu-items/${itemId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus", menuId] });
      queryClient.invalidateQueries({ queryKey: ["menu-items", menuId] });
    },
  });
}
