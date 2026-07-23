import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface HeroBannerProps {
  badge?: string;
  heading: string;
  highlight?: string;
  description?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  backgroundImageUrl?: string | null;
  theme?: "light" | "dark";
}

export function HeroBanner({
  badge,
  heading,
  highlight,
  description,
  ctaLabel,
  ctaTarget,
  backgroundImageUrl,
  theme = "light",
}: HeroBannerProps) {
  const isDark = theme === "dark";

  return (
    <section className="relative overflow-hidden min-h-[60vh] lg:min-h-[580px] flex items-center py-16 sm:py-24">
      {/* --- BACKGROUND MODES --- */}
      {backgroundImageUrl ? (
        // Mode 1: Image Background with Overlay
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src={backgroundImageUrl}
            alt={heading}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Base darkening for image to improve overall contrast */}
          <div className="absolute inset-0 bg-[#0A1F44]/5 mix-blend-multiply" />

          {/* Overlay matching the theme */}
          {isDark ? (
            <div className="absolute inset-0 bg-[#35465c]/90 lg:bg-gradient-to-r lg:from-[#35465c] lg:via-[#35465c]/80 lg:to-transparent" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4F7FB] via-[#F4F7FB]/95 to-[#F4F7FB]/80 lg:via-[#F4F7FB]/90 lg:to-transparent" />
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
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] opacity-10 hidden lg:block">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 right-10 w-[400px] h-[400px]"
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
                  className="absolute bottom-10 right-32 w-[300px] h-[300px] opacity-60"
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
      <div className="relative z-10 w-full mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="max-w-2xl lg:max-w-[800px]">
          {/* Badge */}
          {badge && (
            <div
              className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border backdrop-blur-sm mb-8 shadow-sm animate-fade-in ${
                isDark
                  ? "bg-white/10 border-white/20"
                  : "bg-white/80 border-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
              <span
                className={`text-xs font-bold uppercase tracking-widest ${
                  isDark ? "text-white" : "text-[#0A1F44]"
                }`}
              >
                {badge}
              </span>
            </div>
          )}

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold mb-6 leading-[1.15] tracking-tight animate-fade-in ${
              isDark ? "text-white" : "text-[#0A1F44]"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            {heading}{" "}
            {highlight && (
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-orange-500">
                  {highlight}
                </span>
                {/* Refined underline accent */}
                <span className="absolute bottom-1.5 sm:bottom-2 left-0 w-full h-3 sm:h-4 bg-orange-500/10 -z-10 rounded-sm" />
              </span>
            )}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={`text-lg sm:text-xl max-w-xl mb-10 leading-relaxed font-medium animate-fade-in ${
                isDark ? "text-slate-200" : "text-slate-600"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              {description}
            </p>
          )}

          {/* CTA Area */}
          {ctaLabel && (
            <div
              className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href={ctaTarget ? (ctaTarget.startsWith("#") ? ctaTarget : `#${ctaTarget}`) : "#"}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-orange-500 text-white rounded-lg font-semibold text-base hover:bg-orange-600 transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {ctaLabel}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
