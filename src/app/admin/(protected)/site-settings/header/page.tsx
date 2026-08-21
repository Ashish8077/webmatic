"use client";

import { useEffect } from "react";
import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HeaderSettings } from "@/modules/site-settings/types/header.types";
import { headerSettingsSchema } from "@/modules/site-settings/schemas/header.schema";
import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/responses";
import { HeaderSettingsForm } from "@/features/site-settings/header/header-settings-form";

export default function HeaderSettingsPage() {
  const queryClient = useQueryClient();

  const { data: headerSettings, isLoading } = useQuery({
    queryKey: ["site-settings", "header"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<HeaderSettings>>("/admin/site-settings/header");
      return res.data.data;
    },
  });

  const form = useForm<HeaderSettings>({
    resolver: zodResolver(headerSettingsSchema) as unknown as Resolver<HeaderSettings>,
    defaultValues: {
      logo: { imageId: null, altText: "" },
      contactInfo: { phone: { number: "" }, email: { address: "" } },
      socialLinks: [],
      cta: { label: "", destinationType: "page", referenceId: null, url: "" },
      visibility: { topBar: true, phone: true, email: true, social: true },
    } as unknown as HeaderSettings,
  });

  // Reset form when data is loaded
  useEffect(() => {
    if (headerSettings) {
      form.reset(headerSettings);
    }
  }, [headerSettings, form]);

  const mutation = useMutation({
    mutationFn: async (data: HeaderSettings) => {
      await apiClient.put("/admin/site-settings/header", data);
    },
    onSuccess: () => {
      toast.success("Header settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["site-settings", "header"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update header settings");
    },
  });

  const onSubmit = (data: HeaderSettings) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between items-center bg-card p-4 rounded-lg border shadow-sm mb-6">
            <div>
              <h2 className="text-lg font-semibold">Header Configuration</h2>
              <p className="text-sm text-muted-foreground">Manage global header content and links.</p>
            </div>
            <button
              type="submit"
              disabled={mutation.isPending || !form.formState.isDirty}
              className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <HeaderSettingsForm disabled={mutation.isPending} />
        </form>
      </FormProvider>
    </div>
  );
}
