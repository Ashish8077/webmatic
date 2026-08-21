import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormValues } from "../schemas/user-form.schema";
import { useEffect } from "react";

export function useUserForm(initialData?: Partial<UserFormValues>): UseFormReturn<UserFormValues> {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema) as unknown as Resolver<UserFormValues>,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      status: "active",
      roleId: "" as unknown as number, // force required selection
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        password: "", // password is not fetched or displayed
        status: initialData.status || "active",
        roleId: initialData.roleId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialData?.firstName,
    initialData?.lastName,
    initialData?.email,
    initialData?.status,
    initialData?.roleId,
    form,
  ]);

  return form;
}
