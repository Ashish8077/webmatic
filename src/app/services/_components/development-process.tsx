import Link from "next/link";
import React from "react";
import { ArrowRight, PenTool, Target, Settings } from "lucide-react";

export function DevelopmentProcessSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-500">
            <span className="h-px w-6 bg-orange-500 rounded-full" />
            OUR DEVELOPMENT PROCESS
            <span className="h-px w-6 bg-orange-500 rounded-full" />
          </span>
          <h2 className="text-[30px] md:text-[36px] font-bold leading-[1.15] text-navy max-w-3xl">
            Focusing on the 3 key elements of any successful{" "}
            <span className="text-orange-500">marketing strategy.</span>
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <article className="group flex flex-col gap-5 rounded-2xl bg-white p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-orange-200 hover:shadow-orange-100/50">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <PenTool size={26} strokeWidth={1.75} />
            </div>
            
            <h3 className="text-[20px] font-bold text-navy leading-[1.375] group-hover:text-orange-500 transition-colors duration-200">
              1. Creative
            </h3>
            
            <p className="text-[15px] leading-[1.625] text-slate-500 flex-1">
              Create thumb-stopping ads that capture your prospects attention and get them interested in what you have to offer.
            </p>
          </article>

          {/* Card 2 */}
          <article className="group flex flex-col gap-5 rounded-2xl bg-white p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-orange-200 hover:shadow-orange-100/50">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <Target size={26} strokeWidth={1.75} />
            </div>
            
            <h3 className="text-[20px] font-bold text-navy leading-[1.375] group-hover:text-orange-500 transition-colors duration-200">
              2. Targeting
            </h3>
            
            <p className="text-[15px] leading-[1.625] text-slate-500 flex-1">
              Find your customers online, drive them to your website & then bring them back again with well designed retargeting ads.
            </p>
          </article>

          {/* Card 3 */}
          <article className="group flex flex-col gap-5 rounded-2xl bg-white p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-orange-200 hover:shadow-orange-100/50">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <Settings size={26} strokeWidth={1.75} />
            </div>
            
            <h3 className="text-[20px] font-bold text-navy leading-[1.375] group-hover:text-orange-500 transition-colors duration-200">
              3. Optimisation
            </h3>
            
            <p className="text-[15px] leading-[1.625] text-slate-500 flex-1">
              Our tech experts optimise every stage of your funnel to ensure that maximum ROI is being achieved.
            </p>
          </article>
        </div>

        {/* Footer CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-slate-200 pt-10">
          <p className="text-[15px] text-slate-500 font-medium text-center sm:text-left">
            We Serve our Clients&apos; Best Interests with the Best Marketing Solutions.
          </p>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[14px] font-semibold text-white shadow-md shadow-primary/10 hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Find Out More
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
