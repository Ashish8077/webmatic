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
  const button = data.button;
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
            {heading}
            {highlight && (
              <span className="block">{highlight}</span>
            )}
          </h1>

          <p className="text-base md:text-lg text-slate-200/90 leading-relaxed mb-10 max-w-xl">
            {description}
          </p>

          {button?.url && (
            <Link
              href={button.url}
              className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full text-slate-800 hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-lg group"
              aria-label={button.text || "Scroll down"}
            >
              <ArrowDown className="w-6 h-6 group-hover:animate-bounce" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
