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
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            <span className="h-px w-8 bg-orange-500 rounded-full" />
            {data.badge}
          </span>

          <h2 className="text-[30px] lg:text-[36px] font-bold leading-[1.15] text-navy">
            {data.heading}
          </h2>
        </div>

        <div className="max-w-[850px] mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-[16px] leading-[1.625] text-slate-500 mb-6 ${
                index === 0
                  ? "first-letter:text-[68px] first-letter:font-normal first-letter:text-slate-400 first-letter:float-left first-letter:mr-4 first-letter:leading-[0.8] first-letter:mt-2"
                  : ""
              }`}
            >
              {paragraph}
            </p>
          ))}

          {data.primaryButton?.text && data.primaryButton?.url && (
            <div className="flex justify-center mt-12 mb-16">
              <Link
                href={data.primaryButton.url}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {data.primaryButton.text}
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {data.bottomText && (
            <div className="text-center text-[14px] text-slate-500">
              {data.bottomText.supportingText}{" "}
              {data.bottomText.linkText && data.bottomText.linkUrl && (
                <Link
                  href={data.bottomText.linkUrl}
                  className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
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
