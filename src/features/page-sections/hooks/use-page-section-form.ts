import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DEFAULT_PAGE_SECTION_FORM_VALUES,
  pageSectionFormSchema,
  type PageSectionFormValues,
} from "../schemas/page-section.schema";

export function usePageSectionForm(
  overrides?: Partial<PageSectionFormValues>,
) {
  return useForm<PageSectionFormValues>({
    resolver: zodResolver(pageSectionFormSchema),
    defaultValues: {
      ...DEFAULT_PAGE_SECTION_FORM_VALUES,
      ...overrides,
    },
  });
}
