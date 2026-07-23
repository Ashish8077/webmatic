import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import type { AboutHeroContentValues } from "@/features/page-sections/schemas/about-hero.schema";
import type { SectionProps } from "@/components/home/sections/types";

export function AboutHeroSection({ content }: SectionProps) {
  const data = content as unknown as AboutHeroContentValues;

  const badge = data.badge;
  const heading = data.heading;
  const highlight = data.highlight;
  const description = data.description;
  const imageUrl = data.imageId ? `/api/media/${data.imageId}` : "/hero/hero.jpg";

  return (
    <section className="relative w-full h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="About Us Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-[#35465c]/90 md:bg-gradient-to-r md:from-[#35465c] md:via-[#35465c]/80 md:to-transparent z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 mx-auto w-full max-w-[1170px] px-5 sm:px-8">
        <div className="max-w-2xl text-white">
          {badge && (
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              {badge}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6">
            {heading}{" "}
            {highlight && (
              <span className="text-orange-500 block mt-2">{highlight}</span>
            )}
          </h1>

          {description && (
            <p className="text-base md:text-lg text-slate-200/90 leading-relaxed mb-10 max-w-xl">
              {description}
            </p>
          )}

          {data.ctaLabel && (
            <Link
              href={data.ctaTargetId ? `#${data.ctaTargetId}` : "#"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-hero-primary px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg transition-all duration-200 hover:bg-hero-primary-hover hover:-translate-y-0.5 active:translate-y-0"
              aria-label={data.ctaLabel}
            >
              {data.ctaLabel}
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
