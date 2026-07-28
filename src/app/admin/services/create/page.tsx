"use client";

import { ServiceForm } from "@/features/services/components";
import { useCreateService } from "@/features/services/hooks/use-create-service";
import { useServiceForm } from "@/features/services/hooks/use-service-form";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";

export default function CreateServicePage() {
  const createMutation = useCreateService();
  const form = useServiceForm();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create Service</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add a new service offering to your catalog
        </p>
      </div>

      <ServiceForm
        form={form}
        onSubmit={async (data) => {
          try {
            await createMutation.mutateAsync(data);
          } catch (error) {
            if (error instanceof ApiError) {
              applyServerErrors(form, error.errors);
            }
          }
        }}
        submitLabel="Create Service"
      />
    </div>
  );
}
