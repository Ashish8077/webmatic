import { z } from "zod";
import {
  requiredString,
  optionalString,
  buttonSchema,
} from "./common.schema";
import { booleanSetting, numberSetting } from "./common-settings.schema";

// ─── FAQ item schema ──────────────────────────────────────────────────────────

const faqItemSchema = z.object({
  question: requiredString("Question").max(500, {
    message: "Question must not exceed 500 characters.",
  }),
  answer: requiredString("Answer").max(5000, {
    message: "Answer must not exceed 5000 characters.",
  }),
});

// ─── FAQ content schema ──────────────────────────────────────────────────────

export const faqContentSchema = z.object({
  badge: requiredString("Badge"),
  heading: requiredString("Heading"),
  highlight: optionalString(),
  description: optionalString(2000),
  items: z.array(faqItemSchema),
  bottomText: optionalString(500),
  primaryButton: buttonSchema,
});

export type FaqContentValues = z.infer<typeof faqContentSchema>;

export const DEFAULT_FAQ_CONTENT: FaqContentValues = {
  badge: "",
  heading: "",
  highlight: "",
  description: "",
  items: [],
  bottomText: "",
  primaryButton: { text: "", url: "" },
};

// ─── FAQ settings schema ──────────────────────────────────────────────────────

export const faqSettingsSchema = z.object({
  allowMultipleOpen: booleanSetting.default(false),
  defaultExpanded: numberSetting(0, 100).nullable().default(null),
});

export type FaqSettingsValues = z.infer<typeof faqSettingsSchema>;

export const DEFAULT_FAQ_SETTINGS: FaqSettingsValues = {
  allowMultipleOpen: false,
  defaultExpanded: null,
};
