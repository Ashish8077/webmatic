"use client";

import { StatCard } from "@/components/ui/stat-card";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats";
import Link from "next/link";
import {
  FileText,
  Layout,
  MessageSquare,
  Users,
  Image as ImageIcon,
  Activity,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Send,
  CheckCircle,
} from "lucide-react";

import { RecentLeadItem, LeadTrendItem, AttentionItem, RecentActivityItem } from "@/modules/dashboard/types/dashboard.types";

export default function DashboardPage() {
  useCurrentUser();
  
  const { data: statsResponse, isLoading, isError, refetch } = useDashboardStats(30);

  if (isLoading) {
    return (
      <div className="animate-fade-in space-y-8">
        <div>
          <div className="h-8 w-48 bg-card-border rounded animate-pulse mb-2"></div>
          <div className="h-4 w-32 bg-card-border rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-card-border rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !statsResponse?.data) {
    return (
      <div className="p-8 text-center bg-card-bg border border-card-border rounded-2xl">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Unable to load dashboard</h2>
        <p className="text-muted-foreground mb-4">There was a problem loading your statistics.</p>
        <button 
          onClick={() => refetch()}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
        >
          Retry
        </button>
      </div>
    );
  }

  const { content, leads, media, seo, attention, activity, publishing } = statsResponse.data;

  // Maximum value for the trend chart height calculation
  const maxTrend = Math.max(...leads.trend.map((t: LeadTrendItem) => t.count), 1);

  return (
    <div className="animate-fade-in space-y-10 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your content and activity
        </p>
      </div>

      {/* Section 1 - KPI Overview */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 stagger-children">
          <StatCard
            title="Total Pages"
            value={content.pages.total}
            trend={`${content.pages.published} Published · ${content.pages.draft} Draft`}
            accentColor="from-blue-500 to-cyan-500"
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            title="Total Services"
            value={content.services.total}
            trend={`${content.services.published} Published · ${content.services.draft} Draft`}
            accentColor="from-purple-500 to-pink-500"
            icon={<Layout className="w-5 h-5" />}
          />
          <StatCard
            title="Total Blogs"
            value={content.blogs.total}
            trend={`${content.blogs.published} Pub · ${content.blogs.draft} Drf${content.blogs.scheduled ? ` · ${content.blogs.scheduled} Sch` : ''}`}
            accentColor="from-emerald-500 to-teal-500"
            icon={<MessageSquare className="w-5 h-5" />}
          />
          <StatCard
            title="Total Leads"
            value={leads.total}
            trend={`${leads.byStatus.new} New`}
            accentColor="from-amber-500 to-orange-500"
            icon={<Users className="w-5 h-5" />}
          />
          <StatCard
            title="Media Library"
            value={media.total}
            trend="Total Files"
            accentColor="from-indigo-500 to-blue-500"
            icon={<ImageIcon className="w-5 h-5" />}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 2 - Lead Overview */}
          <section className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">Lead Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-surface-hover/50 border border-card-border">
                <p className="text-2xl font-bold text-blue-500">{leads.byStatus.new}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">New</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-surface-hover/50 border border-card-border">
                <p className="text-2xl font-bold text-amber-500">{leads.byStatus.in_progress}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">In Progress</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-surface-hover/50 border border-card-border">
                <p className="text-2xl font-bold text-purple-500">{leads.byStatus.contacted}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Contacted</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-surface-hover/50 border border-card-border">
                <p className="text-2xl font-bold text-emerald-500">{leads.byStatus.closed}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Closed</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-surface-hover/50 border border-card-border">
                <p className="text-2xl font-bold text-destructive">{leads.byStatus.spam}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Spam</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">30-Day Lead Trend</h3>
              <div className="h-40 flex items-end gap-1 sm:gap-2">
                {leads.trend.map((t: LeadTrendItem, i: number) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
                    <div 
                      className="w-full bg-accent/20 rounded-t-sm group-hover:bg-accent transition-colors"
                      style={{ height: `${Math.max((t.count / maxTrend) * 100, 2)}%` }}
                    ></div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                        {t.count} Leads on {t.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3 - Recent Leads */}
          <section className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-card-border flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Leads</h2>
              <Link href="/admin/leads" className="text-sm text-accent hover:underline flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            {leads.recent.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No recent leads found.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border bg-surface-hover/30">
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.recent.map((lead: RecentLeadItem) => (
                    <tr key={lead.id} className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-sm">{lead.name}</p>
                        {lead.company && <p className="text-xs text-muted-foreground">{lead.company}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Section 6 - SEO Health */}
          <section className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">SEO Health Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Pages', data: seo.pages },
                { title: 'Services', data: seo.services },
                { title: 'Blogs', data: seo.blogs },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-xl border border-card-border bg-surface-hover/30">
                  <h3 className="font-medium mb-3">{item.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-semibold">{item.data.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Missing Title</span>
                      <span className={item.data.missingTitle > 0 ? "text-destructive font-medium" : "text-success"}>
                        {item.data.missingTitle}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Missing Desc</span>
                      <span className={item.data.missingDescription > 0 ? "text-warning font-medium" : "text-success"}>
                        {item.data.missingDescription}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Section 9 - Quick Actions */}
          <section className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/admin/pages/create" className="flex items-center p-3 rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium">
                <PlusCircle className="w-4 h-4 mr-3 text-accent" /> Create Page
              </Link>
              <Link href="/admin/blogs/create" className="flex items-center p-3 rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium">
                <PlusCircle className="w-4 h-4 mr-3 text-accent" /> Create Blog
              </Link>
              <Link href="/admin/services/create" className="flex items-center p-3 rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium">
                <PlusCircle className="w-4 h-4 mr-3 text-accent" /> Add Service
              </Link>
              <Link href="/admin/media" className="flex items-center p-3 rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium">
                <ImageIcon className="w-4 h-4 mr-3 text-accent" /> Upload Media
              </Link>
              <Link href="/admin/leads" className="flex items-center p-3 rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium">
                <Send className="w-4 h-4 mr-3 text-accent" /> View Leads
              </Link>
            </div>
          </section>

          {/* Section 5 - Requires Attention */}
          <section className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              Requires Attention
              {attention.length > 0 && (
                <span className="ml-2 bg-destructive/10 text-destructive text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {attention.length}
                </span>
              )}
            </h2>
            {attention.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                <CheckCircle className="w-10 h-10 text-success mb-2 opacity-50" />
                <p className="text-sm">You&apos;re all caught up!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {attention.map((item: AttentionItem, i: number) => (
                  <Link 
                    key={i} 
                    href={item.route}
                    className="flex items-center justify-between p-3 rounded-lg border border-warning/20 bg-warning/5 hover:bg-warning/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-warning mr-3" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold bg-warning/20 text-warning-foreground px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Section 8 - Publishing Activity */}
          <section className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">30-Day Publishing</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> Pages
                </span>
                <span className="font-semibold">{publishing.pagesPublished}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Layout className="w-4 h-4 mr-2" /> Services
                </span>
                <span className="font-semibold">{publishing.servicesPublished}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" /> Blogs
                </span>
                <span className="font-semibold">{publishing.blogsPublished}</span>
              </div>
            </div>
          </section>

          {/* Section 7 - Recent Activity */}
          <section className="bg-card-bg border border-card-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity.</p>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-card-border before:to-transparent">
                {activity.map((item: RecentActivityItem) => (
                  <div key={item.id} className="relative flex items-start gap-4">
                    <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-4 border-card-bg bg-accent -translate-x-1/2 mt-1.5 z-10" />
                    <div className="pl-8 md:pl-0 w-full">
                      <div className="bg-surface-hover/50 p-3 rounded-lg border border-card-border ml-2 md:ml-0 md:w-[calc(100%-2rem)]">
                        <p className="text-sm font-medium">
                          <span className="text-foreground">{item.actorName}</span>
                          <span className="text-muted-foreground mx-1">{item.action}</span>
                          {item.entityType && <span className="font-semibold">{item.entityType}</span>}
                        </p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{item.description}</p>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
