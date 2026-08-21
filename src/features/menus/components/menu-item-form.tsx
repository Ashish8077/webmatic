"use client";

import { useQuery } from "@tanstack/react-query";
import { FormProvider, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

import { MenuItem } from "@/modules/menus/types/menu.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { showToast } from "@/components/ui/toast";

import { useMenuItemForm } from "../hooks/use-menu-item-form";
import { useCreateMenuItem, useUpdateMenuItem } from "../hooks/use-menu-mutations";
import { toCreateMenuItemPayload } from "../utils/menu-item-mappers";
import { ReferenceTargetSelector } from "./reference-target-selector";
import { DESTINATION_TYPES, MenuItemFormValues } from "../schemas/menu-item-form.schema";

interface MenuItemFormProps {
  menuId: number;
  initialData?: MenuItem;
  onSuccess: () => void;
  onCancel: () => void;
  defaultParentId?: number | null;
}

export function MenuItemForm({ menuId, initialData, onSuccess, onCancel, defaultParentId = null }: MenuItemFormProps) {
  const router = useRouter();
  const form = useMenuItemForm(initialData, defaultParentId);
  const destinationType = form.watch("destinationType");

  const createMutation = useCreateMenuItem(menuId);
  const updateMutation = useUpdateMenuItem(menuId, initialData?.id ?? 0);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Fetch menu items for this menu to populate the "Parent Menu" dropdown
  const { data: menuItemsData } = useQuery({
    queryKey: ["menu-items", menuId],
    queryFn: async () => {
      const res = await apiClient.get<{ data: { items: MenuItem[] } }>(`/admin/menus/${menuId}`);
      return res.data.data.items;
    },
  });

  const availableParents = (menuItemsData || [])
    .filter((item) => {
      if (initialData && item.id === initialData.id) return false;
      if (initialData) {
        let isDescendant = false;
        let curr: number | null = item.parentId;
        while (curr) {
          if (curr === initialData.id) {
            isDescendant = true;
            break;
          }
          const parent = menuItemsData?.find((i) => i.id === curr);
          curr = parent?.parentId || null;
        }
        if (isDescendant) return false;
      }
      return true;
    })
    .map((item) => ({ value: String(item.id), label: item.title }));

  const handleSubmit = async (data: MenuItemFormValues) => {
    try {
      const payload = toCreateMenuItemPayload(menuId, data);

      if (initialData) {
        await updateMutation.mutateAsync(payload);
      } else {
        await createMutation.mutateAsync(payload);
      }
      
      showToast(`Item ${initialData ? "updated" : "created"} successfully`, "success");
      onSuccess();
      router.refresh();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { errors?: Record<string, unknown> } } };
      if (apiError.response?.data?.errors) {
        for (const [key, messages] of Object.entries(apiError.response.data.errors)) {
          const mappedKey = key === "referenceId" ? "destinationId" 
                          : key === "url" ? "destinationUrl" 
                          : key === "targetType" ? "destinationType" 
                          : key as keyof MenuItemFormValues;
          form.setError(mappedKey, {
            type: "server",
            message: Array.isArray(messages) ? String(messages[0]) : String(messages)
          });
        }
      } else {
        showToast("An error occurred", "error");
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <Input 
            {...form.register("title")}
            label="Title"
            error={form.formState.errors.title?.message}
          />
        </div>

        <div>
          <Controller
            control={form.control}
            name="destinationType"
            render={({ field }) => (
              <Select
                label="Destination Type"
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.destinationType?.message}
                options={[
                  { label: "Page", value: "page" },
                  { label: "Service", value: "service" },
                  { label: "External URL", value: "external" },
                  { label: "Group (Submenu Parent)", value: "group" },
                  { label: "Separator", value: "separator" },
                  { label: "Heading", value: "heading" },
                ]}
              />
            )}
          />
        </div>

        {(destinationType === "page" || destinationType === "service") && (
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1 capitalize">Target {destinationType}</label>
            <Controller
              control={form.control}
              name="destinationId"
              render={({ field }) => (
                <ReferenceTargetSelector
                  type={destinationType as "page" | "service"}
                  value={field.value ?? null}
                  onChange={field.onChange}
                  error={form.formState.errors.destinationId?.message}
                />
              )}
            />
          </div>
        )}

        {destinationType === "external" && (
          <div>
            <Input 
              {...form.register("destinationUrl")}
              label="URL"
              placeholder="https://"
              error={form.formState.errors.destinationUrl?.message}
            />
          </div>
        )}

        <div>
          <Controller
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <Select
                label="Parent Menu"
                value={field.value ? String(field.value) : ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                disabled={defaultParentId !== null && defaultParentId !== undefined}
                error={form.formState.errors.parentId?.message}
                options={[
                  { label: "None — Top Level", value: "" },
                  ...availableParents,
                ]}
              />
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <input 
                type="checkbox" 
                id="isActive"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <label htmlFor="isActive" className="text-sm font-medium text-foreground">Active</label>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>Save Item</Button>
        </div>
      </form>
    </FormProvider>
  );
}
