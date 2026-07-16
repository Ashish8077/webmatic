import { PageStatus } from "@/modules/pages/constants/page.constants";

export const systemPages: readonly {
  title: string;
  slug: string;
  template: string;
  status: PageStatus;
}[] = [
  {
    title: "Home",
    slug: "",
    template: "home",
    status: "published" as const,
  },
  {
    title: "About",
    slug: "about",
    template: "about",
    status: "published" as const,
  },
  {
    title: "Services",
    slug: "services",
    template: "service-list",
    status: "published" as const,
  },
  {
    title: "Blog",
    slug: "blog",
    template: "blog-list",
    status: "published" as const,
  },
  {
    title: "Contact",
    slug: "contact",
    template: "contact",
    status: "published" as const,
  },
];
