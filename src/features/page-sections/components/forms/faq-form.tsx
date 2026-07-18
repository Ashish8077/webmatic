"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_FAQ_CONTENT,
  type FaqContentValues,
  DEFAULT_FAQ_SETTINGS,
  type FaqSettingsValues,
} from "../../schemas/faq.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  SectionHeadingFields,
  RepeaterField,
  SwitchField,
  NumberField,
} from "../fields";

type FormShape = { content: FaqContentValues; settings: FaqSettingsValues };

export function parseFaqContentDefaults(
  content: JsonObject | undefined | null,
): FaqContentValues {
  const raw = (content ?? {}) as unknown as Partial<FaqContentValues>;
  return {
    badge: (raw.badge as string) ?? DEFAULT_FAQ_CONTENT.badge,
    heading: (raw.heading as string) ?? DEFAULT_FAQ_CONTENT.heading,
    highlight: (raw.highlight as string) ?? DEFAULT_FAQ_CONTENT.highlight,
    description: (raw.description as string) ?? DEFAULT_FAQ_CONTENT.description,
    bottomText: (raw.bottomText as string) ?? DEFAULT_FAQ_CONTENT.bottomText,
    primaryButton: {
      text: raw.primaryButton?.text ?? "",
      url: raw.primaryButton?.url ?? "",
    },
    items:
      raw.items?.map((item) => ({
        question: item.question ?? "",
        answer: item.answer ?? "",
      })) ?? DEFAULT_FAQ_CONTENT.items,
  };
}

export function parseFaqSettingsDefaults(
  settings: JsonObject | undefined | null,
): FaqSettingsValues {
  const raw = (settings ?? {}) as unknown as Partial<FaqSettingsValues>;
  return {
    allowMultipleOpen:
      raw.allowMultipleOpen ?? DEFAULT_FAQ_SETTINGS.allowMultipleOpen,
    defaultExpanded:
      raw.defaultExpanded ?? DEFAULT_FAQ_SETTINGS.defaultExpanded,
  };
}

export function FaqContentForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-5">
      <SectionHeadingFields
        namePrefix="content"
        showDescription
        disabled={disabled}
      />

      <TextField
        name="content.bottomText"
        label="Bottom Text"
        placeholder="Text shown below FAQ items"
        disabled={disabled}
      />
      <ButtonFields
        name="content.primaryButton"
        label="Primary Button"
        disabled={disabled}
      />

      <RepeaterField<FormShape>
        name="content.items"
        label="FAQ Items"
        defaultItem={DEFAULT_FAQ_CONTENT.items[0] ?? {
          question: "",
          answer: "",
        }}
        disabled={disabled}
        renderItem={(index) => (
          <div className="space-y-3">
            <TextField
              name={`content.items.${index}.question`}
              label="Question"
              disabled={disabled}
            />
            <TextareaField
              name={`content.items.${index}.answer`}
              label="Answer"
              disabled={disabled}
            />
          </div>
        )}
      />
    </div>
  );
}

export function FaqSettingsForm({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground border-b pb-2">
        Accordion Behavior
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <SwitchField
          name="settings.allowMultipleOpen"
          label="Allow Multiple Open"
          description="Allow multiple FAQ items to be open at the same time"
          disabled={disabled}
        />
        <NumberField
          name="settings.defaultExpanded"
          label="Default Expanded Index"
          placeholder="e.g. 0 to expand the first item"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
