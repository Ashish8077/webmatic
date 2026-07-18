export const aboutSections = [
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
    sectionType: "company-overview",
    sortOrder: 1,
    content: {
      heading: "",
      subheading: "",
      description: "",
      imageId: null,
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "mission-vision",
    sortOrder: 2,
    content: {
      missionTitle: "",
      missionDescription: "",
      visionTitle: "",
      visionDescription: "",
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "team",
    sortOrder: 3,
    content: {
      heading: "",
      subheading: "",
      members: [],
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "statistics",
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
    sectionType: "gallery",
    sortOrder: 5,
    content: {
      heading: "",
      images: [],
    },
    settings: {
      isVisible: true,
    },
  },

  {
    sectionType: "contact-cta",
    sortOrder: 6,
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
