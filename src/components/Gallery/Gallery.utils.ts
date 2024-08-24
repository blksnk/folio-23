import type { FormattedProjectMedia } from "@/api/queries/oneProject";
import { preloadImage } from "@/utils/images";
import type {
  GalleryMediaAndMetadata,
  GalleryMediaDynamicStyles,
  GalleryMediaMetadata,
  GalleryMediaStaticStyles,
  GalleryStyleConstants,
} from "./Gallery.types";
import { breakpoints, type Breakpoints } from "@/utils/breakpoints";
import { cn } from "@/utils/css";
import styles from "./Gallery.module.sass";

export const preloadAllImages = async (coverUrls: string[]) => {
  await Promise.all(coverUrls.map((url) => preloadImage(url)));
  return true;
};

export const preloadAllVideos = async (videoUrls: string[]) => {
  await Promise.all(videoUrls.map((url) => preloadImage(url)));
};

export const computeStyleConstants = ({
  isMobile,
  isTablet,
}: Breakpoints): GalleryStyleConstants => {
  const spacing = isMobile ? 6 : 12;
  const columnCount = 10;
  const rowCount = isTablet ? 7 : 9;
  const topPadding = isMobile ? "12px" : isTablet ? "24px" : "36px";
  const sidePadding = isMobile ? "9px" : isTablet ? "28px" : "44px";
  const containerWidth = `calc((100vw - (${sidePadding} * 2)) / 12 * ${columnCount})`;
  const containerHeight = `calc((100vh - (${topPadding} * 2)) / 12 * ${rowCount})`;
  return {
    spacing,
    containerHeight,
    containerWidth,
  };
};

export const computeBreakpoints = (): Breakpoints => {
  return {
    isTablet: breakpoints.isTablet(),
    isMobile: breakpoints.isMobile(),
    isVertical: breakpoints.isVertical(),
  };
};

export const parseMediaMetadata = (
  media: FormattedProjectMedia
): GalleryMediaAndMetadata => {
  const aspectRatio = String(media.imgRatio);
  const isSquare = media.imgRatio === 1;
  const isPortrait = !isSquare && 1 > media.imgRatio;
  const isLandscape = !isSquare && media.imgRatio > 1;
  return {
    aspectRatio,
    isPortrait,
    isLandscape,
    isSquare,
    media,
  };
};

export const isMediaActive = (
  media: FormattedProjectMedia,
  activeMediaId: string,
  imagesLoaded: boolean,
  hide?: boolean
): boolean => {
  return !!(media.id === activeMediaId && imagesLoaded && !hide);
};

const maxMediaHeight = (
  { containerWidth, containerHeight }: GalleryStyleConstants,
  { aspectRatio }: GalleryMediaMetadata
) => {
  return `min(calc(${containerWidth} / ${aspectRatio}), ${containerHeight})`;
};

const maxMediaWidth = (
  { containerWidth, containerHeight }: GalleryStyleConstants,
  { aspectRatio }: GalleryMediaMetadata
) => {
  return `min(calc(${containerHeight} * ${aspectRatio}), ${containerWidth})`;
};

const dynamicMediaStyles = (
  active: boolean,
  index: number,
  hide?: boolean
): GalleryMediaDynamicStyles => {
  const zIndex = active ? 1 : 2;
  const animationDelay = hide ? `${100 * index}ms` : `${300 + index * 200}ms`;
  return {
    zIndex,
    animationDelay,
  };
};

const baseMediaStyles = (
  contants: GalleryStyleConstants,
  metadata: GalleryMediaMetadata
): GalleryMediaStaticStyles => {
  const base = {
    maxHeight: maxMediaHeight(contants, metadata),
    maxWidth: maxMediaWidth(contants, metadata),
    aspectRatio: metadata.aspectRatio,
  };
  if (metadata.isPortrait) {
    const height = contants.containerHeight;
    const width = `calc(${height} * ${metadata.aspectRatio})`;
    return {
      ...base,
      height,
      width,
    };
  }
  const width = contants.containerWidth;
  const height = `calc(${width} / ${metadata.aspectRatio})`;
  return {
    ...base,
    height,
    width,
  };
};

const enhancedMediaStyles = (
  contants: GalleryStyleConstants,
  metadata: GalleryMediaMetadata,
  index: number
): GalleryMediaStaticStyles => {
  const base = baseMediaStyles(contants, metadata);

  if (metadata.isPortrait) {
    return {
      ...base,
      width: undefined,
      height: `calc(${base.maxHeight} - ${index * contants.spacing}px)`,
    };
  }
  return {
    ...base,
    // height: base.maxHeight,
    height: undefined,
    // height: `calc(${base.maxHeight} - ${index * contants.spacing}px)`,
    width: `calc(${base.maxWidth} - ${index * contants.spacing}px)`,
    // height: `min(${base.height}, calc(${base.height} - ${
    //   index * contants.spacing
    // }px))`,
    // width: "auto",
  };
};

const staticMediaStyles = (
  constants: GalleryStyleConstants,
  metadata: GalleryMediaMetadata,
  breakpoints: Breakpoints,
  index: number
) => {
  if (breakpoints.isMobile || breakpoints.isTablet || breakpoints.isVertical)
    return baseMediaStyles(constants, metadata);
  return enhancedMediaStyles(constants, metadata, index);
};

export const computeMediaStyles = (
  constants: GalleryStyleConstants,
  metadata: GalleryMediaMetadata,
  breakpoints: Breakpoints,
  index: number,
  active: boolean,
  hide?: boolean
) => {
  const staticStyles = staticMediaStyles(
    constants,
    metadata,
    breakpoints,
    index
  );
  const dynamicStyles = dynamicMediaStyles(active, index, hide);

  const mediaStyles = {
    ...staticStyles,
    ...dynamicStyles,
  };
  const className = cn(
    styles.frame,
    metadata.isPortrait ? styles.portrait : styles.landscape,
    [styles.visible, active],
    [styles.hide, hide]
  );
  return {
    mediaStyles,
    className,
  };
};
