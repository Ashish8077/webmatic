interface BadgeProps {
  variant: "published" | "draft" | "active" | "inactive" | "default" | "secondary";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  published: "bg-success/15 text-success border-success/20",
  draft: "bg-warning/15 text-warning border-warning/20",
  active: "bg-success/15 text-success border-success/20",
  inactive: "bg-muted-foreground/15 text-muted-foreground border-muted/20",
  default: "bg-accent/15 text-accent border-accent/20",
  secondary: "bg-surface-hover text-muted-foreground border-card-border",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs font-semibold rounded-full border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
