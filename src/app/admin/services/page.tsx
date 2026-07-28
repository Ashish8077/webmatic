"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { 
  ServiceListTable, 
  ServiceListFilters, 
  ServiceListPagination 
} from "@/features/services/components";
import { useServices } from "@/features/services/hooks/use-services";
import { useServiceFilters } from "@/features/services/hooks/use-service-filters";
import { useDeleteService } from "@/features/services/hooks/use-delete-service";
import { useUpdateService } from "@/features/services/hooks/use-update-service";
import type { ServiceListItem } from "@/features/services/types/service.types";

export default function ServicesPage() {
  const {
    query,
    updateSearch,
    updateStatus,
    updateSort,
    updatePagination,
  } = useServiceFilters();

  const [serviceToDelete, setServiceToDelete] = useState<ServiceListItem | null>(null);

  const { data, isLoading } = useServices(query);

  const deleteMutation = useDeleteService();
  const updateMutation = useUpdateService();

  const handleToggleStatus = (service: ServiceListItem) => {
    updateMutation.mutate({
      id: service.id,
      data: {
        status: service.status === "published" ? "draft" : "published",
      },
    });
  };

  const handleToggleFeatured = (service: ServiceListItem) => {
    updateMutation.mutate({
      id: service.id,
      data: {
        isFeatured: !service.isFeatured,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your offerings and services
          </p>
        </div>
        <Link href="/admin/services/create">
          <Button className="w-full sm:w-auto gap-2">
            <Plus size={16} strokeWidth={2} />
            Create Service
          </Button>
        </Link>
      </div>

      <ServiceListFilters
        query={query}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onSortChange={updateSort}
      />

      <ServiceListTable
        services={data?.data?.items || []}
        isLoading={isLoading}
        onDelete={setServiceToDelete}
        onToggleStatus={handleToggleStatus}
        onToggleFeatured={handleToggleFeatured}
      />

      {data?.data?.pagination && (
        <ServiceListPagination
          pagination={data.data.pagination}
          onPaginationChange={updatePagination}
        />
      )}

      <ConfirmDialog
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={() => {
          if (serviceToDelete) {
            deleteMutation.mutate(serviceToDelete.id);
            setServiceToDelete(null);
          }
        }}
        title="Delete Service"
        message={`Are you sure you want to delete "${serviceToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Service"
        variant="danger"
      />
    </div>
  );
}
