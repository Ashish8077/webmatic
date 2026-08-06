"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  CreateCategoryInput,
  createCategorySchema,
} from "@/features/blog/schemas/create-category.schema";

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryInput) => Promise<void>;
  defaultValues?: Partial<CreateCategoryInput>;
  submitLabel?: string;
  onCancel?: () => void;
}

export function CategoryForm({
  onSubmit,
  defaultValues,
  submitLabel = "Save Category",
  onCancel,
}: CategoryFormProps) {
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(
      createCategorySchema,
    ) as unknown as Resolver<CreateCategoryInput>,
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: CreateCategoryInput) => {
    try {
      await onSubmit(data);
      if (!defaultValues) {
        form.reset();
      }
    } catch (error: unknown) {
      const apiError = error as { status?: number };
      if (apiError?.status === 409) {
        form.setError("slug", {
          type: "manual",
          message: "This slug is already in use",
        });
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
      <Input
        label="Name"
        placeholder="Enter category name"
        autoFocus
        {...form.register("name")}
        error={form.formState.errors.name?.message}
      />

      <Input
        label="Slug"
        placeholder="category-slug"
        {...form.register("slug")}
        error={form.formState.errors.slug?.message}
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
        <Textarea
          placeholder="Category description..."
          {...form.register("description")}
          error={form.formState.errors.description?.message}
          rows={3}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting || form.formState.isLoading}
        >
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
