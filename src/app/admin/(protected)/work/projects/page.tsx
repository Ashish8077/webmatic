"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { 
  WorkProjectListTable, 
  WorkProjectListFilters, 
  WorkProjectListPagination 
} from "@/features/work/components";
import { useWorkProjects } from "@/features/work/hooks/use-work-projects";
import { useWorkProjectFilters } from "@/features/work/hooks/use-work-project-filters";
import { useDeleteWorkProject } from "@/features/work/hooks/use-delete-work-project";
import { useUpdateWorkProject } from "@/features/work/hooks/use-update-work-project";
import type { WorkProjectListItem } from "@/features/work/types/work-project.types";

export default function WorkProjectsPage() {
  const {
    query,
    updateSearch,
    updateStatus,
    updateSort,
    updatePagination,
  } = useWorkProjectFilters();

  const [workProjectToDelete, setWorkProjectToDelete] = useState<WorkProjectListItem | null>(null);

  const { data, isLoading } = useWorkProjects(query);

  const deleteMutation = useDeleteWorkProject();
  const updateMutation = useUpdateWorkProject();

  const handleToggleStatus = (workProject: WorkProjectListItem) => {
    updateMutation.mutate({
      id: workProject.id,
      data: {
        status: workProject.status === "published" ? "draft" : "published",
      },
    });
  };

  const handleToggleFeatured = (workProject: WorkProjectListItem) => {
    updateMutation.mutate({
      id: workProject.id,
      data: {
        isFeatured: !workProject.isFeatured,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">WorkProjects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your offerings and workProjects
          </p>
        </div>
        <Link href="/admin/work/projects/create">
          <Button className="w-full sm:w-auto gap-2">
            <Plus size={16} strokeWidth={2} />
            Create WorkProject
          </Button>
        </Link>
      </div>

      <WorkProjectListFilters
        query={query}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onSortChange={updateSort}
      />

      <WorkProjectListTable
        workProjects={data?.data?.items || []}
        isLoading={isLoading}
        onDelete={setWorkProjectToDelete}
        onToggleStatus={handleToggleStatus}
        onToggleFeatured={handleToggleFeatured}
      />

      {data?.data?.pagination && (
        <WorkProjectListPagination
          pagination={data.data.pagination}
          onPaginationChange={updatePagination}
        />
      )}

      <ConfirmDialog
        isOpen={!!workProjectToDelete}
        onClose={() => setWorkProjectToDelete(null)}
        onConfirm={() => {
          if (workProjectToDelete) {
            deleteMutation.mutate(workProjectToDelete.id);
            setWorkProjectToDelete(null);
          }
        }}
        title="Delete WorkProject"
        message={`Are you sure you want to delete "${workProjectToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete WorkProject"
        variant="danger"
      />
    </div>
  );
}
