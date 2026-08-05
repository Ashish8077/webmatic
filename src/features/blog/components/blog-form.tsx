"use client";

import { useRouter } from "next/navigation";
import { Controller, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";

import { useBlogForm } from "@/features/blog/hooks/use-blog-form";
import SeoFields from "@/components/shared/seo/seo-fields";
import type { CreateBlogInput } from "@/features/blog/schemas/create-blog.schema";
import { RichTextEditor } from "@/components/shared/editor";
import { MediaPickerField } from "@/features/page-sections/components/fields";
import { Textarea } from "@/components/ui/textarea";

import { useCategories } from "@/features/blog/hooks/use-categories";
import { useTags } from "@/features/blog/hooks/use-tags";

const CategorySelector = ({ value = [], onChange }: { value: number[], onChange: (val: number[]) => void }) => {
  const { data, isLoading } = useCategories();
  
  if (isLoading) return <div className="text-sm text-muted-foreground p-3 border border-input-border rounded-lg bg-input-bg">Loading categories...</div>;
  if (!data?.data?.items?.length) return <div className="text-sm text-muted-foreground p-3 border border-input-border rounded-lg bg-input-bg">No categories found.</div>;
  
  return (
    <div className="max-h-48 overflow-y-auto border border-input-border rounded-lg p-3 space-y-2 bg-input-bg">
      {data.data.items.map((category: any) => (
        <div key={category.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`category-${category.id}`}
            className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
            checked={value.includes(category.id)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, category.id]);
              } else {
                onChange(value.filter(id => id !== category.id));
              }
            }}
          />
          <label htmlFor={`category-${category.id}`} className="text-sm text-foreground cursor-pointer select-none">
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

const TagSelector = ({ value = [], onChange }: { value: number[], onChange: (val: number[]) => void }) => {
  const { data, isLoading } = useTags();
  
  if (isLoading) return <div className="text-sm text-muted-foreground p-3 border border-input-border rounded-lg bg-input-bg">Loading tags...</div>;
  if (!data?.data?.items?.length) return <div className="text-sm text-muted-foreground p-3 border border-input-border rounded-lg bg-input-bg">No tags found.</div>;
  
  return (
    <div className="max-h-48 overflow-y-auto border border-input-border rounded-lg p-3 space-y-2 bg-input-bg">
      {data.data.items.map((tag: any) => (
        <div key={tag.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`tag-${tag.id}`}
            className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
            checked={value.includes(tag.id)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, tag.id]);
              } else {
                onChange(value.filter(id => id !== tag.id));
              }
            }}
          />
          <label htmlFor={`tag-${tag.id}`} className="text-sm text-foreground cursor-pointer select-none">
            {tag.name}
          </label>
        </div>
      ))}
    </div>
  );
};

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" as const },
  { label: "Published", value: "published" as const },
  { label: "Scheduled", value: "scheduled" as const },
];

interface BlogFormProps {
  form: ReturnType<typeof useBlogForm>;
  onSubmit: (data: CreateBlogInput) => Promise<void>;
  submitLabel?: string;
}

function BlogForm({
  form,
  onSubmit,
  submitLabel = "Create Blog",
}: BlogFormProps) {
  const router = useRouter();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Core Fields */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
        <Input
          label="Title"
          placeholder="Enter blog title"
          autoComplete="off"
          autoFocus
          {...form.register("title")}
          error={form.formState.errors.title?.message}
        />

        <Input
          label="Slug"
          placeholder="blog-url-slug"
          {...form.register("slug")}
          hint="URL path for this blog"
          error={form.formState.errors.slug?.message}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Excerpt</label>
          <Textarea
            placeholder="A short summary of the blog post..."
            {...form.register("excerpt")}
            error={form.formState.errors.excerpt?.message}
            rows={3}
          />
        </div>

        <Controller
          name="content"
          control={form.control}
          render={({ field }) => (
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Content</label>
              <RichTextEditor
                value={field.value ?? ""}
                onChange={field.onChange}
              />
              {form.formState.errors.content && (
                <p className="text-[13px] text-danger mt-1.5">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>
          )}
        />

        <div className="space-y-1.5">
          <MediaPickerField
            name="featuredImageId"
            label="Featured Image"
            description="Used as the main image for this blog post."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="categoryIds"
            control={form.control}
            render={({ field }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Categories</label>
                <CategorySelector value={field.value ?? []} onChange={field.onChange} />
                {form.formState.errors.categoryIds && (
                  <p className="text-[13px] text-danger mt-1.5">
                    {form.formState.errors.categoryIds.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="tagIds"
            control={form.control}
            render={({ field }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tags</label>
                <TagSelector value={field.value ?? []} onChange={field.onChange} />
                {form.formState.errors.tagIds && (
                  <p className="text-[13px] text-danger mt-1.5">
                    {form.formState.errors.tagIds.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <ToggleGroup
              label="Status"
              value={field.value}
              onChange={field.onChange}
              options={STATUS_OPTIONS}
              error={form.formState.errors.status?.message}
            />
          )}
        />

        <Controller
          name="isFeatured"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                checked={field.value}
                onChange={field.onChange}
              />
              <label htmlFor="isFeatured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Featured Post</label>
            </div>
          )}
        />
      </div>

      {/* SEO Section */}
      <SeoFields
        register={{
          seoTitle: form.register("seoTitle"),
          metaDescription: form.register("metaDescription"),
          canonicalUrl: form.register("canonicalUrl"),
          metaKeywords: form.register("metaKeywords"),
          ogTitle: form.register("ogTitle"),
          ogDescription: form.register("ogDescription"),
          twitterTitle: form.register("twitterTitle"),
          twitterDescription: form.register("twitterDescription"),
          robotsIndex: form.register("robotsIndex"),
          robotsFollow: form.register("robotsFollow"),
        }}
        errors={form.formState.errors}
        warnings={form.seoWarnings}
      />

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting || form.formState.isLoading}
        >
          {submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
    </FormProvider>
  );
}

export default BlogForm;
