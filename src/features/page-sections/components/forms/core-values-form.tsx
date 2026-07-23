"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_CORE_VALUES_CONTENT,
  type CoreValuesContentValues,
} from "../../schemas/core-values.schema";
import {
  TextField,
  TextareaField,
  RepeaterField,
  ImageIdField,
} from "../fields";

type FormShape = { content: CoreValuesContentValues };

export function parseCoreValuesContentDefaults(
  content: JsonObject | undefined | null,
): CoreValuesContentValues {
  const raw = (content ?? {}) as unknown as Partial<CoreValuesContentValues>;
  return {
    badge: raw.badge ?? DEFAULT_CORE_VALUES_CONTENT.badge,
    heading: raw.heading ?? DEFAULT_CORE_VALUES_CONTENT.heading,
    values: raw.values ?? DEFAULT_CORE_VALUES_CONTENT.values,
  };
}

export function CoreValuesContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          name="content.badge"
          label="Badge"
          placeholder="e.g., CORE VALUES"
          disabled={disabled}
        />
        <TextField
          name="content.heading"
          label="Heading"
          placeholder="e.g., 3 Reasons Why..."
          disabled={disabled}
        />
      </div>

      <RepeaterField<FormShape>
        name="content.values"
        label="Core Values"
        disabled={disabled}
        defaultItem={{
          title: "",
          description: "",
          iconId: null,
          linkText: "",
          linkUrl: "",
        }}
        renderItem={(index) => (
          <div className="grid gap-4 mt-2">
            <TextField
              name={`content.values.${index}.title`}
              label="Title"
              placeholder="e.g., Customers First"
              disabled={disabled}
            />
            <TextareaField
              name={`content.values.${index}.description`}
              label="Description"
              placeholder="Write description here..."
              disabled={disabled}
            />
            <ImageIdField
              name={`content.values.${index}.iconId`}
              label="Icon/Image"
              disabled={disabled}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                name={`content.values.${index}.linkText`}
                label="Link Text"
                placeholder="e.g., Find Out More"
                disabled={disabled}
              />
              <TextField
                name={`content.values.${index}.linkUrl`}
                label="Link URL"
                placeholder="e.g., /about"
                disabled={disabled}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
