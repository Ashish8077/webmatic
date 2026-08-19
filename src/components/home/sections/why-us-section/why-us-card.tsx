"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { WhyUsReason } from "./types";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import { getIconComponent } from "@/components/ui/icon-registry";

interface WhyUsCardProps {
  reason: WhyUsReason;
  index: number;
}

export function WhyUsCards({ reason, index }: WhyUsCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
        },
      };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <article className="group relative flex flex-col gap-4 rounded-2xl bg-white ring-1 ring-slate-200/60 p-7 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:ring-primary/30 hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden">
        {/* Subtle numbered index */}
        <span className="absolute top-4 right-6 text-4xl font-extrabold text-slate-100 select-none group-hover:text-primary/5 transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon */}
        <div className="flex items-center relative z-10">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300 overflow-hidden"
            whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {reason.visualType === "icon" && reason.iconName ? (
              (() => {
                const Icon = getIconComponent(reason.iconName);
                return Icon ? (
                  <Icon size={22} strokeWidth={1.75} />
                ) : (
                  <ShieldCheck size={22} strokeWidth={1.75} />
                );
              })()
            ) : reason.visualType === "image" ? (
              <VisualRenderer
                asset={reason as unknown as VisualAsset}
                className="w-full h-full"
              />
            ) : (
              <ShieldCheck size={22} strokeWidth={1.75} />
            )}
          </motion.div>
        </div>

        {/* Decorative Line (animates width on hover) */}
        <div className="h-0.5 w-8 bg-slate-200 rounded-full mt-2 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-bold text-navy leading-snug group-hover:text-primary transition-colors duration-200 relative z-10">
          {reason.title}
        </h3>

        {/* Description */}
        <p className="text-[14px] leading-relaxed text-slate-500 flex-1 relative z-10">
          {reason.description}
        </p>

        {/* CTA */}
        <Link
          href={reason.button.to}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-400 group-hover:text-primary transition-colors duration-200 group/link mt-1 relative z-10"
        >
          {reason.button.text}
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover/link:translate-x-0.5"
          />
        </Link>
      </article>
    </motion.div>
  );
}
