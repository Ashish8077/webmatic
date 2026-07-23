"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_COMPANY_STATISTICS_CONTENT,
  type CompanyStatisticsContentValues,
} from "../../schemas/company-statistics.schema";
import {
  TextField,
  TextareaField,
  RepeaterField,
  MediaPickerField,
  NumberField,
} from "../fields";

type FormShape = { content: CompanyStatisticsContentValues };

export function parseCompanyStatisticsContentDefaults(
  content: JsonObject | undefined | null,
): CompanyStatisticsContentValues {
  const raw = (content ?? {}) as unknown as Partial<CompanyStatisticsContentValues>;
  return {
    items:
      raw.items?.map((item) => ({
        number: item.number ?? "",
        suffix: item.suffix ?? "",
        title: item.title ?? "",
        description: item.description ?? "",
        iconId: (item.iconId as number | null) ?? null,
        sortOrder: item.sortOrder ?? 0,
      })) ?? DEFAULT_COMPANY_STATISTICS_CONTENT.items,
  };
}

export function CompanyStatisticsContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <RepeaterField<FormShape>
        name="content.items"
        label="Statistics Items"
        defaultItem={{
          number: "",
          suffix: "+",
          title: "",
          description: "",
          iconId: null,
          sortOrder: 0,
        }}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <TextField
                name={`content.items.${index}.number`}
                label="Number"
                placeholder="e.g. 5"
                disabled={disabled}
              />
              <TextField
                name={`content.items.${index}.suffix`}
                label="Suffix"
                placeholder="e.g. +"
                disabled={disabled}
              />
            </div>
            
            <TextField
              name={`content.items.${index}.title`}
              label="Title"
              placeholder="e.g. Years of Innovation..."
              disabled={disabled}
            />
            
            <TextareaField
              name={`content.items.${index}.description`}
              label="Description (Optional)"
              placeholder="Short description if needed"
              disabled={disabled}
            />
            
            <NumberField
              name={`content.items.${index}.sortOrder`}
              label="Sort Order"
              placeholder="e.g. 1"
              disabled={disabled}
            />

            <div className="pt-2">
              <MediaPickerField
                name={`content.items.${index}.iconId`}
                label="Icon (Optional)"
                disabled={disabled}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
