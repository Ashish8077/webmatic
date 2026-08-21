import { apiClient } from "@/lib/api";
import type { UserFormValues } from "../schemas/user-form.schema";

export async function updateUser({ id, data }: { id: number; data: UserFormValues }) {
  const response = await apiClient.patch(`/admin/users/${id}`, data);
  return response.data;
}
