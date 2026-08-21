import { Tag } from "lucide-react";

interface BlogTagsProps {
  tags: { id: number; name: string }[];
}

export function BlogTags({ tags }: BlogTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-10 mt-10 border-t border-slate-200">
      <div className="flex items-center gap-2 mr-2">
        <Tag size={18} className="text-slate-400" strokeWidth={2} aria-hidden="true" />
        <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">Tags</span>
      </div>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center px-4 py-2 rounded-full text-[13px] font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-200"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
