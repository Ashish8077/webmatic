export interface CreatePageResponse {
  page: {
    id: number;
    title: string;
    slug: string;
    status: "draft" | "published";
  };
}

// export interface Page {
//   id: number;
//   title: string;
//   slug: string;
//   status: "draft" | "published";
//   template: string | null;

//   seoTitle: string | null;
//   metaDescription: string | null;
//   metaKeywords: string | null;
//   canonicalUrl: string | null;

//   robotsIndex: boolean;

//   publishedAt: Date | null;

//   createdAt: Date;
//   updatedAt: Date;
// }
