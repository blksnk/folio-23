"use client"

import styles from "@/app/page.module.sass";
import { Explore } from "@/app/Explore.component";
import { PageLeft } from "@/app/ProjectsList.component";
import { ProjectListItemData } from "@/api/queries/allProjects";
import { useCallback, useEffect, useRef, useState } from "react";
import { OverlayLines } from "@/app/Overlay.component";
import { Weather } from "@/app/Weather.component";
import { Timer } from "@/app/Timer.component";
import { useSetMousePos } from "@/utils/mousePos";
import {
  BackgroundCover, BackgroundProps
} from "@/components/BackgroundCover/BackgroundCover.component";
import { useTransition } from "@/utils/transition";
import { ArrowDirection, useKeyboardInput } from "@/utils/keyboardInput";

const CAROUSEL_INTERVAL = 6000

export interface RendererProps {
  projects: ProjectListItemData[];
  weatherProps: {
    city: string;
    weather: string;
  }
}

const createProjectLink = (slug: string) => '/project/' + slug

export const Renderer = (props: RendererProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const timeoutId = useRef<NodeJS.Timer>();
  const doCarousel = useRef(true);
  const { transitionOut, redirectTo } = useTransition()
  useSetMousePos()

  const changeActiveIndex = useCallback((n: 1 | -1) => {
    const maxIndex = props.projects.length-1;
    if(n === -1 && activeIndex <= 0) {
      return setActiveIndex(maxIndex)
    }
    if(n === 1 && activeIndex >= maxIndex) {
      return setActiveIndex(0)
    }
    return setActiveIndex(activeIndex + n)

  }, [activeIndex, props.projects])


  const activeProjectSlug = props.projects[activeIndex].slug;

  const allProjectCoverUrls = props.projects.map(({ cover }) => cover.url)
  const allProjectColors = props.projects.map(({ backgroundColor }) => backgroundColor.hex);
  const onArrow = (dir: ArrowDirection) => {
    clearCarouselTimeout()
    doCarousel.current = false;
    switch(dir) {
      case "down":
      case "right":
        changeActiveIndex(1)
        break
      case "up":
      case "left":
        changeActiveIndex(-1)
    }
  }

  const clearCarouselTimeout = () => clearTimeout(timeoutId.current);

  const redirectOnConfirm = () => {
    doCarousel.current = false;
    clearCarouselTimeout();
    const projectLink = createProjectLink(activeProjectSlug)
    redirectTo(projectLink)
  }

  const childProps = {
    projects: props.projects,
    activeIndex,
    changeActiveIndex,
    setActiveIndex: (index: number) => {
      doCarousel.current = false;
      clearCarouselTimeout();
      setActiveIndex(index);
    },
    hide: transitionOut,
    redirectOnConfirm,
    redirectTo,
  }

  useKeyboardInput({
    onArrow,
    onConfirm: redirectOnConfirm
  })

  useEffect(() =>{
    if (timeoutId.current) {
      clearCarouselTimeout()
    }
    if (doCarousel.current) {
      timeoutId.current = setTimeout(() => changeActiveIndex(1), CAROUSEL_INTERVAL);
    }

  }, [activeIndex, doCarousel])

  useEffect(() => () => {
    clearCarouselTimeout()
  }, []);

  const backgroundProps: BackgroundProps = {
    coverUrls: allProjectCoverUrls,
    colors: allProjectColors,
    hide: transitionOut,
    activeIndex,
    blendMode: "color-burn",
  }

  return (
    <>
      <BackgroundCover {...backgroundProps} />
      <section className={styles.dateAndWeather}>
        <Weather {...props.weatherProps} hide={transitionOut}/>
        <Timer hide={transitionOut}/>
      </section>
      <section className={styles.explore}>
        <Explore slug={activeProjectSlug} hide={transitionOut} redirectTo={redirectTo}/>
      </section>
      <PageLeft {...childProps}/>
      <OverlayLines hide={transitionOut}/>

    </>
  )
}
