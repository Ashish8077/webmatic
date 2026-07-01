import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  accentColor?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  accentColor = "from-accent to-purple-500",
}: StatCardProps) {
  return (
    <div
      className="
        group relative overflow-hidden
        bg-card-bg border border-card-border rounded-2xl
        p-6 transition-all duration-300
        hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5
        hover:-translate-y-0.5
      "
    >
      {/* Gradient accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {trend && (
            <p className="text-xs text-success mt-2 font-medium">{trend}</p>
          )}
        </div>
        <div
          className="
            p-3 rounded-xl bg-accent/10 text-accent
            group-hover:bg-accent/20 transition-colors duration-300
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
