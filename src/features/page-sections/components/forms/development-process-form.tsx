"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DevelopmentProcessContentValues,
  DevelopmentProcessSettingsValues,
} from "../../schemas/development-process.schema";
import {
  TextField,
  TextareaField,
  RepeaterField,
  ButtonFields,
} from "../fields";
import { VisualPickerField } from "../fields/visual-picker-field";
import { SectionFieldComponent } from "../../types/section-content.types";

type FormShape = {
  content: DevelopmentProcessContentValues;
  settings: DevelopmentProcessSettingsValues;
};

export function parseDevelopmentProcessContentDefaults(
  content: JsonObject | undefined | null,
): DevelopmentProcessContentValues {
  const raw = (content ?? {}) as unknown as Partial<DevelopmentProcessContentValues>;
  return {
    badge: raw.badge ?? "OUR DEVELOPMENT PROCESS",
    heading: raw.heading ?? "Focusing on the 3 key elements of any successful ",
    highlight: raw.highlight ?? "marketing strategy.",
    steps: raw.steps ?? [],
    bottomText: raw.bottomText ?? "We Serve our Clients' Best Interests with the Best Marketing Solutions.",
    primaryButton: raw.primaryButton ?? { url: "/contact", text: "Find Out More" },
  };
}

export const DevelopmentProcessContentForm: SectionFieldComponent = ({ disabled }) => {
  return (
    <div className="space-y-6">
      <TextField
        name="content.badge"
        label="Badge"
        placeholder="e.g., OUR DEVELOPMENT PROCESS"
        disabled={disabled}
      />
      <TextField
        name="content.heading"
        label="Heading"
        placeholder="e.g., Focusing on the 3 key elements..."
        disabled={disabled}
      />
      <TextField
        name="content.highlight"
        label="Highlight Text (Optional)"
        placeholder="e.g., marketing strategy."
        disabled={disabled}
      />
      
      <RepeaterField<FormShape>
        name="content.steps"
        label="Steps"
        max={3}
        defaultItem={{
          key: "",
          title: "",
          description: "",
          visualType: "icon",
          iconName: "",
          imageId: null,
        }}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-4">
            <TextField
              name={`content.steps.${index}.title`}
              label="Step Title"
              placeholder="e.g., 1. Creative"
              disabled={disabled}
            />
            <TextareaField
              name={`content.steps.${index}.description`}
              label="Description"
              placeholder="Step description..."
              disabled={disabled}
            />
            <VisualPickerField
              name={`content.steps.${index}`}
              label="Visual Asset"
            />
          </div>
        )}
      />

      <div className="grid gap-4 pt-4 border-t">
        <TextField
          name="content.bottomText"
          label="Bottom Text"
          placeholder="e.g., We Serve our Clients' Best Interests..."
          disabled={disabled}
        />
        <ButtonFields
          name="content.primaryButton"
          label="Primary Button"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
