"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TestimonialListTable } from "@/features/testimonials/components";
import { TestimonialListFilters } from "@/features/testimonials/components/testimonial-list-filters";
import { TestimonialListPagination } from "@/features/testimonials/components/testimonial-list-pagination";
import { useTestimonialFilters } from "@/features/testimonials/hooks/use-testimonial-filters";
import { useTestimonials } from "@/features/testimonials/hooks/use-testimonials";
import { useDeleteTestimonial } from "@/features/testimonials/hooks/use-delete-testimonial";
import { useUpdateTestimonial } from "@/features/testimonials/hooks/use-update-testimonial";
import type { TestimonialListItem } from "@/features/testimonials/types/testimonial.types";
import { useState } from "react";

export default function TestimonialsPage() {
  const { query, updateSearch, updateStatus, updateSort, updatePagination } = useTestimonialFilters();
  const [testimonialToDelete, setTestimonialToDelete] = useState<TestimonialListItem | null>(null);

  const { data, isLoading } = useTestimonials(query);

  const deleteMutation = useDeleteTestimonial();
  const updateMutation = useUpdateTestimonial();

  const handleToggleStatus = (testimonial: TestimonialListItem) => {
    updateMutation.mutate({
      id: testimonial.id,
      data: {
        status: testimonial.status === "published" ? "draft" : "published",
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage client testimonials and reviews
          </p>
        </div>
        <Link href="/admin/testimonials/create">
          <Button className="w-full sm:w-auto gap-2">
            <Plus size={16} strokeWidth={2} />
            Create Testimonial
          </Button>
        </Link>
      </div>

      <TestimonialListFilters
        query={query}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onSortChange={updateSort}
      />

      <TestimonialListTable
        testimonials={data?.data?.items || []}
        isLoading={isLoading}
        onDelete={setTestimonialToDelete}
        onToggleStatus={handleToggleStatus}
      />

      {data?.data?.pagination && (
        <TestimonialListPagination
          pagination={data.data.pagination}
          onPaginationChange={updatePagination}
        />
      )}

      <ConfirmDialog
        isOpen={!!testimonialToDelete}
        onClose={() => setTestimonialToDelete(null)}
        onConfirm={() => {
          if (testimonialToDelete) {
            deleteMutation.mutate(testimonialToDelete.id);
            setTestimonialToDelete(null);
          }
        }}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial by "${testimonialToDelete?.clientName}"? This action cannot be undone.`}
        confirmText="Delete Testimonial"
        variant="danger"
      />
    </div>
  );
}
