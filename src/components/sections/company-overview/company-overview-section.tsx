import Link from "next/link";
import { type CompanyOverviewContentValues } from "@/features/page-sections/schemas/company-overview.schema";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export function CompanyOverviewSection({ content }: Props) {
  console.log("content", content);
  const data = content as unknown as CompanyOverviewContentValues;

  const paragraphs = data.description
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-14">
          <div className="inline-block bg-[#ff5a30] text-white text-[13px] font-bold tracking-[0.1em] uppercase px-4 py-1 mb-6">
            {data.badge}
          </div>

          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#081a4b] leading-[1.2]">
            {data.heading}
          </h2>
        </div>

        <div className="max-w-[850px] mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-[17px] leading-relaxed text-slate-600 mb-6 ${
                index === 0
                  ? "first-letter:text-[68px] first-letter:font-normal first-letter:text-slate-500 first-letter:float-left first-letter:mr-4 first-letter:leading-[0.8] first-letter:mt-2"
                  : ""
              }`}
            >
              {paragraph}
            </p>
          ))}

          {data.primaryButton?.text && data.primaryButton?.url && (
            <div className="flex justify-center mt-12 mb-20">
              <Link
                href={data.primaryButton.url}
                className="inline-flex items-center justify-center bg-[#3c4a5c] hover:bg-[#2b3543] text-white px-10 py-4 font-semibold rounded-sm transition-colors duration-200"
              >
                {data.primaryButton.text}
              </Link>
            </div>
          )}

          {data.bottomText && (
            <div className="text-center text-[15px] text-slate-500">
              {data.bottomText.supportingText}{" "}
              {data.bottomText.linkText && data.bottomText.linkUrl && (
                <Link
                  href={data.bottomText.linkUrl}
                  className="text-[#ff5a30] hover:text-[#e04a25] font-semibold transition-colors"
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
