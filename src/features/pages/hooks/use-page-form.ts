import {
  useForm,
  UseFormReturn,
  useWatch,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePageInput,
  createPageSchema,
  updateSystemPageSchema,
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
  ogImageId: null,
  ogImage: null,
  twitterTitle: "",
  twitterDescription: "",
  twitterImageId: null,
  twitterImage: null,
  robotsIndex: true,
  robotsFollow: true,
};

export function usePageForm(options?: {
  defaultValues?: Partial<CreatePageInput>;
  values?: CreatePageInput;
  isSystem?: boolean;
}): UseFormReturn<CreatePageInput> & { seoWarnings: SeoWarning[] } {
  const schema = options?.isSystem ? updateSystemPageSchema : createPageSchema;

  const form = useForm<CreatePageInput>({
    resolver: zodResolver(schema) as unknown as Resolver<CreatePageInput>,
    defaultValues: { ...DEFAULT_VALUES, ...options?.defaultValues },
    values: options?.values,
  });

  const seoTitle = useWatch({ control: form.control, name: "seoTitle" });
  const metaDescription = useWatch({
    control: form.control,
    name: "metaDescription",
  });

  const seoWarnings: SeoWarning[] = analyzeSeo({
    seoTitle: seoTitle ?? "",
    metaDescription: metaDescription ?? "",
  });

  return {
    ...form,
    seoWarnings,
  };
}
