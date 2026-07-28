export type VisualType = "none" | "icon" | "image";

export interface VisualAsset {
  visualType: VisualType;
  iconName: string | null;
  imageId: number | null;
}
