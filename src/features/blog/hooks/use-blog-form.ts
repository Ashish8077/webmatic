import {
  useForm,
  UseFormReturn,
  useWatch,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBlogInput,
  createBlogSchema,
} from "../schemas/create-blog.schema";
import { analyzeSeo, type SeoWarning } from "../utils/seo-analyzer";

const DEFAULT_VALUES: CreateBlogInput = {
  title: "",
  slug: "",
  status: "draft",
  excerpt: "",
  content: "",
  isFeatured: false,
  categoryIds: [],
  tagIds: [],
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

export function useBlogForm(options?: {
  defaultValues?: Partial<CreateBlogInput>;
  values?: CreateBlogInput;
}): UseFormReturn<CreateBlogInput> & { seoWarnings: SeoWarning[] } {
  const form = useForm<CreateBlogInput>({
    resolver: zodResolver(
      createBlogSchema,
    ) as unknown as Resolver<CreateBlogInput>,
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
