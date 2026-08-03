import { LeadStatus } from "../constants/lead.constants";

export interface LeadDetailsResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  ipAddress: string | null;
  userAgent: string | null;
  status: LeadStatus;
  assignedTo: number | null;
  updatedByAdminId: number | null;
  resolvedBy: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListItem {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: LeadStatus;
  assignedTo: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListResponse {
  items: LeadListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
