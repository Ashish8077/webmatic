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
    sectionType: "blog-list",
    sortOrder: 1,
    content: {
      heading: "",
      postsPerPage: 9,
    },
    settings: {
      isVisible: true,
    },
  },
] as const;
