import z from "zod";

export const emptyStringToNull = (maxLength: number) =>
  z.preprocess((value) => {
    if (typeof value === "string" && value.trim() === "") {
      return null;
    }

    return value;
  }, z.string().trim().max(maxLength).nullable());

export const nullableUrl = (message?: string) =>
  z.preprocess((value) => {
    if (typeof value === "string" && value.trim() === "") {
      return null;
    }

    return value;
  }, z.url(message ?? "Invalid URL").nullable());
