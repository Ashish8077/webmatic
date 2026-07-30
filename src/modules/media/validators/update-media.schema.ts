import { z } from "zod";
import type { UpdateMediaInput } from "../types/media.types";
import type { JsonObject } from "@/shared/types/json";

export const updateMediaSchema = z
  .object({
    altText: z.string().max(255).nullable().optional(),
    caption: z.string().max(1000).nullable().optional(),
    folder: z.string().max(255).nullable().optional(),
    metadata: z.custom<JsonObject>().nullable().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided for update" },
  );

export type UpdateMediaValidatedInput = z.infer<typeof updateMediaSchema> &
  UpdateMediaInput;
