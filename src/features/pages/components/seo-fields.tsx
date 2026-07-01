"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormRegisterReturn, FieldErrors } from "react-hook-form";
import type { SeoWarning } from "@/features/pages/utils/seo-analyzer";

interface SeoFieldsProps {
  register: {
    seoTitle: UseFormRegisterReturn<"seoTitle">;
    metaDescription: UseFormRegisterReturn<"metaDescription">;
    canonicalUrl: UseFormRegisterReturn<"canonicalUrl">;
  };
  errors: FieldErrors<{
    seoTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  }>;
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
            error={errors.seoTitle?.message}
          />
          {warnings
            .filter((x) => x.field === "seoTitle")
            .map((warning) => (
              <p
                key={warning.message}
                className="mt-1 text-xs text-yellow-600"
              >
                ⚠️ {warning.message}
              </p>
            ))}

          <Textarea
            label="Meta Description"
            placeholder="Brief description for search engine results"
            {...register.metaDescription}
            error={errors.metaDescription?.message}
          />
          {warnings
            .filter((x) => x.field === "metaDescription")
            .map((warning) => (
              <p
                key={warning.message}
                className="mt-1 text-xs text-yellow-600"
              >
                ⚠️ {warning.message}
              </p>
            ))}

          <Input
            label="Canonical URL"
            placeholder="https://example.com/page"
            {...register.canonicalUrl}
            error={errors.canonicalUrl?.message}
          />
        </div>
      )}
    </div>
  );
}

export default SeoFields;
