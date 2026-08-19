"use client";

import { useEffect } from "react";
import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContactSettings } from "@/modules/site-settings/schemas/contact.schema";
import { contactSettingsSchema, defaultContactSettings } from "@/modules/site-settings/schemas/contact.schema";
import { apiClient } from "@/lib/api/client";
import { ContactSettingsForm } from "@/features/site-settings/contact/contact-settings-form";

export default function ContactSettingsPage() {
  const queryClient = useQueryClient();

  const { data: contactSettings, isLoading } = useQuery({
    queryKey: ["site-settings", "contact"],
    queryFn: async () => {
      const res = await apiClient.get<ContactSettings>("/admin/site-settings/contact");
      return res.data;
    },
  });

  const form = useForm<ContactSettings>({
    resolver: zodResolver(contactSettingsSchema) as unknown as Resolver<ContactSettings>,
    defaultValues: defaultContactSettings,
  });

  // Reset form when data is loaded
  useEffect(() => {
    if (contactSettings) {
      form.reset(contactSettings);
    }
  }, [contactSettings, form]);

  const mutation = useMutation({
    mutationFn: async (data: ContactSettings) => {
      await apiClient.put("/admin/site-settings/contact", data);
    },
    onSuccess: () => {
      toast.success("Contact settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["site-settings", "contact"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update contact settings");
    },
  });

  const onSubmit = (data: ContactSettings) => {
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
              <h2 className="text-lg font-semibold">Contact Configuration</h2>
              <p className="text-sm text-muted-foreground">Manage global contact form settings and map.</p>
            </div>
            <button
              type="submit"
              disabled={mutation.isPending || !form.formState.isDirty}
              className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <ContactSettingsForm disabled={mutation.isPending} />
        </form>
      </FormProvider>
    </div>
  );
}
