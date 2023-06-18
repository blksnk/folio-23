"use client";

import { FormattedProjectMedia, ProjectData } from "@/api/queries/oneProject";
import { useState } from "react";
import {
  Gallery
} from "@/components/Gallery/Gallery";
import {
  BackgroundCover
} from "@/components/BackgroundCover/BackgroundCover.component";
import { l, LeftContent } from "@/app/new-project/[slug]/LeftContent";
import {
  ProjectOverlay
} from "@/app/new-project/[slug]/ProjectOverlay.component";
import { ProjectInfo } from "@/app/new-project/[slug]/ProjectInfo.component";
import { useSetMousePos } from "@/utils/mousePos";
import { useTransition } from "@/utils/transition";
import styles from "@/app/new-project/[slug]/newProject.module.sass";
import {
  MediaSelector, MediaSelectorProps
} from "@/app/new-project/[slug]/MediaSelector.component";
import { Description } from "@/app/new-project/[slug]/Description.component";
import { ArrowDirection, useKeyboardInput } from "@/utils/keyboardInput";


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
  const { transitionOut, redirectTo} = useTransition()

  const goToPrev = () => setActiveIndex(Math.max(0, activeIndex - 1))
  const goToNext = () => setActiveIndex(Math.min(props.medias.length - 1, activeIndex + 1))

  const goBack = () => redirectTo('/new')
  const onArrow = (dir: ArrowDirection) => {
    switch(dir) {
      case "down":
      case "right":
        goToNext()
        break
      case "up":
      case "left":
        goToPrev()
    }
  }

  useKeyboardInput({
    onBack: goBack,
    onArrow,
  })
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
    goToPrev,
    goToNext,
    setActiveIndex,
    hide: transitionOut,
  }

  const activeMedia = props.medias[activeIndex]

  const galleryProps = {
    medias: props.medias,
    activeMediaId: activeMedia?.id ?? "no id",
  }

  const descriptionProps = {
    description: props.project.description,
    hide: transitionOut,
  }

  const leftContentProps = {
    media: activeMedia,
    color: props.colors[activeIndex]?.hex ?? props.project.backgroundColor.hex,
    redirect: goBack,
    hide: transitionOut
  }

  return (
    <>
      <BackgroundCover {...backgroundProps} />
      <Gallery { ...galleryProps }/>
      <LeftContent { ...leftContentProps } />
      <ProjectInfo project={props.project} />
      <RightColumn {...mediaSelectorProps}/>
      <Description { ...descriptionProps }/>
      <ProjectOverlay hide={transitionOut}/>
    </>
  )
}

const RightColumn = (props: MediaSelectorProps) => {
  return (
    <section className={styles.pageRight}>
      <div className={l(styles.lineAcrossRight, props.hide)}></div>
      <MediaSelector {...props} />
        <div className={l(styles.rightContentLineLeft, props.hide)}></div>
    </section>
  )
}
