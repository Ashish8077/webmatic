import { z } from "zod";
import { PAGE_STATUS } from "../constants/page.constants";

export const updatePageStatusSchema = z.object({
  status: z.enum(PAGE_STATUS),
});

export type UpdatePageStatusInput = z.infer<typeof updatePageStatusSchema>;
