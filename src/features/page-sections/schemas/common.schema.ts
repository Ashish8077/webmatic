import { z } from "zod";

// ─── Primitive field schemas ──────────────────────────────────────────────────

export const requiredString = (label: string, max = 255) =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} is required.` })
    .max(max, { message: `${label} must not exceed ${max} characters.` });

export const optionalString = (max = 255) =>
  z
    .string()
    .trim()
    .max(max, { message: `Must not exceed ${max} characters.` });

export const requiredUrl = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} is required.` })
    .max(2048, { message: `${label} must not exceed 2048 characters.` });

export const optionalUrl = () =>
  z.string().trim().max(2048, { message: "Must not exceed 2048 characters." });

// ─── Composite field schemas ──────────────────────────────────────────────────

/** Matches `RawCMSButton` — `{ text: string, url: string }` */
export const buttonSchema = z.object({
  text: requiredString("Button text"),
  url: requiredUrl("Button URL"),
});

/** Button where both fields are optional (e.g. secondary/learn-more buttons) */
export const optionalButtonSchema = z.object({
  text: optionalString(),
  url: optionalUrl(),
});

/** Nullable positive integer for image IDs */
export const imageIdSchema = z
  .number()
  .int()
  .positive("Invalid image ID.")
  .nullable();

export const requiredImageIdSchema = () => z
  .number()
  .int()
  .positive("Invalid image ID.");
