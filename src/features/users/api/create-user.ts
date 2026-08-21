import { apiClient } from "@/lib/api";
import type { UserFormValues } from "../schemas/user-form.schema";

export async function createUser(data: UserFormValues) {
  const response = await apiClient.post("/admin/users", data);
  return response.data;
}
