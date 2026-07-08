import { useForm, UseFormReturn, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePageInput,
  createPageSchema,
} from "../schemas/create-page.schema";
import { analyzeSeo, type SeoWarning } from "../utils/seo-analyzer";

const DEFAULT_VALUES: CreatePageInput = {
  title: "",
  slug: "",
  status: "draft",
  seoTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  twitterTitle: "",
  twitterDescription: "",
  robotsIndex: true,
  robotsFollow: true,
};

export function usePageForm(options?: {
  defaultValues?: Partial<CreatePageInput>;
  values?: CreatePageInput;
}): UseFormReturn<CreatePageInput> & { seoWarnings: SeoWarning[] } {
  const form = useForm<CreatePageInput>({
    resolver: zodResolver(createPageSchema) as unknown as Resolver<CreatePageInput>,
    defaultValues: { ...DEFAULT_VALUES, ...options?.defaultValues },
    values: options?.values,
  });

  const seoTitle = useWatch({ control: form.control, name: "seoTitle" });
  const metaDescription = useWatch({ control: form.control, name: "metaDescription" });

  const seoWarnings: SeoWarning[] = analyzeSeo({
    seoTitle: seoTitle ?? "",
    metaDescription: metaDescription ?? "",
  });

  return {
    ...form,
    seoWarnings,
  };
}
