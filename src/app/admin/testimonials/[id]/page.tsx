"use client";

import { use } from "react";
import { TestimonialForm } from "@/features/testimonials/components";
import { useTestimonial } from "@/features/testimonials/hooks/use-testimonial";
import { useUpdateTestimonial } from "@/features/testimonials/hooks/use-update-testimonial";
import { useTestimonialForm } from "@/features/testimonials/hooks/use-testimonial-form";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const testimonialId = parseInt(id, 10);

  const { data, isLoading, isError } = useTestimonial(testimonialId, { enabled: !isNaN(testimonialId) });
  const updateMutation = useUpdateTestimonial();
  
  const form = useTestimonialForm(data?.data);

  if (isError || isNaN(testimonialId)) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground mt-3">Loading testimonial...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Testimonial</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update the details of the testimonial
          </p>
        </div>
        <Link href="/admin/testimonials">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} />
            Back to List
          </Button>
        </Link>
      </div>

      <TestimonialForm
        form={form}
        onSubmit={async (formData) => {
          try {
            await updateMutation.mutateAsync({
              id: testimonialId,
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
