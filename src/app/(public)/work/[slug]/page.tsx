import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getWorkProjectBySlugService } from "@/modules/work/services/get-work-project-details.service";
import { serializeSchemaMarkup } from "@/lib/seo/build-page-metadata";
import { RichContent } from "@/components/shared/rich-content";
import { WORK_CATEGORY_LABELS } from "@/modules/work/constants/work.constants";

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const project = await getWorkProjectBySlugService(slug);
    
    // Parse comma-separated keywords into array
    const keywords = project.metaKeywords
      ? project.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined;

    return {
      title: project.seoTitle || `${project.title} | Our Work`,
      description: project.metaDescription || project.shortDescription || undefined,
      ...(keywords && keywords.length > 0 && { keywords }),
      alternates: {
        canonical: project.canonicalUrl || undefined,
      },
      openGraph: {
        title: project.openGraphTitle || project.seoTitle || project.title,
        description: project.openGraphDescription || project.metaDescription || project.shortDescription || "",
        ...(project.openGraphImage?.url && {
          images: [{ url: project.openGraphImage.url }],
        }),
      },
      twitter: {
        card: project.twitterImage?.url ? "summary_large_image" : "summary",
        title: project.twitterTitle || project.openGraphTitle || project.seoTitle || project.title,
        description: project.twitterDescription || project.openGraphDescription || project.metaDescription || project.shortDescription || "",
        ...(project.twitterImage?.url && {
          images: [project.twitterImage.url],
        }),
      },
    };
  } catch (error) {
    console.error("Metadata Error:", error);
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }
}

export default async function WorkProjectDetailsPage({ params }: WorkPageProps) {
  let project;
  
  try {
    const { slug } = await params;
    project = await getWorkProjectBySlugService(slug);
  } catch (error) {
    console.error("Page Error:", error);
    notFound();
  }

  const heroImage = project.featuredImage?.url
      ? project.featuredImage.url
      : null;

  const jsonLd = serializeSchemaMarkup(project.schemaMarkup as Record<string, unknown> | null);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <Header />
      <main className="pt-26">
        {/* 1. Hero Banner */}
        <PageHero
          title={project.title}
          description={project.shortDescription || ""}
          bannerImage={heroImage}
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Our Work", href: "/work" },
                { label: project.title },
              ]}
              theme="light"
            />
          }
          theme="light"
        />

        {/* 2. Project Details */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-225 px-5 sm:px-8">
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {WORK_CATEGORY_LABELS[project.category as keyof typeof WORK_CATEGORY_LABELS] || project.category}
              </span>
              {project.projectUrl && (
                <a 
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 text-sm font-medium transition-colors"
                >
                  Visit Live Project &rarr;
                </a>
              )}
            </div>

            {project.description && (
              <RichContent html={project.description} className="prose" />
            )}
          </div>
        </section>

      </main>
    </>
  );
}
