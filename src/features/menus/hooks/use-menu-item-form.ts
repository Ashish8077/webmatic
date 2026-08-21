import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { MenuItem } from "@/modules/menus/types/menu.types";
import { menuItemFormSchema, MenuItemFormValues } from "../schemas/menu-item-form.schema";
import { toMenuItemFormValues } from "../utils/menu-item-mappers";

export function useMenuItemForm(
  initialData?: MenuItem,
  defaultParentId: number | null = null
): UseFormReturn<MenuItemFormValues> {
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemFormSchema) as unknown as Resolver<MenuItemFormValues>,
    defaultValues: toMenuItemFormValues(initialData, defaultParentId),
  });

  useEffect(() => {
    form.reset(toMenuItemFormValues(initialData, defaultParentId));
  }, [initialData, defaultParentId, form]);

  return form;
}
