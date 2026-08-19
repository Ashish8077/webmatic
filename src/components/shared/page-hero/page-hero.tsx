import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import React from "react";

export interface CtaLink {
  text: string;
  href: string;
}

export interface PageHeroProps {
  /** The main title content. Pass a ReactNode for custom styling (e.g., spans for highlights). */
  title: React.ReactNode;
  /** Optional secondary description text. */
  description?: React.ReactNode;
  /** Optional background image URL. If missing, a gradient geometric pattern is shown. */
  bannerImage?: string | null;
  /** Navigation breadcrumbs component (e.g. <Breadcrumbs />). */
  breadcrumbs?: React.ReactNode;
  /** Primary call to action button. */
  primaryCta?: CtaLink;
  /** Secondary call to action button. */
  secondaryCta?: CtaLink;
  /** Overall color theme. */
  theme?: "light" | "dark";
}

export function PageHero({
  title,
  description,
  bannerImage,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  theme,
}: PageHeroProps) {
  // Infer theme if not explicitly provided: dark for images, light for colors
  const activeTheme = theme || (bannerImage ? "dark" : "light");
  const isDark = activeTheme === "dark";

  return (
    <section className="relative overflow-hidden min-h-[50vh] lg:min-h-120 flex items-center py-16 sm:py-24">
      {/* --- BACKGROUND MODES --- */}
      {bannerImage ? (
        // Mode 1: Image Background with Overlay
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src={bannerImage}
            alt="Page hero background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Image mode uses transparent contrast overlays only. Fallback colors are reserved for no-image mode. */}
          {isDark ? (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25 lg:from-black/70 lg:via-black/35 lg:to-black/10" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/55 to-white/25 lg:from-white/80 lg:via-white/45 lg:to-white/10" />
          )}
        </div>
      ) : (
        // Mode 2: Color Fallback Background
        <div className="absolute inset-0 pointer-events-none z-0">
          {isDark ? (
            <div className="absolute inset-0 bg-[#35465c]" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#F4F7FB] via-[#EDF7F9] to-[#D9F0F0]" />

              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #0EA5E9 1.5px, transparent 1.5px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Right-side geometric composition for light theme only */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-150 h-150 opacity-10 hidden lg:block">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 right-10 w-100 h-100"
                >
                  <path
                    fill="#0EA5E9"
                    d="M45.7,-57.8C58.9,-49.3,69.2,-36.5,73.8,-21.8C78.4,-7.1,77.3,9.5,70.7,23.8C64.1,38.1,52,50.1,38.2,57.4C24.4,64.7,9,67.3,-6.1,66.8C-21.2,66.3,-36,62.7,-48.3,54.2C-60.6,45.7,-70.4,32.3,-74.8,17.2C-79.2,2.1,-78.2,-14.7,-71.5,-29.2C-64.8,-43.7,-52.4,-55.9,-38.5,-64.2C-24.6,-72.5,-9.2,-76.9,4.7,-73.4C18.6,-69.9,32.5,-66.3,45.7,-57.8Z"
                    transform="translate(100 100)"
                  />
                </svg>
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-10 right-32 w-75 h-75 opacity-60"
                >
                  <path
                    fill="#F97316"
                    d="M41.3,-55.5C53.7,-46.8,64.3,-35.2,68.8,-21.8C73.3,-8.4,71.7,6.8,65.9,20.1C60.1,33.4,50.1,44.8,38.1,52.8C26.1,60.8,12.1,65.4,-2.5,69.1C-17.1,72.8,-32.2,75.6,-44.6,69.9C-57,64.2,-66.7,50,-71.5,34.8C-76.3,19.6,-76.2,3.4,-72.1,-11.4C-68,-26.2,-60,-39.6,-48.8,-48.5C-37.6,-57.4,-23.2,-61.8,-8.8,-60.5C5.6,-59.2,28.9,-64.2,41.3,-55.5Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      )}

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full mx-auto max-w-292.5 px-5 sm:px-8">
        <div className="max-w-2xl lg:max-w-200">
          
          {/* Breadcrumbs */}
          {breadcrumbs}

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold mb-6 leading-[1.15] tracking-tight animate-fade-in ${
              isDark ? "text-white" : "text-[#0A1F44]"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <div
              className={`text-lg sm:text-xl max-w-xl mb-10 leading-relaxed font-medium animate-fade-in ${
                isDark ? "text-slate-200" : "text-slate-600"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              {description}
            </div>
          )}

          {/* CTA Area */}
          {(primaryCta || secondaryCta) && (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-primary text-white rounded-lg font-semibold text-base hover:bg-primary-hover transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {primaryCta.text}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={`inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                    isDark 
                      ? "bg-white/10 text-white hover:bg-white/20" 
                      : "bg-slate-100 text-[#0A1F44] hover:bg-slate-200"
                  }`}
                >
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
