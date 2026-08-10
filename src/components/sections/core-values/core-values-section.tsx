import Link from "next/link";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import { type CoreValuesContentValues } from "@/features/page-sections/schemas/core-values.schema";

interface Props {
  content: Record<string, unknown>;
  settings?: Record<string, unknown>;
}



export function CoreValuesSection({ content }: Props) {
  const data = content as unknown as CoreValuesContentValues;
  const values = data.values || [];

  return (
    <section className="relative bg-slate-50 py-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-10 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-100 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-4 shadow-sm">
            <span className="h-1 w-1 bg-orange-500 rounded-full animate-pulse" />
            {data.badge}
          </span>
          <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] text-navy tracking-tight max-w-2xl mx-auto">
            {data.heading}
          </h2>
        </div>

        {/* ── Values grid ─────────────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, index) => {
            return (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-6 text-center shadow-sm border border-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md overflow-hidden flex flex-col items-center"
              >
                {/* Decorative subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                {/* Icon */}
                <div className="relative mb-4 w-14 h-14 rounded-lg bg-orange-50 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:bg-orange-500 group-hover:shadow-md group-hover:shadow-orange-500/25">
                  {item.visualType === "none" && !item.imageId ? (
                    <div className="w-7 h-7 text-orange-500 transition-colors duration-200 group-hover:text-white rounded-full border-2 border-current flex items-center justify-center">
                       {/* Fallback default icon */}
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                  ) : (
                    <VisualRenderer
                      asset={item}
                      className="w-full h-full rounded-lg"
                      iconClassName="w-7 h-7 text-orange-500 transition-colors duration-200 group-hover:text-white"
                    />
                  )}
                </div>

                <h3 className="relative text-[17px] font-bold text-navy mb-2.5 group-hover:text-orange-500 transition-colors duration-200">
                  {item.title}
                </h3>

                <p className="relative text-[14px] leading-[1.6] text-slate-500 mb-5 flex-grow">
                  {item.description}
                </p>

                {item.linkText && item.linkUrl && (
                  <Link
                    href={item.linkUrl}
                    className="relative inline-flex items-center gap-1.5 text-[13px] font-semibold text-hero-primary hover:text-hero-primary-hover transition-colors duration-200 group/link"
                  >
                    {item.linkText}
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
