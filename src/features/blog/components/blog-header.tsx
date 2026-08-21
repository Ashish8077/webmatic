"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlogHeaderProps {
  title: string;
  description?: string;
  backLabel?: string;
  children?: React.ReactNode;
}

function BlogHeader({
  title,
  description,
  backLabel = "Back to Blogs",
  children,
}: BlogHeaderProps) {
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
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {children}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}

export default BlogHeader;
