import db from "@/database/connection";
import { RowDataPacket } from "mysql2";
import {
  ContentStats,
  LeadStats,
  MediaStats,
  SeoHealth,
  RecentActivityItem,
  PublishingActivity,
} from "../types/dashboard.types";

export async function getContentStats(): Promise<ContentStats> {
  const [pagesResult] = await db.execute<RowDataPacket[]>(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
      SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft
    FROM pages
    WHERE deleted_at IS NULL
  `);

  const [servicesResult] = await db.execute<RowDataPacket[]>(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
      SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft
    FROM services
    WHERE deleted_at IS NULL
  `);

  const [blogsResult] = await db.execute<RowDataPacket[]>(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
      SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
      SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled
    FROM blogs
    WHERE deleted_at IS NULL
  `);

  return {
    pages: {
      total: Number(pagesResult[0].total || 0),
      published: Number(pagesResult[0].published || 0),
      draft: Number(pagesResult[0].draft || 0),
    },
    services: {
      total: Number(servicesResult[0].total || 0),
      published: Number(servicesResult[0].published || 0),
      draft: Number(servicesResult[0].draft || 0),
    },
    blogs: {
      total: Number(blogsResult[0].total || 0),
      published: Number(blogsResult[0].published || 0),
      draft: Number(blogsResult[0].draft || 0),
      scheduled: Number(blogsResult[0].scheduled || 0),
    },
  };
}

export async function getLeadStats(periodDays: number): Promise<LeadStats> {
  // Aggregate stats
  const [statsResult] = await db.execute<RowDataPacket[]>(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_leads,
      SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
      SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted,
      SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed,
      SUM(CASE WHEN status = 'spam' THEN 1 ELSE 0 END) as spam
    FROM leads
    WHERE deleted_at IS NULL
  `);

  // Trend data
  const [trendResult] = await db.execute<RowDataPacket[]>(
    `
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as count
    FROM leads
    WHERE deleted_at IS NULL AND created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `,
    [periodDays]
  );

  // Recent leads
  const [recentResult] = await db.execute<RowDataPacket[]>(`
    SELECT id, name, company, status, created_at
    FROM leads
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
    LIMIT 5
  `);

  // Fill missing dates in trend
  const trendMap = new Map<string, number>();
  for (const row of trendResult) {
    // format as YYYY-MM-DD
    const dateStr = new Date(row.date).toISOString().split("T")[0];
    trendMap.set(dateStr, Number(row.count));
  }

  const trend = [];
  for (let i = periodDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    trend.push({
      date: dateStr,
      count: trendMap.get(dateStr) || 0,
    });
  }

  return {
    total: Number(statsResult[0].total || 0),
    byStatus: {
      new: Number(statsResult[0].new_leads || 0),
      in_progress: Number(statsResult[0].in_progress || 0),
      contacted: Number(statsResult[0].contacted || 0),
      closed: Number(statsResult[0].closed || 0),
      spam: Number(statsResult[0].spam || 0),
    },
    trend,
    recent: recentResult.map((r) => ({
      id: r.id,
      name: r.name,
      company: r.company,
      status: r.status,
      createdAt: new Date(r.created_at).toISOString(),
    })),
  };
}

export async function getMediaStats(): Promise<MediaStats> {
  const [result] = await db.execute<RowDataPacket[]>(`
    SELECT COUNT(*) as total
    FROM media
    WHERE deleted_at IS NULL
  `);
  return {
    total: Number(result[0].total || 0),
  };
}

export async function getSeoStats(): Promise<SeoHealth> {
  const [pagesResult] = await db.execute<RowDataPacket[]>(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN seo_title IS NULL OR TRIM(seo_title) = '' THEN 1 ELSE 0 END) as missingTitle,
      SUM(CASE WHEN meta_description IS NULL OR TRIM(meta_description) = '' THEN 1 ELSE 0 END) as missingDescription
    FROM pages
    WHERE deleted_at IS NULL
  `);

  const [servicesResult] = await db.execute<RowDataPacket[]>(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN seo_title IS NULL OR TRIM(seo_title) = '' THEN 1 ELSE 0 END) as missingTitle,
      SUM(CASE WHEN meta_description IS NULL OR TRIM(meta_description) = '' THEN 1 ELSE 0 END) as missingDescription
    FROM services
    WHERE deleted_at IS NULL
  `);

  const [blogsResult] = await db.execute<RowDataPacket[]>(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN seo_title IS NULL OR TRIM(seo_title) = '' THEN 1 ELSE 0 END) as missingTitle,
      SUM(CASE WHEN meta_description IS NULL OR TRIM(meta_description) = '' THEN 1 ELSE 0 END) as missingDescription
    FROM blogs
    WHERE deleted_at IS NULL
  `);

  return {
    pages: {
      total: Number(pagesResult[0].total || 0),
      missingTitle: Number(pagesResult[0].missingTitle || 0),
      missingDescription: Number(pagesResult[0].missingDescription || 0),
    },
    services: {
      total: Number(servicesResult[0].total || 0),
      missingTitle: Number(servicesResult[0].missingTitle || 0),
      missingDescription: Number(servicesResult[0].missingDescription || 0),
    },
    blogs: {
      total: Number(blogsResult[0].total || 0),
      missingTitle: Number(blogsResult[0].missingTitle || 0),
      missingDescription: Number(blogsResult[0].missingDescription || 0),
    },
  };
}

export async function getRecentActivity(): Promise<RecentActivityItem[]> {
  const [result] = await db.execute<RowDataPacket[]>(`
    SELECT 
      a.id,
      CONCAT(u.first_name, ' ', u.last_name) as actorName,
      a.action,
      a.entity_type as entityType,
      a.description,
      a.created_at as timestamp
    FROM audit_logs a
    LEFT JOIN users u ON a.user_id = u.id
    ORDER BY a.created_at DESC
    LIMIT 6
  `);

  return result.map((r) => ({
    id: r.id,
    actorName: r.actorName || "System",
    action: r.action,
    entityType: r.entityType,
    description: r.description,
    timestamp: new Date(r.timestamp).toISOString(),
  }));
}

export async function getPublishingActivity(days: number): Promise<PublishingActivity> {
  const [pagesResult] = await db.execute<RowDataPacket[]>(
    `
    SELECT COUNT(*) as published
    FROM pages
    WHERE deleted_at IS NULL 
      AND status = 'published'
      AND published_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
  `,
    [days]
  );

  const [servicesResult] = await db.execute<RowDataPacket[]>(
    `
    SELECT COUNT(*) as published
    FROM services
    WHERE deleted_at IS NULL 
      AND status = 'published'
      AND published_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
  `,
    [days]
  );

  const [blogsResult] = await db.execute<RowDataPacket[]>(
    `
    SELECT COUNT(*) as published
    FROM blogs
    WHERE deleted_at IS NULL 
      AND status = 'published'
      AND published_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
  `,
    [days]
  );

  return {
    pagesPublished: Number(pagesResult[0].published || 0),
    servicesPublished: Number(servicesResult[0].published || 0),
    blogsPublished: Number(blogsResult[0].published || 0),
  };
}
