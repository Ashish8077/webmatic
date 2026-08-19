"use client";

import { WorkProjectForm } from "@/features/work/components";
import { useCreateWorkProject } from "@/features/work/hooks/use-create-work-project";
import { useWorkProjectForm } from "@/features/work/hooks/use-work-project-form";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";

export default function CreateWorkProjectPage() {
  const createMutation = useCreateWorkProject();
  const form = useWorkProjectForm();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create WorkProject</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add a new workProject offering to your catalog
        </p>
      </div>

      <WorkProjectForm
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
        submitLabel="Create WorkProject"
      />
    </div>
  );
}
