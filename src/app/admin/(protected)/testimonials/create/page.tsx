"use client";

import { TestimonialForm } from "@/features/testimonials/components";
import { useCreateTestimonial } from "@/features/testimonials/hooks/use-create-testimonial";
import { useTestimonialForm } from "@/features/testimonials/hooks/use-testimonial-form";
import { ApiError } from "@/lib/api/errors";
import { applyServerErrors } from "@/shared/utils/form/apply-server-errors";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateTestimonialPage() {
  const createMutation = useCreateTestimonial();
  const form = useTestimonialForm();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Testimonial</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add a new client testimonial or review
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
        onSubmit={async (data) => {
          try {
            await createMutation.mutateAsync(data);
          } catch (error) {
            if (error instanceof ApiError) {
              applyServerErrors(form, error.errors);
            }
          }
        }}
        submitLabel="Create Testimonial"
      />
    </div>
  );
}
