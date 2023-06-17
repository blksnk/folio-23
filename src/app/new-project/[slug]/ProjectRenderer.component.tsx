"use client";

import { FormattedProjectMedia, ProjectData } from "@/api/queries/oneProject";
import { useState } from "react";
import {
  Gallery
} from "@/components/Gallery/Gallery";
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
import styles from "@/app/new-project/[slug]/newProject.module.sass";
import { TextLine } from "@/components/AnimatedText/TextLine";
import {
  MediaSelector, MediaSelectorProps
} from "@/app/new-project/[slug]/MediaSelector.component";


interface ProjectRendererProps {
  medias: FormattedProjectMedia[];
  coverUrls: string[];
  colors: {
    rgb: string;
    values: number[];
    hex: string;
  }[]
  project: ProjectData;
}

export const ProjectRenderer = (props: ProjectRendererProps) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const { transitionOut, setTransitionOut, redirectTo} = useTransition()
  useSetMousePos()


  const backgroundProps = {
    coverUrls: props.coverUrls,
    colors: props.colors.map(({ rgb }) => rgb),
    hide: transitionOut,
    activeIndex,
    overBlur: true,
    blendMode: "multiply",
  }

  const mediaSelectorProps = {
    colors: props.colors,
    activeIndex,
    setActiveIndex,
  }

  const activeMedia = props.medias[activeIndex]

  const galleryProps = {
    medias: props.medias,
    activeMediaId: activeMedia?.id ?? "no id",
  }

  return (
    <>
      <BackgroundCover {...backgroundProps} />
      <Gallery { ...galleryProps }/>
      <LeftContent media={activeMedia} />
      <ProjectInfo project={props.project} />
      <RightColumn {...mediaSelectorProps}/>
      <ProjectOverlay/>
    </>
  )
}

const RightColumn = (props: MediaSelectorProps) => {
  return (
    <section className={styles.pageRight}>

    <MediaSelector {...props} />
      <div className={styles.rightContentLineLeft}></div>
    </section>
  )
}

