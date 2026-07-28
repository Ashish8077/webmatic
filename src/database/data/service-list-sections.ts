export const serviceListSections = [
  {
    sectionType: "services-hero",
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
    sectionType: "services",
    sortOrder: 2,
    content: {
      badge: "WHAT WE DO",
      heading: "We Believe in Building Strong Brands and",
      highlight: "Integrated Strategies.",
      viewAllButton: null,
      bottomText: null,
      primaryButton: null,
    },
    settings: null,
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
