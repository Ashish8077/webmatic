import type { Metadata } from "next";
import { getHomePageData } from "@/modules/home/services/get-home-page";
import { SectionRenderer } from "@/components/home/section-renderer";
import { Header } from "@/components/layout/header";

/**
 * ISR: revalidate the page every 60 seconds so content changes in the CMS
 * are reflected without a full redeploy.
 */
export const revalidate = 60;

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();

  if (!data) {
    return {
      title: "Home",
      description: "Welcome to our website.",
    };
  }

  const { meta } = data;

  return {
    title: meta.seoTitle ?? meta.title,
    description: meta.metaDescription ?? undefined,
    ...(meta.canonicalUrl && {
      alternates: { canonical: meta.canonicalUrl },
    }),
    robots: {
      index: meta.robotsIndex,
      follow: meta.robotsFollow,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const data = await getHomePageData();

  // Home page not yet published — render a graceful placeholder.
  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="relative">
          <div
            className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            }}
          />
          <h1 className="relative text-5xl sm:text-6xl font-extrabold gradient-text mb-4">
            Coming Soon
          </h1>
          <p className="relative text-muted-foreground text-lg">
            We&apos;re working on something great.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-[104px]">
        {data.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
    </>
  );
}
