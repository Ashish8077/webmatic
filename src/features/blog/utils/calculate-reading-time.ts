/**
 * Average reading speed in words per minute.
 * Standard estimate for non-fiction / blog content.
 */
const AVERAGE_READING_WPM = 200;

/**
 * Estimates reading time for HTML content.
 *
 * Strips HTML tags, counts words, and returns rounded minutes (minimum 1).
 *
 * @param htmlContent - Raw HTML string from the CMS editor.
 * @returns Estimated reading time in minutes.
 */
export function calculateReadingTime(htmlContent: string): number {
  if (!htmlContent) return 1;

  // Strip HTML tags and decode common entities
  const text = htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = text.split(" ").filter(Boolean).length;
  const minutes = Math.ceil(wordCount / AVERAGE_READING_WPM);

  return Math.max(1, minutes);
}
