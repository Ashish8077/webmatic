import { z } from "zod";
import { paginationSchema } from "@/shared/schemas/pagination";
import { MEDIA_DISK, MEDIA_SORT_COLUMNS, MEDIA_TYPE } from "../constants/media.constants";
import type { MediaListQuery } from "../types/media-query.types";

export const getMediaQuerySchema = paginationSchema
  .extend({
    search: z.string().optional(),
    type: z.enum(MEDIA_TYPE).optional(),
    mimeType: z.string().optional(),
    disk: z.enum(MEDIA_DISK).optional(),
    folder: z.string().optional(),
    uploadedBy: z.coerce.number().int().positive().optional(),
    createdAfter: z.coerce.date().optional(),
    createdBefore: z.coerce.date().optional(),
    includeDeleted: z
      .union([z.boolean(), z.literal("true"), z.literal("false")])
      .transform((val) => val === true || val === "true")
      .optional(),
    sortBy: z
      .enum(Object.keys(MEDIA_SORT_COLUMNS) as [keyof typeof MEDIA_SORT_COLUMNS])
      .optional()
      .default("created_at"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  })
  .strict();

export type GetMediaQueryValidatedInput = z.infer<typeof getMediaQuerySchema> &
  MediaListQuery;
