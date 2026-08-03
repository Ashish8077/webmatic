import db from "@/database/connection";
import { ResultSetHeader } from "mysql2";
import { LEAD_SORT_COLUMNS, LeadStatus } from "../constants/lead.constants";
import {
  CountRow,
  CreatedLead,
  CreateLeadInput,
  LeadFilters,
  LeadListResult,
  LeadListRow,
  LeadRepository,
  LeadRow,
  LeadExportRow
} from "../types/repository.types";



export const leadRepository: LeadRepository = {
  async create(input: CreateLeadInput): Promise<CreatedLead> {
    const [result] = await db.execute<ResultSetHeader>(
      `
      INSERT INTO leads (
        name, email, phone, company, message, ip_address, user_agent, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
      `,
      [
        input.name,
        input.email,
        input.phone ?? null,
        input.company ?? null,
        input.message,
        input.ipAddress ?? null,
        input.userAgent ?? null,
      ]
    );
    
    return {
      id: result.insertId,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      company: input.company ?? null,
      message: input.message,
      status: "new",
    };
  },

  async findById(id: number): Promise<LeadRow | null> {
    const [rows] = await db.execute<LeadRow[]>(
      `
      SELECT * FROM leads
      WHERE id = ? AND deleted_at IS NULL
      LIMIT 1
      `,
      [id]
    );
    return rows[0] ?? null;
  },
  
  async findByEmail(email: string): Promise<LeadRow[]> {
    const [rows] = await db.execute<LeadRow[]>(
      `
      SELECT * FROM leads
      WHERE email = ? AND deleted_at IS NULL
      ORDER BY created_at DESC
      `,
      [email]
    );
    return rows;
  },

  async findMany(filters: LeadFilters): Promise<LeadListResult> {
    const { page = 1, limit = 10, search, status, fromDate, toDate, sortBy = "created_at", sortOrder = "desc" } = filters;
    const offset = (page - 1) * limit;

    const where: string[] = ["deleted_at IS NULL"];
    const params: (string | number)[] = [];

    if (search) {
      where.push("(name LIKE ? OR email LIKE ? OR company LIKE ? OR phone LIKE ?)");
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam);
    }

    if (status) {
      where.push("status = ?");
      params.push(status);
    }

    if (filters.assignedTo) {
      where.push("assigned_to = ?");
      params.push(filters.assignedTo);
    }

    if (fromDate) {
      where.push("created_at >= ?");
      params.push(fromDate);
    }

    if (toDate) {
      where.push("created_at <= ?");
      params.push(toDate);
    }

    // Safely parse the sort column against the whitelisted sort columns
    const sortCol = LEAD_SORT_COLUMNS.includes(sortBy as (typeof LEAD_SORT_COLUMNS)[number]) ? sortBy : "created_at";
    const order = sortOrder === "asc" ? "ASC" : "DESC";

    const [rows] = await db.query<LeadListRow[]>(
      `
      SELECT id, name, email, phone, company, status, assigned_to, created_at, updated_at
      FROM leads
      WHERE ${where.join(" AND ")}
      ORDER BY ${sortCol} ${order}
      LIMIT ?, ?
      `,
      [...params, offset, limit]
    );

    const total = await this.count(filters);
    const totalPages = Math.ceil(total / limit);

    return {
      items: rows,
      total,
      page,
      limit,
      totalPages,
    };
  },

  async updateStatus(id: number, status: LeadStatus, adminId?: number, resolvedBy?: number | null): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
      UPDATE leads
      SET status = ?, updated_by_admin_id = COALESCE(?, updated_by_admin_id), resolved_by = COALESCE(?, resolved_by)
      WHERE id = ? AND deleted_at IS NULL
      `,
      [status, adminId ?? null, resolvedBy ?? null, id]
    );
    return result.affectedRows;
  },

  async assignLead(id: number, assignedTo: number | null, adminId: number): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
      UPDATE leads
      SET assigned_to = ?, updated_by_admin_id = ?
      WHERE id = ? AND deleted_at IS NULL
      `,
      [assignedTo, adminId, id]
    );
    return result.affectedRows;
  },

  async softDelete(id: number): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
      UPDATE leads
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL
      `,
      [id]
    );
    return result.affectedRows;
  },

  async count(filters: Omit<LeadFilters, "page" | "limit">): Promise<number> {
    const { search, status, fromDate, toDate } = filters;
    const where: string[] = ["deleted_at IS NULL"];
    const params: (string | number)[] = [];

    if (search) {
      where.push("(name LIKE ? OR email LIKE ? OR company LIKE ? OR phone LIKE ?)");
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam);
    }

    if (status) {
      where.push("status = ?");
      params.push(status);
    }

    if (filters.assignedTo) {
      where.push("assigned_to = ?");
      params.push(filters.assignedTo);
    }

    if (fromDate) {
      where.push("created_at >= ?");
      params.push(fromDate);
    }

    if (toDate) {
      where.push("created_at <= ?");
      params.push(toDate);
    }

    const [rows] = await db.query<CountRow[]>(
      `
      SELECT COUNT(*) AS total
      FROM leads
      WHERE ${where.join(" AND ")}
      `,
      params
    );

    return Number(rows[0].total);
  },

  async exists(id: number): Promise<boolean> {
    const [rows] = await db.execute<CountRow[]>(
      `
      SELECT COUNT(*) AS total
      FROM leads
      WHERE id = ? AND deleted_at IS NULL
      `,
      [id]
    );
    return Number(rows[0].total) > 0;
  },

  async findExportBatch(lastId: number, limit: number, filters: Omit<LeadFilters, "page" | "limit">): Promise<LeadExportRow[]> {
    const { search, status, fromDate, toDate } = filters;
    const where: string[] = ["deleted_at IS NULL", "id > ?"];
    const params: (string | number)[] = [lastId];

    if (search) {
      where.push("(name LIKE ? OR email LIKE ? OR company LIKE ? OR phone LIKE ?)");
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam);
    }

    if (status) {
      where.push("status = ?");
      params.push(status);
    }

    if (filters.assignedTo) {
      where.push("assigned_to = ?");
      params.push(filters.assignedTo);
    }

    if (fromDate) {
      where.push("created_at >= ?");
      params.push(fromDate);
    }

    if (toDate) {
      where.push("created_at <= ?");
      params.push(toDate);
    }

    const [rows] = await db.query<LeadExportRow[]>(
      `
      SELECT id, name, email, phone, company, message, status, created_at AS createdAt
      FROM leads
      WHERE ${where.join(" AND ")}
      ORDER BY id ASC
      LIMIT ?
      `,
      [...params, limit]
    );

    return rows;
  }
};
