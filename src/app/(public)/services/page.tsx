import type { Metadata } from "next";
import { getServiceListPageData } from "@/modules/pages/services/get-public-page";
import { SectionRenderer } from "@/components/home/section-renderer";

export const metadata: Metadata = {
  title: "Services | CMS Admin",
  description:
    "Explore our comprehensive range of services tailored to elevate your business.",
};

export default async function ServicesPage() {
  const pageData = await getServiceListPageData();

  if (!pageData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="mt-4 text-muted-foreground">Loading services...</p>
      </main>
    );
  }

  // Sort sections by sortOrder just like the home page
  const sortedSections = [...pageData.sections].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <>
      <main className="pt-[104px]">
        {sortedSections.map((section) => (
          <SectionRenderer key={section.id} section={section} pageTitle={pageData.meta.title} />
        ))}
      </main>
    </>
  );
}
