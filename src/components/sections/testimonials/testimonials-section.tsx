import type { SectionProps } from "@/components/home/sections/types";
import { normaliseTestimonialContent } from "./mapper";
import type { RawTestimonialContent } from "./types";
import { TestimonialsSlider } from "./testimonials-slider";
import Image from "next/image";

export function TestimonialsSection({ content }: SectionProps) {
  const data = normaliseTestimonialContent(
    content as unknown as RawTestimonialContent,
  );

  const bgStyle = data.backgroundColor ? { backgroundColor: data.backgroundColor } : {};

  return (
    <section 
      className={`relative py-20 lg:py-28 overflow-hidden ${!data.backgroundColor && !data.backgroundImageId ? "bg-slate-50" : ""}`}
      style={bgStyle}
    >
      {/* Background Image */}
      {data.backgroundImageId && (
        <div className="absolute inset-0 z-0">
          <Image
            src={`/api/media/${data.backgroundImageId}`}
            alt="Testimonials Background"
            fill
            className="object-cover object-center opacity-10"
            sizes="100vw"
            unoptimized
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-14 text-center">
          {data.badge && (
            <span className="inline-block mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500">
              {data.badge}
            </span>
          )}
          <h2 className="text-[30px] lg:text-[36px] font-bold leading-[1.15] text-navy">
            {data.heading}{" "}
            {data.highlight && (
              <span className="text-orange-500">{data.highlight}</span>
            )}
          </h2>
          {data.description && (
            <p className="mt-3 text-[16px] leading-[1.625] text-slate-500">
              {data.description}
            </p>
          )}
        </div>

        {/* ── Testimonials slider (Client Component) ──────── */}
        <TestimonialsSlider items={data.testimonials} />
      </div>
    </section>
  );
}
