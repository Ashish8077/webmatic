"use client";

import { use } from "react";
import { WorkProjectForm } from "@/features/work/components";
import { useWorkProject } from "@/features/work/hooks/use-work-project";
import { useUpdateWorkProject } from "@/features/work/hooks/use-update-work-project";
import { useWorkProjectForm } from "@/features/work/hooks/use-work-project-form";
import { getDirtyValues } from "@/features/work/utils/get-dirty-values";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";

export default function EditWorkProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const workProjectId = parseInt(id, 10);

  const { data, isLoading, isError } = useWorkProject(workProjectId, !isNaN(workProjectId));
  const updateMutation = useUpdateWorkProject();

  const form = useWorkProjectForm(data?.data);

  if (isError || isNaN(workProjectId)) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground mt-3">Loading workProject...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Edit WorkProject</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update the details of your workProject
        </p>
      </div>

      <WorkProjectForm
        form={form}
        onSubmit={async (formData) => {
          try {
            const dirtyFields = form.formState.dirtyFields;
            const changedData = getDirtyValues(
              dirtyFields as Record<string, unknown>,
              formData,
            );

            await updateMutation.mutateAsync({
              id: workProjectId,
              data: changedData,
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
