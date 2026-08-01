import { z } from "zod";
import { LEAD_STATUS, LEAD_SORT_COLUMNS } from "../constants/lead.constants";

export const getLeadsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  search: z.string().trim().optional(),
  status: z.enum([LEAD_STATUS.NEW, LEAD_STATUS.IN_PROGRESS, LEAD_STATUS.CONTACTED, LEAD_STATUS.CLOSED, LEAD_STATUS.SPAM]).optional(),
  fromDate: z.iso.datetime().optional(),
  toDate: z.iso.datetime().optional(),
  assignedTo: z.coerce.number().int().positive().optional(),
  sortBy: z.enum(LEAD_SORT_COLUMNS).optional().default("created_at"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type GetLeadsQuerySchemaData = z.infer<typeof getLeadsQuerySchema>;

export const leadIdParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid lead ID"),
});

export type LeadIdParamSchemaData = z.infer<typeof leadIdParamSchema>;

export const updateLeadSchema = z.object({
  status: z.enum([LEAD_STATUS.NEW, LEAD_STATUS.IN_PROGRESS, LEAD_STATUS.CONTACTED, LEAD_STATUS.CLOSED, LEAD_STATUS.SPAM]).optional(),
  assignedTo: z.number().int().positive().nullable().optional(),
}).refine(data => data.status !== undefined || data.assignedTo !== undefined, {
  message: "At least one field (status or assignedTo) must be provided to update",
});

export type UpdateLeadSchemaData = z.infer<typeof updateLeadSchema>;
