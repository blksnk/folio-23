import type { FormattedProjectMedia } from "@/api/queries/oneProject";

export type GalleryStyleConstants = {
  spacing: number;
  containerWidth: string;
  containerHeight: string;
};

export type GalleryMediaMetadata = {
  aspectRatio: string;
  isSquare: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
};

export type GalleryMediaAndMetadata = GalleryMediaMetadata & {
  media: FormattedProjectMedia;
};

export type GalleryMediaStaticStyles = {
  maxHeight: string;
  maxWidth: string;
  aspectRatio: string;
  height?: string | undefined;
  width?: string | undefined;
};

export type GalleryMediaDynamicStyles = {
  zIndex: number;
  animationDelay: string;
};
