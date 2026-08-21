export const homeSections = [
  {
    sectionType: "hero",
    sortOrder: 0,
    content: {
      slides: [
        {
          badge: "Winning  Digital Marketing Strategy",
          headline: "Take Your Brand Further with",
          highlight: "Expert Digital Marketing",
          subheadline: "Transforming your online presence, driving growth, and delivering real results through data-driven strategies.",
          primaryButton: { url: "/contact", text: "Get Started" },
          secondaryButton: { url: "/services", text: "Our Services" },
          backgroundImageId: null,
        },
        {
          badge: "Marketing Must Drive The Results",
          headline: "We Build Campaigns That",
          highlight: "Convert & Grow",
          subheadline: "Drive business growth with creativity, analytics, and a strategy built around your goals.",
          primaryButton: { url: "/work", text: "See Our Work" },
          secondaryButton: { url: "/about-us", text: "Learn More" },
          backgroundImageId: null,
        },
        {
          badge: "Ready to Grow Your Business?",
          headline: "Crafting Digital Experiences That",
          highlight: "Elevate Brands",
          subheadline: "From stunning web design to cohesive brand identities, we build the digital face of your business.",
          primaryButton: { url: "/work", text: "View Portfolio" },
          secondaryButton: { url: "/contact", text: "Contact Us" },
          backgroundImageId: null,
        }
      ]
    },
    settings: {
      loop: true,
      autoplay: true,
      autoplayDelay: 5000,
      showNavigation: true,
      showPagination: true
    },
  },
  {
    sectionType: "about",
    sortOrder: 1,
    content: {
      badge: "About Webmatic",
      heading: "Get to Know",
      highlight: "Us Better",
      description: "At Webmatic Technology, we've been dedicated to providing exceptional IT solutions and digital marketing services, evolving from a simple business plan to a globally recognised, award-winning agency.",
      bottomText: "We serve our clients' best interests with the best marketing solutions.",
      primaryButton: { url: "/contact", text: "Start a Project" },
      learnMoreButton: { url: "/about-us", text: "Learn more about us" },
      cards: [
        {
          badge: "Our Services",
          title: "How We Can Help?",
          description: "From SEO to paid ads, we offer end-to-end digital solutions tailored to your business goals.",
          button: { url: "/services", text: "View All Services" },
          imageId: null
        },
        {
          badge: "Our Expertise",
          title: "Why Choose Webmatic",
          description: "Award-winning strategies backed by data, creativity, and a team that treats your brand like their own.",
          button: { url: "/about-us", text: "What Makes Us Special" },
          imageId: null
        },
        {
          badge: "Success Stories",
          title: "Bring Innovative Thinking",
          description: "See how we've helped brands grow their online presence and achieve measurable, lasting results.",
          button: { url: "/work", text: "View Success Stories" },
          imageId: null
        }
      ]
    },
    settings: null,
  },
  {
    sectionType: "services",
    sortOrder: 2,
    content: {
      badge: "What We Provide",
      heading: "Building Powerful Brands with",
      highlight: "Integrated Strategies",
      bottomText: "Not sure which service fits your needs? Let's figure it out together.",
      primaryButton: { url: "/contact", text: "Talk to Us" },
      viewAllButton: { url: "/services", text: "View all services" }
    },
    settings: {
      columns: 1,
      showIcons: true
    },
  },
  {
    sectionType: "portfolio",
    sortOrder: 3,
    content: {
      badge: "Our Portfolio",
      heading: "A Collection of Our Work",
      description: "We present the following case studies to showcase the solutions and services we offer to our diverse customer base. The Tech for Good movement leverages technology's potential to create positive impact.",
      projects: [
        {
          title: "ASG Parners",
          category: "Web Development",
          description: "ASG & PARTNERS is a full-service law firm with offices in New Delhi, Mumbai.",
          url: "/projects/asg-partners",
          imageId: null
        },
        {
          title: "Bigmans Academy",
          category: "Web Development",
          description: "A Bigmans Academy is a unit of Bigmans Consultant & Marketing Pvt. Ltd.",
          url: "/projects/bigmans-academy",
          imageId: null
        },
        {
          title: "Mannaniya",
          category: "E-CommerceWeb Development",
          description: "Maananiya.com is an online e-commerce platform offering a wide range of stuff.",
          url: "/projects/mannaniya",
          imageId: null
        },
        {
          title: "Zing Drops",
          category: "E-CommerceWeb Development",
          description: "You can easily make it your own adding your graphics",
          url: "/projects/zing-drops",
          imageId: null
        },
        {
          title: "ITSE",
          category: "Web Development",
          description: "The International Talent Search Examination (ITSE) is a prestigious assessment",
          url: "/projects/itse",
          imageId: null
        },
        {
          title: "Kite Star Grocery",
          category: "E-CommerceWeb Development",
          description: "Easily make it your own thanks to the smart layer.",
          url: "/projects/kite-star-grocery",
          imageId: null
        }
      ]
    },
    settings: null,
  },
  {
    sectionType: "why-choose-us",
    sortOrder: 4,
    content: {
      badge: "Why Choose Us",
      heading: "3 Reasons Why Webmatic is Your",
      highlight: "Ideal Partner",
      description: "Three core commitments that set us apart from every other digital marketing agency.",
      bottomText: "Still not sure? Let's talk — no pressure, no commitment.",
      primaryButton: { url: "/contact", text: "Talk to Us" },
      learnMoreButton: { url: "/about-us", text: "Learn more about us" },
      reasons: [
        {
          key: "customers-first",
          title: "Customers First",
          description: "Webmatic Technology starts by fully understanding your business objectives. Every strategy we create is designed with your goals at the forefront, ensuring we drive the results that matter most to you.",
          button: { url: "/about-us", text: "Find Out More" },
        },
        {
          key: "exceptional-team",
          title: "Exceptional Team",
          description: "With our best in-house agency know-how, we can boast of having enterprise-level experience with a talented in-house team that definitely brings to the table when it comes to innovative digital marketing solutions.",
          button: { url: "/about-us", text: "Meet The Team" },
        },
        {
          key: "reliable-support",
          title: "Reliable Support",
          description: "We make communication easy. Our support is available 24/7; our average response time is simply ludicrous, so you're sure to have help when you might need it.",
          button: { url: "/contact", text: "Talk to Customer Support" },
        }
      ]
    },
    settings: null,
  },
  {
    sectionType: "testimonials",
    sortOrder: 5,
    content: {
      badge: "Client Testimonials",
      heading: "What Our",
      highlight: "Clients Say",
      description: "Real words from real clients who've grown with Webmatic Technology.",
    },
    settings: null,
  },
  {
    sectionType: "faq",
    sortOrder: 6,
    content: {
      badge: "Frequently Asked Questions",
      heading: "Everything You Need",
      highlight: "To Know",
      description: "Find answers to the most common questions about our services, process, pricing, and support.",
      bottomText: "Still have questions? We'd be happy to help.",
      primaryButton: { url: "/contact", text: "Contact Us" },
      items: [
        {
          question: "What services does Webmatic Technology provide?",
          answer: "We offer web development, mobile app development, digital marketing, branding, SEO, content writing, UI/UX design, and custom software solutions tailored to your business needs."
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines depend on complexity and requirements. Most websites are completed within 4–8 weeks, while larger custom solutions may require additional time."
        },
        {
          question: "Do you provide support after project delivery?",
          answer: "Yes. We provide ongoing maintenance, technical support, security updates, and performance monitoring to ensure your solution continues to run smoothly."
        },
        {
          question: "Can you improve our existing website instead of building a new one?",
          answer: "Absolutely. We can redesign, optimize, improve performance, enhance SEO, and add new functionality to your existing website based on your business goals."
        },
        {
          question: "How do we get started with Webmatic Technology?",
          answer: "Simply contact us through our website or request a consultation. We'll discuss your requirements, understand your business objectives, and recommend the best solution."
        }
      ]
    },
    settings: null,
  },
  {
    sectionType: "contact-cta",
    sortOrder: 7,
    content: {
      badge: "Let's Work Together",
      heading: "Ready to Grow",
      description: "Whether you need a new website, digital marketing, branding, or a custom software solution, our team is ready to help you achieve your business goals.",
      primaryButton: { url: "/contact", text: "Start Your Project" },
      secondaryButton: { url: "/services", text: "View Our Services" },
      backgroundImageId: null
    },
    settings: {
      overlayOpacity: 0
    },
  }
] as const;
