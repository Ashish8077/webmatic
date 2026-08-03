import React from "react";
import Link from "next/link";
import clsx from "clsx";
import type { ContactInformationContentValues, ContactInformationSettingsValues } from "@/features/page-sections/schemas/contact-information.schema";
import { VisualRenderer } from "@/components/ui/visual-renderer";

interface ContactInfoCardsSectionProps {
  content: ContactInformationContentValues | Record<string, unknown>;
  settings: ContactInformationSettingsValues | Record<string, unknown> | null;
}

// Removed CONTACT_ICONS

export function ContactInfoCardsSection({
  content,
  settings,
}: ContactInfoCardsSectionProps) {
  const items = (Array.isArray(content.items) ? content.items : []).map(item => {
    let visualType = item.visualType;
    let iconName = item.iconName;

    // Handle old schema where 'icon' was a string
    if (item.icon && typeof item.icon === "string" && !visualType) {
      visualType = "icon";
      iconName = item.icon;
    }

    // Convert kebab-case icon names to PascalCase for Lucide React
    if (iconName && typeof iconName === "string") {
      iconName = iconName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
    }

    return { ...item, visualType, iconName };
  });
  
  // Sort items based on the sortOrder field
  const sortedItems = [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const paddingTop = typeof settings?.paddingTop === "string" ? settings.paddingTop : "xl";
  const paddingBottom = typeof settings?.paddingBottom === "string" ? settings.paddingBottom : "xl";
  const background = typeof settings?.background === "string" ? settings.background : "white";
  const container = typeof settings?.container === "string" ? settings.container : "default";

  const paddingClasses = clsx(
    paddingTop === "xl" && "pt-16 md:pt-24",
    paddingBottom === "xl" && "pb-16 md:pb-24",
    background === "slate" && "bg-slate-50",
    background === "gray" && "bg-gray-50",
    background === "white" && "bg-white"
  );

  return (
    <section className={clsx("w-full relative", paddingClasses)}>
      <div className={clsx("mx-auto px-4 md:px-6", container === "default" ? "max-w-7xl" : "max-w-screen-2xl")}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedItems.map((item, index) => {
            const cardClasses = clsx(
              "group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300",
              item.href && "cursor-pointer hover:border-primary/20"
            );

            // Construct VisualAsset object expected by VisualRenderer
            const visualAsset = {
              visualType: item.visualType as "none" | "icon" | "image",
              iconName: item.iconName,
              imageId: typeof item.imageId === "number" ? item.imageId : null,
              image: item.image,
            };

            const cardContent = (
              <>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 overflow-hidden relative">
                  <VisualRenderer
                    asset={visualAsset}
                    className="w-8 h-8"
                    iconClassName="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300"
                    imageClassName="object-contain"
                    alt={item.title}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
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
