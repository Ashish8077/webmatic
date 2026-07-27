import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, TestimonialFormValues } from "../schemas/testimonial.schema";
import { Testimonial } from "../types/testimonial.types";
import { useEffect } from "react";

export function useTestimonialForm(initialData?: Testimonial): UseFormReturn<TestimonialFormValues> {
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema) as unknown as Resolver<TestimonialFormValues>,
    defaultValues: {
      clientName: "",
      designation: "",
      companyName: "",
      profileImageId: null,
      title: "",
      description: "",
      rating: 5,
      status: "draft",
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        clientName: initialData.clientName,
        designation: initialData.designation || "",
        companyName: initialData.companyName || "",
        profileImageId: initialData.profileImageId,
        title: initialData.title || "",
        description: initialData.description || "",
        rating: initialData.rating,
        status: initialData.status,
        sortOrder: initialData.sortOrder,
      });
    }
  }, [initialData, form]);

  return form;
}
