import type { JsonObject } from "@/shared/types/json";
import { parseJsonObjectString } from "@/shared/utils/validators/json-string";

export const stringifySectionContent = (content: unknown): string => {
  if (!content) return "{}";
  if (typeof content === "string") return content;
  try {
    return JSON.stringify(content, null, 2);
  } catch {
    return "{}";
  }
};

export const stringifyOptionalSectionContent = (
  content: unknown,
): string => {
  if (content === null || content === undefined) return "";

  return stringifySectionContent(content);
};

export const parseRequiredSectionContent = (
  content: string,
): JsonObject => {
  const parsedContent = parseJsonObjectString(content);

  if (!parsedContent || Object.keys(parsedContent).length === 0) {
    throw new Error("Section content must contain at least one key-value pair.");
  }

  return parsedContent;
};

export const parseOptionalSectionContent = (
  content?: string | null,
): JsonObject | null => parseJsonObjectString(content, { allowEmpty: true });
