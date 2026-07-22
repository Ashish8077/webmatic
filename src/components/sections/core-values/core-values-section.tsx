import Link from "next/link";
import { type CoreValuesContentValues } from "@/features/page-sections/schemas/core-values.schema";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

export function CoreValuesSection({ content }: Props) {
  const data = content as unknown as CoreValuesContentValues;
  const values = data.values || [];

  return (
    <section className="py-20 lg:py-28 bg-[#fff5f0]">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-16">
          <div className="inline-block bg-[#ff5a30] text-white text-[13px] font-bold tracking-[0.1em] uppercase px-4 py-1 mb-6">
            {data.badge}
          </div>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#081a4b] leading-[1.2] max-w-3xl">
            {data.heading}
          </h2>
        </div>

        <div className="bg-white shadow-sm border border-slate-100 flex flex-col lg:flex-row">
          {values.map((item, index) => (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center text-center p-10 lg:p-14 ${
                index !== values.length - 1
                  ? "border-b lg:border-b-0 lg:border-r border-slate-100"
                  : ""
              }`}
            >
              <h3 className="text-[22px] font-bold text-[#081a4b] mb-6">
                {item.title}
              </h3>
              <p className="text-[16px] leading-relaxed text-slate-500 mb-10 flex-grow">
                {item.description}
              </p>
              
              <div className="mb-10 min-h-[80px] flex items-center justify-center">
                {/* Fallback SVGs that somewhat match the screenshot icons */}
                {index === 0 && (
                  <svg className="w-20 h-20 text-[#ff5a30]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-20 h-20 text-[#081a4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-20 h-20 text-[#ff5a30]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                    <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
                    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
                  </svg>
                )}
              </div>

              {item.linkText && item.linkUrl && (
                <Link
                  href={item.linkUrl}
                  className="text-[#ff5a30] font-bold hover:text-[#e04a25] transition-colors duration-200"
                >
                  {item.linkText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
