import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type CompanyOverviewContentValues } from "@/features/page-sections/schemas/company-overview.schema";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export function CompanyOverviewSection({ content }: Props) {
  const data = content as unknown as CompanyOverviewContentValues;

  const paragraphs = data.description
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <section id="company-overview" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60"></div>
      
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-20 lg:mb-24">
          <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-6 shadow-sm">
            <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
            {data.badge}
          </span>

          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.15] text-navy tracking-tight">
            {data.heading}
          </h2>
        </div>

        <div className="max-w-[760px] mx-auto bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <div className="text-slate-600">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[17px] sm:text-[18px] leading-[1.8] mb-7 last:mb-0 ${
                  index === 0
                    ? "first-letter:text-[54px] first-letter:font-serif first-letter:font-bold first-letter:text-navy first-letter:float-left first-letter:mr-4 first-letter:leading-[0.8] first-letter:mt-1.5"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {data.primaryButton?.text && data.primaryButton?.url && (
            <div className="flex flex-col items-center mt-12 pt-10 border-t border-slate-100/80">
              <Link
                href={data.primaryButton.url}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-hero-primary px-9 py-4 text-[15px] font-semibold text-white shadow-[0_8px_25px_rgba(10,152,212,0.25)] transition-all duration-300 hover:bg-hero-primary-hover hover:shadow-[0_12px_30px_rgba(10,152,212,0.35)] hover:-translate-y-1"
              >
                <span className="relative z-10">{data.primaryButton.text}</span>
                <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}

          {data.bottomText && (
            <div className="text-center text-[15px] text-slate-500 mt-10">
              {data.bottomText.supportingText}{" "}
              {data.bottomText.linkText && data.bottomText.linkUrl && (
                <Link
                  href={data.bottomText.linkUrl}
                  className="inline-flex items-center font-semibold text-orange-500 hover:text-orange-600 transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  {data.bottomText.linkText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
