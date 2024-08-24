"use client";

import styles from "./Gallery.module.sass";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/css";
import { FormattedProjectMedia } from "@/api/queries/oneProject";
import Image from "next/image";
import {
  computeBreakpoints,
  computeMediaStyles,
  computeStyleConstants,
  isMediaActive,
  parseMediaMetadata,
  preloadAllImages,
} from "./Gallery.utils";
import { Breakpoints } from "@/utils/breakpoints";
import type { GalleryMediaAndMetadata } from "./Gallery.types";
import { portraitRatios } from "./data";

interface GalleryProps {
  medias: FormattedProjectMedia[];
  nonPortraitMediaCount: number;
  activeMediaId: string;
  hide?: boolean;
  walkGallery: () => void;
}

export function Gallery(props: GalleryProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isTablet: false,
    isMobile: false,
    isVertical: false,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      setBreakpoints(computeBreakpoints());
    };
    window.addEventListener("resize", updateBreakpoints);
    updateBreakpoints();

    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);
  useEffect(() => {
    if (!imagesLoaded) {
      preloadAllImages(
        props.medias.filter(({ isVideo }) => !isVideo).map(({ url }) => url)
      ).then(() => setImagesLoaded(true));
    }
  }, [imagesLoaded, props.medias]);

  const styleConstants = useMemo(
    () => computeStyleConstants(breakpoints),
    [breakpoints]
  );

  return (
    <div className={styles.framesContainer} onClick={props.walkGallery}>
      <GalleryMediaRenderer
        activeMediaId={props.activeMediaId}
        hide={props.hide}
        medias={props.medias}
        imagesLoaded={imagesLoaded}
        breakpoints={breakpoints}
      />
    </div>
  );
}

type GalleryMediaRendererProps = Pick<
  GalleryProps,
  "activeMediaId" | "hide" | "medias"
> & {
  imagesLoaded: boolean;
  breakpoints: Breakpoints;
};

const GalleryMediaRenderer = (props: GalleryMediaRendererProps) => {
  const constants = useMemo(
    () => computeStyleConstants(props.breakpoints),
    [props.breakpoints]
  );

  const allMedias = useMemo<GalleryMediaAndMetadata[]>(() => {
    return props.medias.map(parseMediaMetadata);
  }, [props.medias]);

  const portaitMedias = useMemo<GalleryMediaAndMetadata[]>(() => {
    return allMedias
      .filter(({ isPortrait }) => isPortrait)
      .sort((a, b) => b.media.imgRatio - a.media.imgRatio)
      .reverse();
  }, [allMedias]);

  const landscapeMedias = useMemo<GalleryMediaAndMetadata[]>(() => {
    return allMedias
      .filter(({ isPortrait }) => !isPortrait)
      .sort((a, b) => b.media.imgRatio - a.media.imgRatio);
  }, [allMedias]);

  const renderMedia = useCallback(
    (priority: boolean) =>
      // eslint-disable-next-line react/display-name
      ({ media, ...metadata }: GalleryMediaAndMetadata, index: number) => {
        const active = isMediaActive(
          media,
          props.activeMediaId,
          props.imagesLoaded,
          props.hide
        );
        const { mediaStyles, className } = computeMediaStyles(
          constants,
          metadata,
          props.breakpoints,
          index,
          active,
          props.hide
        );
        return (
          <div key={media.id} style={mediaStyles} className={className}>
            <GalleryMedia
              media={media}
              visible={active}
              priority={priority || active}
            />
          </div>
        );
      },
    [
      constants,
      props.activeMediaId,
      props.breakpoints,
      props.hide,
      props.imagesLoaded,
    ]
  );

  const renderMediaList = useCallback(
    (metadataSubset: GalleryMediaAndMetadata[], priority?: boolean) => {
      return metadataSubset.map(renderMedia(priority ?? false));
    },
    [renderMedia]
  );

  return (
    <>
      {renderMediaList(portaitMedias)}
      {renderMediaList(landscapeMedias)}
    </>
  );
};

interface GalleryMediaProps {
  priority?: boolean;
  media: FormattedProjectMedia;
  visible?: boolean;
}

const GalleryMedia = (props: GalleryMediaProps) => {
  const klass = cn(styles.galleryMedia, [styles.visible, props.visible]);
  if (props.media.isVideo) {
    return (
      <video
        autoPlay
        muted
        loop
        className={cn(klass, styles.galleryMediaVideo)}
      >
        <source src={props.media.url} />
      </video>
    );
  }
  return (
    <Image
      fill
      src={props.media.url}
      alt={props.media.displayTitle}
      priority={props.priority}
      sizes="(max-width: 600px) 100vw, 80vw"
      className={klass}
    />
  );
};
