/**
 * Generic rich HTML content renderer for CMS content.
 *
 * Used by: Blogs, Services, Pages, and any future CMS module.
 * Uses Tailwind Typography (@tailwindcss/typography) for consistent styling.
 *
 * Sanitization policy:
 * Content is trusted from the CMS admin (TipTap editor).
 * If untrusted content sources are added, introduce DOMPurify here.
 */

interface RichContentProps {
  /** Raw HTML string from the CMS editor. */
  html: string;
  /** Additional Tailwind prose classes (e.g. "prose-lg", "prose-sm"). */
  className?: string;
}

export function RichContent({ html, className = "" }: RichContentProps) {
  if (!html) return null;

  return (
    <div
      className={`prose max-w-none text-slate-600 prose-headings:text-navy prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-700 prose-img:rounded-xl marker:text-orange-500 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
