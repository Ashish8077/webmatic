import { paginationSchema } from "@/shared/schemas/pagination";
import { z } from "zod";
import { USER_STATUS } from "../constants/user.constants";

export const getUsersQuerySchema = paginationSchema
  .extend({
    status: z.enum(USER_STATUS).optional(),
    search: z.string().optional(),
    sortBy: z
      .enum(["name", "email", "status", "created_at"])
      .default("created_at"),
  })
  .strict();

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
