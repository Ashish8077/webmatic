import { RowDataPacket } from "mysql2";
import { LeadStatus } from "../constants/lead.constants";
import { PaginationQuery } from "@/shared/types/pagination";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  ip_address: string | null;
  user_agent: string | null;
  status: LeadStatus;
  assigned_to: number | null;
  updated_by_admin_id: number | null;
  resolved_by: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface LeadRow extends Lead, RowDataPacket {}

export interface LeadListRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: LeadStatus;
  assigned_to: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreatedLead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: LeadStatus;
}

export interface CountRow extends RowDataPacket {
  total: number;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface UpdateLeadInput {
  status?: LeadStatus;
  assignedTo?: number | null;
  updatedByAdminId?: number | null;
  resolvedBy?: number | null;
}

export interface LeadFilters extends PaginationQuery {
  search?: string;
  status?: LeadStatus;
  fromDate?: string;
  toDate?: string;
  assignedTo?: number;
  sortBy?: "created_at" | "updated_at" | "name" | "email" | "status";
  sortOrder?: "asc" | "desc";
}

export interface LeadListResult {
  items: LeadListRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadExportRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: LeadStatus;
  createdAt: Date;
}

export interface LeadRepository {
  create(input: CreateLeadInput): Promise<CreatedLead>;
  findById(id: number): Promise<LeadRow | null>;
  findByEmail(email: string): Promise<LeadRow[]>;
  findMany(filters: LeadFilters): Promise<LeadListResult>;
  updateStatus(id: number, status: LeadStatus, adminId?: number, resolvedBy?: number | null): Promise<number>;
  assignLead(id: number, assignedTo: number | null, adminId: number): Promise<number>;
  softDelete(id: number): Promise<number>;
  count(filters: Omit<LeadFilters, "page" | "limit">): Promise<number>;
  exists(id: number): Promise<boolean>;
  findExportBatch(lastId: number, limit: number, filters: Omit<LeadFilters, "page" | "limit">): Promise<LeadExportRow[]>;
}
