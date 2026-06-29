"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CreatePagePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSeo, setShowSeo] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    status: "draft" as "draft" | "published",
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    else if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(form.slug)) {
      e.slug = "Invalid slug format";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    showToast(`"${form.title}" created successfully`, "success");
    router.push("/pages");
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Pages
        </button>
        <h1 className="text-2xl font-bold text-foreground">Create Page</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add a new page to your website
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
          <Input
            label="Title"
            placeholder="Enter page title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            error={errors.title}
            autoFocus
          />

          <Input
            label="Slug"
            placeholder="page-url-slug"
            value={form.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
            error={errors.slug}
            hint="URL path for this page"
          />

          {/* Status toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <div className="flex gap-2">
              {(["draft", "published"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => update("status", status)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg border transition-all capitalize cursor-pointer
                    ${
                      form.status === status
                        ? status === "published"
                          ? "bg-success/12 text-success border-success/30"
                          : "bg-warning/12 text-warning border-warning/30"
                        : "bg-card-bg text-muted-foreground border-card-border hover:border-accent/20"
                    }
                  `}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSeo(!showSeo)}
            className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              SEO Settings
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${showSeo ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {showSeo && (
            <div className="px-6 pb-6 space-y-5 border-t border-card-border pt-5">
              <Input
                label="SEO Title"
                placeholder="Override page title for search engines"
                value={form.seoTitle}
                onChange={(e) => update("seoTitle", e.target.value)}
              />
              <Textarea
                label="Meta Description"
                placeholder="Brief description for search engine results"
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
              />
              <Input
                label="Canonical URL"
                placeholder="https://example.com/page"
                value={form.canonicalUrl}
                onChange={(e) => update("canonicalUrl", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" isLoading={isSubmitting}>
            Create Page
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
