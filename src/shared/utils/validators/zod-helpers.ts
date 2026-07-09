import z from "zod";

export const emptyStringToNull = (maxLength: number) =>
  z.preprocess((value) => {
    if (typeof value === "string" && value.trim() === "") {
      return null;
    }

    return value;
  }, z.string().trim().max(maxLength).nullable());

export const nullableUrl = (message = "Invalid URL") =>
  z.preprocess((value) => {
    if (typeof value === "string" && value.trim() === "") {
      return null;
    }

    return value;
  }, z.url({ message }).nullable());

export const nullablePositiveInt = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    return Number.isNaN(parsed) ? value : parsed;
  }

  return value;
}, z.number().int().positive().nullable());

export const nonNegativeInt = z.preprocess((value) => {
  if (value === "" || value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  }

  return value;
}, z.number().int().min(0));

export const stringArray = (maxLength = 255) =>
  z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "Value is required" })
        .max(maxLength, {
          message: `Must not exceed ${maxLength} characters`,
        }),
    )
    .nullable();

export const faqItemSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, { message: "Question is required" })
    .max(500, { message: "Question must not exceed 500 characters" }),

  answer: z
    .string()
    .trim()
    .min(1, { message: "Answer is required" })
    .max(5000, { message: "Answer must not exceed 5000 characters" }),
});

export const nullableImageId = z.coerce
  .number()
  .int()
  .positive("Invalid image id")
  .nullable()
  .optional();

export {
  jsonStringSchema,
  optionalJsonStringSchema,
} from "./json-string";
