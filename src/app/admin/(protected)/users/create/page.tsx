"use client";

import UserForm from "@/features/users/components/user-form";
import { useCreateUser } from "@/features/users/hooks/use-create-user";
import { useUserForm } from "@/features/users/hooks/use-user-form";
import { UserFormValues } from "@/features/users/schemas/user-form.schema";

export default function CreateUserPage() {
  const createUser = useCreateUser();
  const form = useUserForm();

  const handleSubmit = async (data: UserFormValues) => {
    await createUser.mutateAsync(data);
  };

  return <UserForm form={form} onSubmit={handleSubmit} isLoading={createUser.isPending} />;
}
