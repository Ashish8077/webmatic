import React from "react";
import Link from "next/link";
import clsx from "clsx";
import type { ContactInformationContentValues, ContactInformationSettingsValues } from "@/features/page-sections/schemas/contact-information.schema";
import { getIconComponent } from "@/components/ui/icon-registry";

interface ContactInfoCardsSectionProps {
  content: ContactInformationContentValues | Record<string, unknown>;
  settings: ContactInformationSettingsValues | Record<string, unknown> | null;
}

export function ContactInfoCardsSection({
  content,
  settings,
}: ContactInfoCardsSectionProps) {
  const items = Array.isArray(content.items) ? content.items : [];
  
  // Sort items based on the order field
  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const paddingTop = typeof settings?.paddingTop === "string" ? settings.paddingTop : "xl";
  const paddingBottom = typeof settings?.paddingBottom === "string" ? settings.paddingBottom : "xl";
  const background = typeof settings?.background === "string" ? settings.background : "white";
  const container = typeof settings?.container === "string" ? settings.container : "default";

  // Using inline styles/classes based on existing design system patterns.
  // These map to standard padding and bg utilities if they exist.
  // We'll use semantic classes based on typical implementation.
  const paddingClasses = clsx(
    paddingTop === "xl" && "pt-16 md:pt-24",
    paddingBottom === "xl" && "pb-16 md:pb-24",
    background === "slate" && "bg-slate-50",
    background === "white" && "bg-white"
  );

  return (
    <section className={clsx("w-full relative", paddingClasses)}>
      <div className={clsx("mx-auto px-4 md:px-6", container === "default" ? "max-w-7xl" : "max-w-screen-2xl")}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedItems.map((item, index) => {
            const Icon = getIconComponent(item.icon?.value || "MapPin");
            const cardClasses = clsx(
              "group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300",
              item.href && "cursor-pointer hover:border-primary/20"
            );

            const cardContent = (
              <>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  {Icon && (
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.label}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{item.value}</p>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className={cardClasses}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={index} className={cardClasses}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
