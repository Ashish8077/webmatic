import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import {
  DEFAULT_PAGE_SECTION_FORM_VALUES,
  pageSectionFormSchema,
  PageSectionFormValues,
} from "../schemas/page-section-form.schema";

export function usePageSectionForm(overrides?: Partial<PageSectionFormValues>) {
  return useForm<PageSectionFormValues>({
    resolver: zodResolver(
      pageSectionFormSchema,
    ) as unknown as Resolver<PageSectionFormValues>,
    defaultValues: {
      ...DEFAULT_PAGE_SECTION_FORM_VALUES,
      ...overrides,
    },
  }) as UseFormReturn<PageSectionFormValues>;
}
