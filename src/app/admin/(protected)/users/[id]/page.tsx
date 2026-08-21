"use client";

import UserForm from "@/features/users/components/user-form";
import { useUser } from "@/features/users/hooks/use-user";
import { useUpdateUser } from "@/features/users/hooks/use-update-user";
import { useUserForm } from "@/features/users/hooks/use-user-form";
import { UserFormValues } from "@/features/users/schemas/user-form.schema";
import { useParams } from "next/navigation";

export default function EditUserPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  
  const { data, isLoading: isLoadingUser } = useUser(id);
  const updateUser = useUpdateUser();

  const initialData: UserFormValues | undefined = data?.data ? {
    firstName: data.data.firstName,
    lastName: data.data.lastName,
    email: data.data.email,
    status: data.data.status as "active" | "inactive" | "suspended",
    roleId: data.data.roleId ?? (undefined as unknown as number),
    password: "", // empty so it won't be updated unless provided
  } : undefined;

  const form = useUserForm(initialData);

  const handleSubmit = async (formData: UserFormValues) => {
    await updateUser.mutateAsync({ id, data: formData });
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-semibold">User not found</h2>
        <p className="text-muted-foreground mt-2">
          The user you are trying to edit does not exist.
        </p>
      </div>
    );
  }

  return (
    <UserForm 
      form={form}
      onSubmit={handleSubmit} 
      isLoading={updateUser.isPending} 
      isEdit={true}
    />
  );
}
