export const aboutSections = [
  {
    sectionType: "about-hero",
    sortOrder: 0,
    content: {
      badge: "KNOW MORE ABOUT US",
      heading: "Learn a little more about us.",
      highlight: "",
      description:
        "Webmatic Technology is a Full-service Creative and Strategic Digital Marketing serving businesses of all sizes worldwide.",
      button: { text: "", url: "#statistics" },
      imageId: null,
    },
    settings: {},
  },
  {
    sectionType: "company-statistics",
    sortOrder: 1,
    content: {
      items: [
        {
          number: "5",
          suffix: "+",
          title: "Years of Innovation and Creativity",
          description: "",
          iconId: null,
          sortOrder: 1,
        },
        {
          number: "89",
          suffix: "+",
          title: "People Working to Make the World a Better",
          description: "",
          iconId: null,
          sortOrder: 2,
        },
        {
          number: "5",
          suffix: "+",
          title: "Countries Operated in Around the World",
          description: "",
          iconId: null,
          sortOrder: 3,
        },
      ],
    },
    settings: {},
  },
  {
    sectionType: "company-overview",
    sortOrder: 2,
    content: {
      badge: "GET TO KNOW US BETTER",
      heading: "Driven by a Passion to Bring New Ideas to Life",
      description:
        "This has always been the belief at Webmatic Technology Pvt Ltd, so never forget to provide the best IT solutions and digital marketing services. The company started with a simple business plan since its inception and has grown into an award-winning global-level digital marketing agency.\n\nSince our foundation, we have produced outstanding results that surpass expectations. Our vision was to change the face of digital marketing and to become a brand people rely on, delivering both quality and innovation. We focus on developing high-performance websites or improving online presence through SEO, PPC, and analytics services. We feel we're on a great journey with our clients and can't wait for what awaits us in the future.",
      primaryButton: { text: "Speak With An Expert", url: "/contact" },
      bottomText: {
        supportingText: "We Serve our Clients' Best Interests with the Best Marketing Solutions.",
        linkText: "Find Out More",
        linkUrl: "/services"
      }
    },
    settings: {},
  },
  {
    sectionType: "core-values",
    sortOrder: 3,
    content: {
      badge: "CORE VALUES",
      heading: "3 Reasons Why Webmatic Technology is Your Ideal Digital Marketing Partner",
      values: [
        {
          title: "Customers First",
          description: "Webmatic Technology starts by fully understanding your business objectives. Every strategy we create is designed with your goals at the forefront, ensuring we drive the results that matter most to you.",
          iconId: null,
          linkText: "Find Out More",
          linkUrl: "/about"
        },
        {
          title: "Exceptional Team",
          description: "Our talented in-house team combines agency expertise with enterprise-level knowledge. We offer various backgrounds and expertise to deliver unique digital marketing solutions.",
          iconId: null,
          linkText: "Meet The Team",
          linkUrl: "/team"
        },
        {
          title: "Reliable Support",
          description: "We make communication easy. Our support team is always accessible, and our average response time is incredibly fast—ensuring you get the help you need when you need it.",
          iconId: null,
          linkText: "Talk to Customer Support",
          linkUrl: "/contact"
        }
      ]
    },
    settings: {},
  }
] as const;
