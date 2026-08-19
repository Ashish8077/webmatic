"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, LayoutGrid, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { str, arr } from "../content-helpers";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import type { VisualAsset } from "@/shared/types/visual-asset.types";
import type { SectionProps } from "./types";

interface PortfolioProject {
  title: string;
  category: string;
  description: string;
  url?: string;
  imageId?: number | null;
  image?: VisualAsset["image"];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function PortfolioSection({ content, pageTitle }: SectionProps) {
  const heading = str(content.heading, pageTitle ?? "Selected Works");
  const highlight = str(content.highlight);
  const description = str(content.description);
  const badge = str(content.badge);
  const projects = arr<PortfolioProject>(content.projects);
  const viewAllButton = content.viewAllButton as { text?: string; to?: string } | undefined;

  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-300 px-6 sm:px-8 relative z-10">
        
        {/* ── Section header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
        >
          <div>
            {badge && (
              <span className="inline-flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
                <span className="h-px w-5 bg-orange-500 rounded-full" />
                {badge}
              </span>
            )}
            <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.2] text-navy max-w-2xl">
              {heading}{" "}
              {highlight && (
                <span className="text-orange-500">{highlight}</span>
              )}
            </h2>
            {description && (
              <p className="text-slate-500 max-w-2xl text-[15px] sm:text-[16px] leading-[1.6] mt-4">
                {description}
              </p>
            )}
          </div>

          {viewAllButton?.text && (
            <Link
              href={viewAllButton.to || "/work"}
              className="shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-orange-500 transition-colors duration-200 group"
            >
              {viewAllButton.text}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </motion.div>

        {/* ── Projects Grid ───────────────────────────────── */}
        {projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {projects.map((project, i) => {
              const url = project.url || "#";
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Link href={url} className="group block w-full h-full">
                    {/* Image Container with 16:9 aspect ratio */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 mb-5 border border-slate-200/50 shadow-sm transition-shadow duration-300 group-hover:shadow-md isolate">
                      {project.imageId || project.image ? (
                        <VisualRenderer
                          asset={{ visualType: "image", iconName: null, imageId: project.imageId ?? null, image: project.image }}
                          className="w-full h-full"
                          imageClassName="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                          <LayoutGrid size={48} strokeWidth={1} className="mb-3" />
                        </div>
                      )}

                      {/* Glassmorphic Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-900 transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-75 shadow-xl">
                          <ArrowUpRight size={22} strokeWidth={2} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <div className="mb-2">
                        <span className="text-[13px] font-medium text-primary">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-orange-500 transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
