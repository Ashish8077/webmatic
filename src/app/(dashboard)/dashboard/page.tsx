"use client";

import { StatCard } from "@/components/ui/stat-card";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { dummyPages, dummySections } from "@/lib/dummy-data";

export default function DashboardPage() {
  const totalPages = dummyPages.length;
  const publishedPages = dummyPages.filter(
    (p) => p.status === "published",
  ).length;
  const draftPages = dummyPages.filter((p) => p.status === "draft").length;
  const totalSections = dummySections.length;

  const { data: user } = useCurrentUser();

  console.log(user);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
        <StatCard
          title="Total Pages"
          value={totalPages}
          trend="+2 this month"
          accentColor="from-accent to-blue-500"
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          }
        />
        <StatCard
          title="Published"
          value={publishedPages}
          accentColor="from-emerald-500 to-green-500"
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
        <StatCard
          title="Drafts"
          value={draftPages}
          accentColor="from-amber-500 to-yellow-500"
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          }
        />
        <StatCard
          title="Total Sections"
          value={totalSections}
          accentColor="from-purple-500 to-pink-500"
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
          }
        />
      </div>

      {/* Recent Pages */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Recent Pages
        </h2>
        <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Title
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyPages.slice(0, 5).map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground">
                      {page.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      /{page.slug}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`
                        inline-flex items-center px-2.5 py-0.5
                        text-xs font-semibold rounded-full border
                        ${
                          page.status === "published"
                            ? "bg-success/15 text-success border-success/20"
                            : "bg-warning/15 text-warning border-warning/20"
                        }
                      `}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground hidden md:table-cell">
                    {new Date(page.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
