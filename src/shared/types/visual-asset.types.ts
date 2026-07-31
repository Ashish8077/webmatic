export type VisualType = "none" | "icon" | "image";

import { Media } from "@/features/media/types";

export interface VisualAsset {
  visualType: VisualType;
  iconName: string | null;
  imageId: number | null;
  image?: Media | null;
}
