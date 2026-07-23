// ─────────────────────────────────────────────
// Dummy Data Layer
// ─────────────────────────────────────────────
// All dummy data in one place. Matches the API response shapes
// so you can swap in fetch() calls later with minimal changes.



export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface DummyPage {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  template: string | null;
  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaMarkup: Record<string, unknown> | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DummySection {
  id: number;
  pageId: number;
  sectionType: string;
  title: string | null;
  content: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Dummy User ──────────────────────────────

export const dummyUser: DummyUser = {
  id: 1,
  firstName: "Ashish",
  lastName: "Admin",
  email: "admin@example.com",
  role: "super-admin",
};

// ─── Dummy Pages ─────────────────────────────

export const dummyPages: DummyPage[] = [
  {
    id: 1,
    title: "Home Page",
    slug: "home",
    status: "published",
    template: "default",
    seoTitle: "Welcome to Our Website",
    metaDescription:
      "The main landing page of our website with all key information.",
    metaKeywords: "home, landing, main",
    canonicalUrl: null,
    robotsIndex: true,
    robotsFollow: true,
    schemaMarkup: null,
    publishedAt: "2025-12-01T10:00:00.000Z",
    createdAt: "2025-11-28T08:30:00.000Z",
    updatedAt: "2026-06-15T14:20:00.000Z",
  },
  {
    id: 2,
    title: "About Us",
    slug: "about-us",
    status: "published",
    template: "default",
    seoTitle: "About Our Company",
    metaDescription: "Learn about our company mission, vision, and team.",
    metaKeywords: "about, company, team",
    canonicalUrl: null,
    robotsIndex: true,
    robotsFollow: true,
    schemaMarkup: null,
    publishedAt: "2025-12-05T12:00:00.000Z",
    createdAt: "2025-12-02T09:00:00.000Z",
    updatedAt: "2026-05-20T11:30:00.000Z",
  },
  {
    id: 3,
    title: "Our Services",
    slug: "services",
    status: "published",
    template: "services",
    seoTitle: "Professional Services We Offer",
    metaDescription: "Explore the range of professional services we provide.",
    metaKeywords: "services, solutions, professional",
    canonicalUrl: null,
    robotsIndex: true,
    robotsFollow: true,
    schemaMarkup: null,
    publishedAt: "2026-01-10T09:00:00.000Z",
    createdAt: "2026-01-08T15:00:00.000Z",
    updatedAt: "2026-06-10T16:45:00.000Z",
  },
  {
    id: 4,
    title: "Contact Us",
    slug: "contact",
    status: "published",
    template: "contact",
    seoTitle: "Get In Touch",
    metaDescription: "Contact us for inquiries, support, or partnerships.",
    metaKeywords: "contact, support, reach",
    canonicalUrl: null,
    robotsIndex: true,
    robotsFollow: true,
    schemaMarkup: null,
    publishedAt: "2026-02-14T10:30:00.000Z",
    createdAt: "2026-02-12T08:00:00.000Z",
    updatedAt: "2026-06-20T13:10:00.000Z",
  },
  {
    id: 5,
    title: "Privacy Policy",
    slug: "privacy-policy",
    status: "draft",
    template: null,
    seoTitle: "Privacy Policy",
    metaDescription: "Our privacy policy outlines how we handle your data.",
    metaKeywords: "privacy, policy, data",
    canonicalUrl: null,
    robotsIndex: false,
    robotsFollow: false,
    schemaMarkup: null,
    publishedAt: null,
    createdAt: "2026-03-01T11:00:00.000Z",
    updatedAt: "2026-06-18T09:00:00.000Z",
  },
  {
    id: 6,
    title: "Careers",
    slug: "careers",
    status: "draft",
    template: null,
    seoTitle: null,
    metaDescription: null,
    metaKeywords: null,
    canonicalUrl: null,
    robotsIndex: true,
    robotsFollow: true,
    schemaMarkup: null,
    publishedAt: null,
    createdAt: "2026-06-25T07:30:00.000Z",
    updatedAt: "2026-06-25T07:30:00.000Z",
  },
];

// ─── Dummy Sections ──────────────────────────

export const dummySections: DummySection[] = [
  // Home Page sections
  {
    id: 1,
    pageId: 1,
    sectionType: "hero",
    title: "Hero Banner",
    content: {
      heading: "Build Something Amazing",
      subheading: "We help businesses transform their digital presence",
      ctaText: "Get Started",
      ctaLink: "/contact",
    },
    sortOrder: 0,
    isActive: true,
    createdAt: "2025-12-01T10:00:00.000Z",
    updatedAt: "2026-06-15T14:20:00.000Z",
  },
  {
    id: 2,
    pageId: 1,
    sectionType: "why_choose_us",
    title: "Our Features",
    content: {
      features: [
        {
          icon: "zap",
          title: "Fast",
          description: "Lightning fast performance",
        },
        {
          icon: "shield",
          title: "Secure",
          description: "Enterprise-grade security",
        },
        {
          icon: "code",
          title: "Modern",
          description: "Built with latest tech",
        },
      ],
    },
    sortOrder: 1,
    isActive: true,
    createdAt: "2025-12-01T10:00:00.000Z",
    updatedAt: "2026-06-15T14:20:00.000Z",
  },
  {
    id: 3,
    pageId: 1,
    sectionType: "testimonials",
    title: "What Our Clients Say",
    content: {
      testimonials: [
        {
          name: "John Doe",
          role: "CEO",
          quote: "Outstanding service and results.",
        },
        {
          name: "Jane Smith",
          role: "CTO",
          quote: "Transformed our business completely.",
        },
      ],
    },
    sortOrder: 2,
    isActive: true,
    createdAt: "2025-12-01T10:00:00.000Z",
    updatedAt: "2026-06-15T14:20:00.000Z",
  },
  {
    id: 4,
    pageId: 1,
    sectionType: "cta",
    title: "Ready to Start?",
    content: {
      heading: "Let's Build Together",
      buttonText: "Contact Us",
      buttonLink: "/contact",
    },
    sortOrder: 3,
    isActive: false,
    createdAt: "2025-12-01T10:00:00.000Z",
    updatedAt: "2026-06-15T14:20:00.000Z",
  },

  // About Us sections
  {
    id: 5,
    pageId: 2,
    sectionType: "about",
    title: "Who We Are",
    content: {
      text: "We are a team of passionate developers building modern web solutions.",
      image: "/images/team.jpg",
    },
    sortOrder: 0,
    isActive: true,
    createdAt: "2025-12-02T09:00:00.000Z",
    updatedAt: "2026-05-20T11:30:00.000Z",
  },

  // Services sections
  {
    id: 7,
    pageId: 3,
    sectionType: "services",
    title: "What We Offer",
    content: {
      services: [
        {
          title: "Web Development",
          description: "Full-stack web applications",
        },
        { title: "Mobile Apps", description: "iOS and Android development" },
        { title: "Cloud Solutions", description: "AWS, GCP, Azure services" },
      ],
    },
    sortOrder: 0,
    isActive: true,
    createdAt: "2026-01-08T15:00:00.000Z",
    updatedAt: "2026-06-10T16:45:00.000Z",
  },

  // Contact sections
  {
    id: 9,
    pageId: 4,
    sectionType: "faq",
    title: "Send us a Message",
    content: {
      fields: ["name", "email", "phone", "message"],
      submitText: "Send Message",
    },
    sortOrder: 0,
    isActive: true,
    createdAt: "2026-02-12T08:00:00.000Z",
    updatedAt: "2026-06-20T13:10:00.000Z",
  },
];

// ─── Helper Functions ────────────────────────

export function getSectionsForPage(pageId: number): DummySection[] {
  return dummySections
    .filter((s) => s.pageId === pageId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPageById(pageId: number): DummyPage | undefined {
  return dummyPages.find((p) => p.id === pageId);
}

let nextPageId = dummyPages.length + 1;
let nextSectionId = dummySections.length + 1;

export function generatePageId(): number {
  return nextPageId++;
}

export function generateSectionId(): number {
  return nextSectionId++;
}
