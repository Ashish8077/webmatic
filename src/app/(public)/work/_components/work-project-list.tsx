"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { WORK_CATEGORY_LABELS } from "@/modules/work/constants/work.constants";

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  shortDescription: string | null;
  featuredImage?: {
    url: string;
    altText?: string | null;
  };
}

interface WorkProjectListProps {
  projects: Project[];
}

export function WorkProjectList({ projects }: WorkProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-surface rounded-2xl border border-border">
        <h3 className="text-2xl font-bold text-foreground mb-2">Check back soon</h3>
        <p className="text-muted-foreground">We&apos;re updating our portfolio with our latest work.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
        >
          <Link href={`/work/${project.slug}`} className="block relative h-full">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-surface border border-border">
              {project.featuredImage ? (
                <Image
                  src={project.featuredImage.url}
                  alt={project.featuredImage.altText || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-hover">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Hover button */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight size={20} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {WORK_CATEGORY_LABELS[project.category as keyof typeof WORK_CATEGORY_LABELS] || project.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              {project.shortDescription && (
                <p className="text-muted-foreground line-clamp-2">
                  {project.shortDescription}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
