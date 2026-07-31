import React from "react";
import Image from "next/image";
import { getIconComponent } from "./icon-registry";
import { VisualAsset } from "@/shared/types/visual-asset.types";
import clsx from "clsx";
import { Image as ImageIcon } from "lucide-react";
import { getMediaUrl } from "@/features/media/utils/media-url";

interface VisualRendererProps {
  asset: VisualAsset | null;
  className?: string;
  iconClassName?: string;
  imageClassName?: string;
  alt?: string;
}

export function VisualRenderer({
  asset,
  className,
  iconClassName,
  imageClassName,
  alt = "Visual Asset",
}: VisualRendererProps) {
  const hasPositionClass =
    typeof className === "string" &&
    /\b(absolute|fixed|relative|sticky)\b/.test(className);

  if (!asset || asset.visualType === "none") {
    return null;
  }

  if (asset.visualType === "icon" && asset.iconName) {
    const icon = getIconComponent(asset.iconName);
    if (!icon) return null;
    return (
      <div className={clsx("flex items-center justify-center", className)}>
        {React.createElement(icon, {
          className: clsx("w-full h-full", iconClassName),
        })}
      </div>
    );
  }

  if (asset.visualType === "image") {
    const imageUrl = getMediaUrl(asset.image);
    if (!imageUrl) return null;
    
    return (
      <div
        className={clsx(
          "overflow-hidden",
          !hasPositionClass && "relative",
          className,
        )}
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className={clsx("object-cover", imageClassName)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }

  // Fallback for misconfigured assets
  return (
    <div
      className={clsx("flex items-center justify-center bg-muted", className)}
    >
      <ImageIcon
        className={clsx("w-1/2 h-1/2 text-muted-foreground", iconClassName)}
      />
    </div>
  );
}
