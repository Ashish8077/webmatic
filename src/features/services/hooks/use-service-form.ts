import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, ServiceFormValues } from "../schemas/service.schema";
import { Service } from "../types/service.types";
import { useEffect } from "react";

export function useServiceForm(initialData?: Service): UseFormReturn<ServiceFormValues> {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema) as unknown as Resolver<ServiceFormValues>,
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      featuredImageId: null,
      featuredImage: null,
      bannerImageId: null,
      bannerImage: null,
      visualType: "none",
      iconName: null,
      imageId: null,
      image: null,
      keyFeatures: [],
      benefits: [],
      faq: [],
      ctaTitle: "",
      ctaDescription: "",
      ctaButtonText: "",
      ctaButtonUrl: "",
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
      status: "draft",
      isFeatured: false,
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        slug: initialData.slug,
        shortDescription: initialData.shortDescription || "",
        description: initialData.description || "",
        featuredImageId: initialData.featuredImageId,
        featuredImage: initialData.featuredImage || null,
        bannerImageId: initialData.bannerImageId,
        bannerImage: initialData.bannerImage || null,
        visualType: initialData.visualType || "none",
        iconName: initialData.iconName || null,
        imageId: initialData.imageId || null,
        image: initialData.image || null,
        keyFeatures: initialData.keyFeatures || [],
        benefits: initialData.benefits || [],
        faq: initialData.faq || [],
        ctaTitle: initialData.ctaTitle || "",
        ctaDescription: initialData.ctaDescription || "",
        ctaButtonText: initialData.ctaButtonText || "",
        ctaButtonUrl: initialData.ctaButtonUrl || "",
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
        status: initialData.status,
        isFeatured: initialData.isFeatured,
        sortOrder: initialData.sortOrder,
      });
    }
  }, [initialData, form]);

  return form;
}
