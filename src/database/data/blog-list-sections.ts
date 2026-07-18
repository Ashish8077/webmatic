export const blogListSections = [
  {
    sectionType: "hero",
    sortOrder: 0,
    content: {
      headline: "",
      subheadline: "",
      backgroundImageId: null,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "introduction",
    sortOrder: 1,
    content: {
      heading: "",
      subheading: "",
      description: "",
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "featured-blogs",
    sortOrder: 2,
    content: {
      heading: "",
      limit: 3,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "blog-list",
    sortOrder: 3,
    content: {
      heading: "",
      postsPerPage: 9,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "newsletter-cta",
    sortOrder: 4,
    content: {
      heading: "",
      description: "",
      buttonText: "",
      buttonUrl: "",
    },
    settings: {
      isVisible: true,
    },
  },
] as const;
