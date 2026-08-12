export interface PageStats {
  total: number;
  published: number;
  draft: number;
}

export interface ServiceStats {
  total: number;
  published: number;
  draft: number;
}

export interface BlogStats {
  total: number;
  published: number;
  draft: number;
  scheduled: number;
}

export interface ContentStats {
  pages: PageStats;
  services: ServiceStats;
  blogs: BlogStats;
}

export interface LeadTrendItem {
  date: string;
  count: number;
}

export interface RecentLeadItem {
  id: number;
  name: string;
  company: string | null;
  status: 'new' | 'in_progress' | 'contacted' | 'closed' | 'spam';
  createdAt: string;
}

export interface LeadStats {
  total: number;
  byStatus: {
    new: number;
    in_progress: number;
    contacted: number;
    closed: number;
    spam: number;
  };
  trend: LeadTrendItem[];
  recent: RecentLeadItem[];
}

export interface MediaStats {
  total: number;
}

export interface SeoStatItem {
  total: number;
  missingTitle: number;
  missingDescription: number;
}

export interface SeoHealth {
  pages: SeoStatItem;
  services: SeoStatItem;
  blogs: SeoStatItem;
}

export interface AttentionItem {
  label: string;
  count: number;
  route: string;
}

export interface RecentActivityItem {
  id: number;
  actorName: string | null;
  action: string;
  entityType: string | null;
  description: string | null;
  timestamp: string;
}

export interface PublishingActivity {
  pagesPublished: number;
  blogsPublished: number;
  servicesPublished: number;
}

export interface DashboardStatsResponse {
  content: ContentStats;
  leads: LeadStats;
  media: MediaStats;
  seo: SeoHealth;
  attention: AttentionItem[];
  activity: RecentActivityItem[];
  publishing: PublishingActivity;
}
