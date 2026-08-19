import { RichContent } from "@/components/shared/rich-content";
import { BlogTags } from "./blog-tags";

interface BlogBodyProps {
  content: string;
  tags: { id: number; name: string }[];
}

export function BlogBody({ content, tags }: BlogBodyProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-225 px-5 sm:px-8">
        <article>
          {content ? (
            <RichContent html={content} className="prose prose-lg" />
          ) : (
            <div className="text-center py-16 px-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <p className="text-[15px] font-medium text-slate-500">This article has no content yet.</p>
            </div>
          )}

          {/* Tags */}
          <BlogTags tags={tags} />
        </article>
      </div>
    </section>
  );
}
