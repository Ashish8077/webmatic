import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { WhyUsReason } from "./types";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { getIconComponent } from "@/components/ui/icon-registry";

interface ServiceCardProps {
  reason: WhyUsReason;
  index: number;
}

export function WhyUsCards({ reason }: ServiceCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl bg-white ring-1 ring-green-100 p-7 shadow-lg shadow-green-100/80 hover:shadow-xl hover:shadow-green-200/60 hover:ring-green-300 hover:-translate-y-1 transition-all duration-300">
      {/* Icon */}
      <div className="flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-primary group-hover:bg-green-600 group-hover:text-white transition-all duration-300 overflow-hidden">
          {reason.visualType === "icon" && reason.iconName ? (
            (() => {
              const Icon = getIconComponent(reason.iconName);
              return Icon ? <Icon size={22} strokeWidth={1.75} /> : <ShieldCheck size={22} strokeWidth={1.75} />;
            })()
          ) : reason.visualType === "image" ? (
            <VisualRenderer
              asset={reason as unknown as VisualAsset}
              className="w-full h-full"
            />
          ) : (
            <ShieldCheck size={22} strokeWidth={1.75} />
          )}
        </div>
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
