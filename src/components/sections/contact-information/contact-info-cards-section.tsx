import React from "react";
import Link from "next/link";
import clsx from "clsx";
import type { ContactInformationContentValues, ContactInformationSettingsValues } from "@/features/page-sections/schemas/contact-information.schema";
import { VisualRenderer } from "@/components/ui/visual-renderer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
    paddingBottom === "xl" && "pb-6 md:pb-8", // Reduced bottom padding to fix gap
    background === "slate" && "bg-slate-50",
    background === "gray" && "bg-gray-50",
    background === "white" && "bg-white"
  );

  return (
    <section className={clsx("w-full relative", paddingClasses)}>
      <div className={clsx("mx-auto px-4 md:px-6", container === "default" ? "max-w-7xl" : "max-w-screen-2xl")}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-center">
          {sortedItems.map((item, index) => {
            const cardClasses = clsx(
              "group flex flex-row items-center gap-3 text-left",
              item.href && "cursor-pointer"
            );

            // Construct VisualAsset object expected by VisualRenderer
            const visualAsset = {
              visualType: item.visualType as "none" | "icon" | "image",
              iconName: item.iconName,
              imageId: typeof item.imageId === "number" ? item.imageId : null,
              image: item.image,
            };

            const iconColorClass = "text-[#8dc63f] group-hover:text-orange-500 transition-colors duration-300";
            
            const rawValue = typeof item.value === 'string' ? item.value.replace(/\n/g, ' ') : item.value;
            const displayValue = item.title === 'Phone' ? `Phone Number: - ${rawValue}` :
                                 item.title === 'Email' ? `Email: - ${rawValue}` :
                                 rawValue;

            const cardContent = (
              <>
                <div className="shrink-0 flex items-center justify-center">
                  <VisualRenderer
                    asset={visualAsset}
                    className={clsx("w-8 h-8", iconColorClass)}
                    iconClassName={clsx("w-8 h-8", iconColorClass)}
                    imageClassName="object-contain"
                    alt={item.title}
                  />
                </div>
                <div className="text-slate-600 font-medium leading-relaxed text-[14.5px] group-hover:text-gray-900 transition-colors duration-300">
                  {displayValue}
                </div>
              </>
            );

            if (item.href) {
              return (
                <ScrollReveal key={index} delay={index * 0.1} direction="up">
                  <Link
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className={cardClasses}
                  >
                    {cardContent}
                  </Link>
                </ScrollReveal>
              );
            }

            return (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <div className={cardClasses}>
                  {cardContent}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
