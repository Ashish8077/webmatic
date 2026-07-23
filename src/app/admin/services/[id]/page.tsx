"use client";

import { use } from "react";
import { ServiceForm } from "@/features/services/components";
import { useService } from "@/features/services/hooks/use-service";
import { useUpdateService } from "@/features/services/hooks/use-update-service";
import { useServiceForm } from "@/features/services/hooks/use-service-form";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const serviceId = parseInt(id, 10);

  const { data, isLoading, isError } = useService(serviceId, !isNaN(serviceId));
  const updateMutation = useUpdateService();
  
  const form = useServiceForm(data?.data);

  if (isError || isNaN(serviceId)) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground mt-3">Loading service...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Edit Service</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update the details of your service
        </p>
      </div>

      <ServiceForm
        form={form}
        onSubmit={async (formData) => {
          try {
            await updateMutation.mutateAsync({
              id: serviceId,
              data: formData,
            });
          } catch (error) {
            if (error instanceof ApiError) {
              applyServerErrors(form, error.errors);
            }
          }
        }}
        submitLabel="Save Changes"
      />
    </div>
  );
}
