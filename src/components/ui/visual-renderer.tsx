import React from "react";
import Image from "next/image";
import { getIconComponent } from "./icon-registry";
import { VisualAsset } from "@/shared/types/visual-asset.types";
import clsx from "clsx";
import { Image as ImageIcon } from "lucide-react";

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
  if (!asset || asset.visualType === "none") {
    return null;
  }

  if (asset.visualType === "icon" && asset.iconName) {
    const IconComponent = getIconComponent(asset.iconName);
    if (!IconComponent) return null;
    return (
      <div className={clsx("flex items-center justify-center", className)}>
        <IconComponent className={clsx("w-full h-full", iconClassName)} />
      </div>
    );
  }

  if (asset.visualType === "image" && asset.imageId) {
    const imageUrl = `/api/media/${asset.imageId}`;
    return (
      <div className={clsx("relative overflow-hidden", className)}>
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
