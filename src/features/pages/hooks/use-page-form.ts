import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePageFormValues,
  createPageSchema,
} from "../schemas/create-page.schema";
import { analyzeSeo, type SeoWarning } from "../utils/seo-analyzer";

const DEFAULT_VALUES: CreatePageFormValues = {
  title: "",
  slug: "",
  template: "default",
  status: "draft",
  seoTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  metaKeywords: "",
};

export function usePageForm(overrides?: Partial<CreatePageFormValues>) {
  const form = useForm<CreatePageFormValues>({
    resolver: zodResolver(createPageSchema),
    defaultValues: { ...DEFAULT_VALUES, ...overrides },
  });

  const seoTitle = form.watch("seoTitle");
  const metaDescription = form.watch("metaDescription");

  const seoWarnings: SeoWarning[] = analyzeSeo({
    seoTitle,
    metaDescription,
  });

  return {
    ...form,
    seoWarnings,
  };
}
