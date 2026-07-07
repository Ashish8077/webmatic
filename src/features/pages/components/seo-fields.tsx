"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormRegisterReturn, FieldErrors, FieldValues } from "react-hook-form";
import type { SeoWarning } from "@/features/pages/utils/seo-analyzer";

interface SeoFieldsProps {
  register: {
    seoTitle: UseFormRegisterReturn<"seoTitle">;
    metaDescription: UseFormRegisterReturn<"metaDescription">;
    canonicalUrl: UseFormRegisterReturn<"canonicalUrl">;
    metaKeywords: UseFormRegisterReturn<"metaKeywords">;
    ogTitle: UseFormRegisterReturn<"ogTitle">;
    ogDescription: UseFormRegisterReturn<"ogDescription">;
    twitterTitle: UseFormRegisterReturn<"twitterTitle">;
    twitterDescription: UseFormRegisterReturn<"twitterDescription">;
    robotsIndex: UseFormRegisterReturn<"robotsIndex">;
    robotsFollow: UseFormRegisterReturn<"robotsFollow">;
  };
  errors: FieldErrors<FieldValues>;
  warnings: SeoWarning[];
}

function SeoFields({ register, errors, warnings }: SeoFieldsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Search size={16} />
          SEO Settings
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-card-border pt-5">
          <Input
            label="SEO Title"
            placeholder="Override page title for search engines"
            {...register.seoTitle}
            error={errors.seoTitle?.message as string}
          />
          {warnings
            .filter((x) => x.field === "seoTitle")
            .map((warning) => (
              <p key={warning.message} className="mt-1 text-xs text-yellow-600">
                ⚠️ {warning.message}
              </p>
            ))}

          <Textarea
            label="Meta Description"
            placeholder="Brief description for search engine results"
            {...register.metaDescription}
            error={errors.metaDescription?.message as string}
          />
          {warnings
            .filter((x) => x.field === "metaDescription")
            .map((warning) => (
              <p key={warning.message} className="mt-1 text-xs text-yellow-600">
                ⚠️ {warning.message}
              </p>
            ))}

          <Input
            label="Canonical URL"
            placeholder="https://example.com/page"
            {...register.canonicalUrl}
            error={errors.canonicalUrl?.message as string}
          />
          <Input
            label="Meta Keywords"
            placeholder="comma, separated, keywords"
            {...register.metaKeywords}
            error={errors.metaKeywords?.message as string}
          />

          <div className="pt-4 border-t border-card-border mt-4">
            <h4 className="text-sm font-semibold mb-3">Open Graph</h4>
            <div className="space-y-4">
              <Input
                label="OG Title"
                placeholder="Social media title"
                {...register.ogTitle}
                error={errors.ogTitle?.message as string}
              />
              <Textarea
                label="OG Description"
                placeholder="Social media description"
                {...register.ogDescription}
                error={errors.ogDescription?.message as string}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-card-border mt-4">
            <h4 className="text-sm font-semibold mb-3">Twitter</h4>
            <div className="space-y-4">
              <Input
                label="Twitter Title"
                placeholder="Twitter title"
                {...register.twitterTitle}
                error={errors.twitterTitle?.message as string}
              />
              <Textarea
                label="Twitter Description"
                placeholder="Twitter description"
                {...register.twitterDescription}
                error={errors.twitterDescription?.message as string}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-card-border mt-4">
            <h4 className="text-sm font-semibold mb-3">Robots</h4>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  className="rounded border-card-border"
                  {...register.robotsIndex}
                />
                Index
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  className="rounded border-card-border"
                  {...register.robotsFollow}
                />
                Follow
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeoFields;
