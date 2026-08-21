import { paginationSchema } from "@/shared/schemas/pagination";
import { z } from "zod";
import { SERVICE_STATUS } from "../constants/service.constants";

export const getServicesQuerySchema = paginationSchema
  .extend({
    status: z.enum(SERVICE_STATUS).optional(),

    isFeatured: z.preprocess((val) => {
      if (val === "true" || val === true || val === "1") return true;
      if (val === "false" || val === false || val === "0") return false;
      return val;
    }, z.boolean().optional()),

    sortBy: z
      .enum([
        "name",
        "slug",
        "status",
        "sort_order",
        "created_at",
        "updated_at",
        "published_at",
      ])
      .default("sort_order"),
  })
  .strict();

export type GetServicesQuery = z.infer<typeof getServicesQuerySchema>;
