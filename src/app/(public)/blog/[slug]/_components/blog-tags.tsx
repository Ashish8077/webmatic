import { Tag } from "lucide-react";

interface BlogTagsProps {
  tags: { id: number; name: string }[];
}

export function BlogTags({ tags }: BlogTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-8 mt-8 border-t border-slate-200">
      <Tag size={16} className="text-slate-400 mr-1" aria-hidden="true" />
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-medium bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
