"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  description?: string;
  backLabel?: string;
}

function PageHeader({
  title,
  description,
  backLabel = "Back to Pages",
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 cursor-pointer"
      >
        <ChevronLeft size={16} />
        {backLabel}
      </button>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}

export default PageHeader;
