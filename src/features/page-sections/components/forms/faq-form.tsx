"use client";

import type { JsonObject } from "@/shared/types/json";
import {
  DEFAULT_FAQ_CONTENT,
  type FaqContentValues,
} from "../../schemas/faq.schema";
import {
  TextField,
  TextareaField,
  ButtonFields,
  SectionHeadingFields,
  RepeaterField,
} from "../fields";

type FormShape = { content: FaqContentValues };

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



