interface LeadsHeaderProps {
  title: string;
}

export function LeadsHeader({ title }: LeadsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage, filter, and view incoming contact requests.</p>
      </div>
    </div>
  );
}
