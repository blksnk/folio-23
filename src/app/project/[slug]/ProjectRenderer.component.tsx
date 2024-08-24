"use client";

import { FormattedProjectMedia, ProjectData } from "@/api/queries/oneProject";
import { useState } from "react";
import { Gallery } from "@/components/Gallery/Gallery";
import { BackgroundCover } from "@/components/BackgroundCover/BackgroundCover.component";
import { useTransition } from "@/utils/transition";
import { ArrowDirection, useKeyboardInput } from "@/utils/keyboardInput";
import { MediaInfo, MediaSelector, type MediaSelectorProps } from "./modules/";

interface ProjectRendererProps {
  medias: FormattedProjectMedia[];
  mediasByRatio: FormattedProjectMedia[];
  nonPortraitMediaCount: number;
  coverUrls: string[];
  colors: {
    rgb: string;
    values: number[];
    hex: string;
  }[];
  project: ProjectData;
}

export const ProjectRenderer = (props: ProjectRendererProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { transitionOut, redirectTo } = useTransition();

  const goToPrev = () => setActiveIndex(Math.max(0, activeIndex - 1));
  const goToNext = () =>
    setActiveIndex(Math.min(props.medias.length - 1, activeIndex + 1));

  const walkGallery = () => {
    if (activeIndex >= props.medias.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const goBack = () => redirectTo("/");
  const onArrow = (dir: ArrowDirection) => {
    switch (dir) {
      case "down":
      case "right":
        goToNext();
        break;
      case "up":
      case "left":
        goToPrev();
    }
  };

  useKeyboardInput({
    onBack: goBack,
    onArrow,
  });

  const backgroundProps = {
    coverUrls: props.coverUrls,
    colors: props.colors.map(({ rgb }) => rgb),
    hide: transitionOut,
    activeIndex,
    overBlur: true,
    blendMode: "multiply" as "multiply",
  };

  const mediaSelectorProps: MediaSelectorProps = {
    medias: props.medias,
    activeIndex,
    goToPrev,
    goToNext,
    setActiveIndex,
  };

  const activeMedia = props.medias[activeIndex];

  const galleryProps = {
    medias: props.mediasByRatio,
    activeMediaId: activeMedia?.id ?? "no id",
    walkGallery,
    nonPortraitMediaCount: props.nonPortraitMediaCount,
    hide: transitionOut,
  };

  return (
    <>
      <BackgroundCover {...backgroundProps} />
      <Gallery {...galleryProps} />
      <MediaInfo
        color={
          props.colors[activeIndex]?.hex ?? props.project.backgroundColor.hex
        }
        media={activeMedia}
      />
      <MediaSelector {...mediaSelectorProps} />
    </>
  );
};
