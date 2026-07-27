import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { WhyUsReason } from "./types";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";

interface ServiceCardProps {
  reason: WhyUsReason;
  index: number;
}

export function WhyUsCards({ reason, index }: ServiceCardProps) {
  const formattedIndex = index.toString().padStart(2, "0");

  const hasVisual = reason.visualType && reason.visualType !== "none";

  return (
    <article className="group flex flex-col gap-4 rounded-2xl bg-white ring-1 ring-green-100 p-7 shadow-lg shadow-green-100/80 hover:shadow-xl hover:shadow-green-200/60 hover:ring-green-300 hover:-translate-y-1 transition-all duration-300">
      {/* Icon + Number row */}
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-primary group-hover:bg-green-600 group-hover:text-white transition-all duration-300 overflow-hidden">
          {hasVisual ? (
            <VisualRenderer
              asset={reason as unknown as VisualAsset}
              className="w-full h-full"
              iconClassName="w-[22px] h-[22px] text-primary group-hover:text-white transition-colors duration-300"
            />
          ) : (
            <ShieldCheck size={22} strokeWidth={1.75} />
          )}
        </div>
        <span
          className="text-4xl font-black leading-none select-none text-slate-200 group-hover:text-slate-300 transition-colors duration-300"
          aria-hidden="true"
        >
          {formattedIndex}
        </span>
      </div>

      {/* Decorative Green Line */}
      <span className="h-[2px] w-8 bg-green-300 rounded-full mt-2" />

      {/* Title */}
      <h3 className="text-[18px] font-bold text-navy leading-snug group-hover:text-primary transition-colors duration-200">
        {reason.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-[1.625] text-slate-500 flex-1">
        {reason.description}
      </p>

      {/* CTA */}
      <Link
        href={reason.button.to}
        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors duration-200 group/link mt-1"
      >
        {reason.button.text}
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
