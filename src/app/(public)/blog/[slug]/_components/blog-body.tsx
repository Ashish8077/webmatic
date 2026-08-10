import { RichContent } from "@/components/shared/rich-content";
import { BlogTags } from "./blog-tags";

interface BlogBodyProps {
  content: string;
  tags: { id: number; name: string }[];
}

export function BlogBody({ content, tags }: BlogBodyProps) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[850px] px-5 sm:px-8">
        <article>
          {content ? (
            <RichContent html={content} className="prose-lg" />
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="text-lg">This article has no content yet.</p>
            </div>
          )}

          {/* Tags */}
          <BlogTags tags={tags} />
        </article>
      </div>
    </section>
  );
}
