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
    <section id="company-overview" className="relative bg-white py-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-4 shadow-sm">
            <span className="h-1 w-1 bg-orange-500 rounded-full animate-pulse" />
            {data.badge}
          </span>

          <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] text-navy tracking-tight">
            {data.heading}
          </h2>
        </div>

        <div className="max-w-[760px] mx-auto bg-white rounded-xl p-8 border border-slate-100 shadow-sm relative transition-all duration-200 hover:shadow-md">
          <div className="text-slate-600">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[15px] leading-[1.7] mb-4 last:mb-0 ${
                  index === 0
                    ? "first-letter:text-[38px] first-letter:font-serif first-letter:font-bold first-letter:text-navy first-letter:float-left first-letter:mr-2.5 first-letter:leading-[0.85] first-letter:mt-0.5"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {data.primaryButton?.text && data.primaryButton?.url && (
            <div className="flex flex-col items-center mt-7 pt-7 border-t border-slate-100">
              <Link
                href={data.primaryButton.url}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-hero-primary px-7 py-3 text-[14px] font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-hero-primary-hover hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{data.primaryButton.text}</span>
                <ArrowRight size={15} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}

          {data.bottomText && (
            <div className="text-center text-[13px] text-slate-500 mt-5">
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
