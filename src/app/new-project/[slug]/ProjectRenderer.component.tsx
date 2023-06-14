"use client";

import { FormattedProjectMedia, ProjectData } from "@/api/queries/oneProject";
import { useState } from "react";
import {
  GalleryBackground
} from "@/components/Gallery/GalleryBackground.component";
import {
  BackgroundCover
} from "@/components/BackgroundCover/BackgroundCover.component";
import { LeftContent } from "@/app/new-project/[slug]/LeftContent";
import {
  ProjectOverlay
} from "@/app/new-project/[slug]/ProjectOverlay.component";
import { ProjectInfo } from "@/app/new-project/[slug]/ProjectInfo.component";
import { useSetMousePos } from "@/utils/mousePos";
import { useTransition } from "@/utils/transition";

interface ProjectRendererProps {
  medias: FormattedProjectMedia[];
  coverUrls: string[];
  colors: string[];
  project: ProjectData;
}

export const ProjectRenderer = (props: ProjectRendererProps) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const { transitionOut, setTransitionOut, redirectTo} = useTransition()
  useSetMousePos()


  const backgroundProps = {
    coverUrls: props.coverUrls,
    colors: props.colors,
    hide: transitionOut,
    activeIndex,
    overBlur: true,
  }

  return (
    <>
      <BackgroundCover {...backgroundProps} />
      <GalleryBackground/>
      <LeftContent />
      <ProjectInfo project={props.project} />
      <ProjectOverlay/>
    </>
  )
}