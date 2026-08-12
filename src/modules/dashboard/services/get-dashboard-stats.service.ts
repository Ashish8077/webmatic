import { requirePermission } from "@/modules/auth/authorization/permission";
import { PERMISSIONS } from "@/modules/auth/constants/permissions";
import { AuthUser } from "@/modules/auth/types/auth-user";
import {
  getContentStats,
  getLeadStats,
  getMediaStats,
  getPublishingActivity,
  getRecentActivity,
  getSeoStats,
} from "../repositories/dashboard.repository";
import { DashboardStatsResponse, AttentionItem } from "../types/dashboard.types";

export async function getDashboardStatsService(
  user: AuthUser,
  periodDays: number = 30
): Promise<DashboardStatsResponse> {
  // Enforce server-side authorization
  requirePermission(user, PERMISSIONS.DASHBOARD_VIEW);

  // Parallelize independent database queries
  const [
    contentStats,
    leadStats,
    mediaStats,
    seoStats,
    recentActivity,
    publishingActivity,
  ] = await Promise.all([
    getContentStats(),
    getLeadStats(periodDays),
    getMediaStats(),
    getSeoStats(),
    getRecentActivity(),
    getPublishingActivity(periodDays),
  ]);

  // Construct attention items from stats
  const attention: AttentionItem[] = [];

  if (contentStats.pages.draft > 0) {
    attention.push({
      label: "Draft Pages",
      count: contentStats.pages.draft,
      route: "/admin/pages",
    });
  }
  if (contentStats.blogs.draft > 0) {
    attention.push({
      label: "Draft Blogs",
      count: contentStats.blogs.draft,
      route: "/admin/blogs",
    });
  }
  if (contentStats.blogs.scheduled > 0) {
    attention.push({
      label: "Scheduled Blogs",
      count: contentStats.blogs.scheduled,
      route: "/admin/blogs",
    });
  }
  if (seoStats.pages.missingTitle > 0) {
    attention.push({
      label: "Pages Missing SEO Title",
      count: seoStats.pages.missingTitle,
      route: "/admin/pages",
    });
  }
  if (seoStats.pages.missingDescription > 0) {
    attention.push({
      label: "Pages Missing Meta Description",
      count: seoStats.pages.missingDescription,
      route: "/admin/pages",
    });
  }
  if (seoStats.services.missingTitle > 0) {
    attention.push({
      label: "Services Missing SEO Title",
      count: seoStats.services.missingTitle,
      route: "/admin/services",
    });
  }
  if (seoStats.services.missingDescription > 0) {
    attention.push({
      label: "Services Missing Meta Description",
      count: seoStats.services.missingDescription,
      route: "/admin/services",
    });
  }
  if (seoStats.blogs.missingTitle > 0) {
    attention.push({
      label: "Blogs Missing SEO Title",
      count: seoStats.blogs.missingTitle,
      route: "/admin/blogs",
    });
  }
  if (seoStats.blogs.missingDescription > 0) {
    attention.push({
      label: "Blogs Missing Meta Description",
      count: seoStats.blogs.missingDescription,
      route: "/admin/blogs",
    });
  }

  return {
    content: contentStats,
    leads: leadStats,
    media: mediaStats,
    seo: seoStats,
    attention,
    activity: recentActivity,
    publishing: publishingActivity,
  };
}
