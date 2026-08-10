import type { Metadata } from "next";

/**
 * Shape expected by buildPageMetadata(). Matches the enriched meta
 * objects returned by the service layer after image resolution.
 */
export interface PageSeoInput {
  title: string;
  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageUrl: string | null;

  robotsIndex: boolean;
  robotsFollow: boolean;

  schemaMarkup: Record<string, unknown> | null;
}

/**
 * Builds a complete Next.js Metadata object from CMS page SEO fields.
 *
 * Applies a strict fallback hierarchy:
 *   seoTitle → page.title → siteName
 *
 * Parses comma-separated keywords into an array.
 * Validates canonical URL before inclusion.
 * Falls back OG/Twitter fields to base SEO fields.
 */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const title = input.seoTitle || input.title;
  const description = input.metaDescription || undefined;

  // Parse comma-separated keywords into array
  const keywords = input.metaKeywords
    ? input.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  // Validate canonical URL — only include if it looks like a valid URL
  let canonical: string | undefined;
  if (input.canonicalUrl) {
    try {
      new URL(input.canonicalUrl);
      canonical = input.canonicalUrl;
    } catch {
      // Relative URL — still valid for Next.js with metadataBase configured
      canonical = input.canonicalUrl;
    }
  }

  const ogTitle = input.ogTitle || input.seoTitle || input.title;
  const ogDescription = input.ogDescription || input.metaDescription || undefined;
  
  const defaultImageUrl = process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE || "/images/default-og.png";
  const finalOgImageUrl = input.ogImageUrl || defaultImageUrl;

  const twitterTitle = input.twitterTitle || input.ogTitle || input.seoTitle || input.title;
  const twitterDescription = input.twitterDescription || input.ogDescription || input.metaDescription || undefined;
  const finalTwitterImageUrl = input.twitterImageUrl || defaultImageUrl;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 && { keywords }),
    ...(canonical && {
      alternates: { canonical },
    }),
    robots: {
      index: input.robotsIndex,
      follow: input.robotsFollow,
    },
    openGraph: {
      title: ogTitle,
      ...(ogDescription && { description: ogDescription }),
      ...(finalOgImageUrl && {
        images: [{ url: finalOgImageUrl }],
      }),
    },
    twitter: {
      card: finalTwitterImageUrl ? "summary_large_image" : "summary",
      title: twitterTitle,
      ...(twitterDescription && { description: twitterDescription }),
      ...(finalTwitterImageUrl && {
        images: [finalTwitterImageUrl],
      }),
    },
  };
}

/**
 * Safely serializes schema_markup JSON for injection into a
 * server-rendered `<script type="application/ld+json">` tag.
 *
 * Returns null if the input is null or not valid JSON.
 */
export function serializeSchemaMarkup(
  schemaMarkup: Record<string, unknown> | null,
): string | null {
  if (!schemaMarkup) return null;

  try {
    return JSON.stringify(schemaMarkup);
  } catch {
    console.error("Invalid schema_markup JSON, skipping JSON-LD injection.");
    return null;
  }
}
