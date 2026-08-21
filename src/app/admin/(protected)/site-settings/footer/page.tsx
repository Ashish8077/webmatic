"use client";

import { useEffect } from "react";
import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FooterSettings } from "@/modules/site-settings/types/footer.types";
import { footerSettingsSchema } from "@/modules/site-settings/schemas/footer.schema";
import { apiClient } from "@/lib/api/client";
import { FooterSettingsForm } from "@/features/site-settings/footer/footer-settings-form";

export default function FooterSettingsPage() {
  const queryClient = useQueryClient();

  const { data: footerSettings, isLoading } = useQuery({
    queryKey: ["site-settings", "footer"],
    queryFn: async () => {
      const res = await apiClient.get<FooterSettings>("/admin/site-settings/footer");
      return res.data;
    },
  });

  const form = useForm<FooterSettings>({
    resolver: zodResolver(footerSettingsSchema) as unknown as Resolver<FooterSettings>,
    defaultValues: {
      heroCta: {},
      contactInfo: { phone: { phones: [] }, email: {} },
      socialLinks: [],
      copyright: {}
    } as unknown as FooterSettings,
  });

  // Reset form when data is loaded
  useEffect(() => {
    if (footerSettings) {
      form.reset(footerSettings);
    }
  }, [footerSettings, form]);

  const mutation = useMutation({
    mutationFn: async (data: FooterSettings) => {
      await apiClient.put("/admin/site-settings/footer", data);
    },
    onSuccess: () => {
      toast.success("Footer settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["site-settings", "footer"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update footer settings");
    },
  });

  const onSubmit = (data: FooterSettings) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between items-center bg-card p-4 rounded-lg border shadow-sm sticky top-4 z-10">
            <div>
              <h2 className="text-lg font-semibold">Footer Configuration</h2>
              <p className="text-sm text-muted-foreground">Manage global footer content and links.</p>
            </div>
            <button
              type="submit"
              disabled={mutation.isPending || !form.formState.isDirty}
              className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <FooterSettingsForm disabled={mutation.isPending} />
        </form>
      </FormProvider>
    </div>
  );
}
