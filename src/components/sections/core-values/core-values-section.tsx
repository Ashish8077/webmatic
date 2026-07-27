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
    <section className="relative bg-slate-50 py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-16 lg:mb-20 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-orange-100 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-6 shadow-sm">
            <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
            {data.badge}
          </span>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.15] text-navy tracking-tight max-w-3xl mx-auto">
            {data.heading}
          </h2>
        </div>

        {/* ── Values grid ─────────────────────────────────── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, index) => {
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-10 lg:p-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center"
              >
                {/* Decorative subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500/30 rounded-b-full transition-all duration-500 group-hover:w-32 group-hover:bg-orange-500" />

                {/* Icon */}
                <div className="relative mb-8 w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)]">
                  {item.visualType === "none" && !item.imageId ? (
                    <div className="w-9 h-9 text-orange-500 transition-colors duration-500 group-hover:text-white rounded-full border-2 border-current flex items-center justify-center">
                       {/* Fallback default icon */}
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                  ) : (
                    <VisualRenderer
                      asset={item}
                      className="w-full h-full rounded-2xl"
                      iconClassName="w-9 h-9 text-orange-500 transition-colors duration-500 group-hover:text-white"
                    />
                  )}
                </div>

                <h3 className="relative text-xl font-bold text-navy mb-4 group-hover:text-orange-500 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="relative text-[15px] leading-[1.7] text-slate-500 mb-8 flex-grow">
                  {item.description}
                </p>

                {item.linkText && item.linkUrl && (
                  <Link
                    href={item.linkUrl}
                    className="relative inline-flex items-center gap-2 text-[15px] font-semibold text-hero-primary hover:text-hero-primary-hover transition-colors duration-300 group/link"
                  >
                    {item.linkText}
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
