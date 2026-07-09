import { z } from "zod";
import type { JsonObject } from "@/shared/types/json";

type JsonObjectStringOptions = {
  fieldLabel: string;
  required?: boolean;
  requireNonEmpty?: boolean;
};

type ParseJsonObjectOptions = {
  allowEmpty?: boolean;
};

const toTrimmedString = z.preprocess(
  (value) => (value === null || value === undefined ? "" : value),
  z.string().trim(),
);

const isJsonObject = (value: unknown): value is JsonObject =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const addIssue = (ctx: z.RefinementCtx, message: string) => {
  ctx.addIssue({
    code: "custom",
    message,
  });
};

export const jsonObjectString = ({
  fieldLabel,
  required = false,
  requireNonEmpty = false,
}: JsonObjectStringOptions) =>
  toTrimmedString.superRefine((value, ctx) => {
    if (!value) {
      if (required) {
        addIssue(ctx, `${fieldLabel} is required.`);
      }

      return;
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(value);
    } catch {
      addIssue(ctx, `${fieldLabel} must be valid JSON.`);
      return;
    }

    if (!isJsonObject(parsed)) {
      addIssue(ctx, `${fieldLabel} must be a JSON object.`);
      return;
    }

    if (requireNonEmpty && Object.keys(parsed).length === 0) {
      addIssue(ctx, `${fieldLabel} must contain at least one key-value pair.`);
    }
  });

export const requiredNonEmptyJsonObjectString = (fieldLabel: string) =>
  jsonObjectString({
    fieldLabel,
    required: true,
    requireNonEmpty: true,
  });

export const optionalJsonObjectString = (fieldLabel: string) =>
  jsonObjectString({
    fieldLabel,
  });

export const jsonStringSchema = requiredNonEmptyJsonObjectString("Content");

export const optionalJsonStringSchema = optionalJsonObjectString("Settings");

export const parseJsonObjectString = (
  value: string | null | undefined,
  options: ParseJsonObjectOptions = {},
): JsonObject | null => {
  const trimmedValue = value?.trim() ?? "";

  if (!trimmedValue) {
    if (options.allowEmpty) {
      return null;
    }

    throw new Error("JSON object string is required.");
  }

  const parsed: unknown = JSON.parse(trimmedValue);

  if (!isJsonObject(parsed)) {
    throw new Error("JSON string must parse to an object.");
  }

  return parsed;
};
