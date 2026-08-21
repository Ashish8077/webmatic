import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workProjectSchema, WorkProjectFormValues } from "../schemas/work-project.schema";
import { WorkProjectDetailsResponse } from "../types/work-project.types";
import { useEffect } from "react";

export function useWorkProjectForm(initialData?: WorkProjectDetailsResponse): UseFormReturn<WorkProjectFormValues> {
  const form = useForm<WorkProjectFormValues>({
    resolver: zodResolver(workProjectSchema) as unknown as Resolver<WorkProjectFormValues>,
    defaultValues: {
      title: "",
      slug: "",
      category: "web-development",
      shortDescription: "",
      description: "",
      projectUrl: "",
      
      featuredImageId: null,
      featuredImage: null,

      seoTitle: "",
      metaDescription: "",
      metaKeywords: "",
      canonicalUrl: "",

      openGraphTitle: "",
      openGraphDescription: "",
      openGraphImageId: null,
      openGraphImage: null,

      twitterTitle: "",
      twitterDescription: "",
      twitterImageId: null,
      twitterImage: null,

      schemaMarkup: null,

      status: "draft",
      isFeatured: false,
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        slug: initialData.slug,
        category: initialData.category,
        shortDescription: initialData.shortDescription || "",
        description: initialData.description || "",
        projectUrl: initialData.projectUrl || "",
        
        featuredImageId: initialData.featuredImageId,
        featuredImage: initialData.featuredImage || null,

        seoTitle: initialData.seoTitle || "",
        metaDescription: initialData.metaDescription || "",
        metaKeywords: initialData.metaKeywords || "",
        canonicalUrl: initialData.canonicalUrl || "",

        openGraphTitle: initialData.openGraphTitle || "",
        openGraphDescription: initialData.openGraphDescription || "",
        openGraphImageId: initialData.openGraphImageId,
        openGraphImage: initialData.openGraphImage || null,

        twitterTitle: initialData.twitterTitle || "",
        twitterDescription: initialData.twitterDescription || "",
        twitterImageId: initialData.twitterImageId,
        twitterImage: initialData.twitterImage || null,

        schemaMarkup: initialData.schemaMarkup,

        status: initialData.status,
        isFeatured: initialData.isFeatured,
        sortOrder: initialData.sortOrder,
      });
    }
  }, [initialData, form]);

  return form;
}
