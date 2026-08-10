import { PageSectionType } from "@/modules/pages-section/constants/page-section-types";
export interface HomePageMeta {
  title: string;

  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;

  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: number | null;
  ogImageUrl: string | null;

  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: number | null;
  twitterImageUrl: string | null;

  robotsIndex: boolean;
  robotsFollow: boolean;

  schemaMarkup: Record<string, unknown> | null;
}

export interface HomeSectionData {
  id: number;
  sectionType: PageSectionType;
  title: string | null;
  /** Raw JSON content stored in the database. */
  content: Record<string, unknown>;
  settings: Record<string, unknown> | null;
  sortOrder: number;
}

export interface HomePageData {
  meta: HomePageMeta;
  sections: HomeSectionData[];
}
