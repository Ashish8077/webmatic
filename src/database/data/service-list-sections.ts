export const serviceListSections = [
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
    sectionType: "services",
    sortOrder: 2,
    content: {
      heading: "",
      subheading: "",
      featuredOnly: false,
      limit: 0,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "why-choose-us",
    sortOrder: 3,
    content: {
      heading: "",
      description: "",
      items: [],
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "faq",
    sortOrder: 4,
    content: {
      heading: "",
      items: [],
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "contact-cta",
    sortOrder: 5,
    content: {
      heading: "",
      description: "",
      primaryButtonText: "",
      primaryButtonUrl: "",
      secondaryButtonText: "",
      secondaryButtonUrl: "",
      backgroundImageId: null,
    },
    settings: {
      isVisible: true,
    },
  },
] as const;
