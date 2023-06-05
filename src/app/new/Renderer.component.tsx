"use client"

import styles from "@/app/new/page.module.sass";
import { Explore } from "@/app/new/Explore.component";
import { PageLeft } from "@/app/new/ProjectsList.component";
import { ProjectListItemData } from "@/api/queries/allProjects";
import { useCallback, useEffect, useState } from "react";
import ClientOnlyPortal from "@/components/ClientOnlyPortal.component";
import { preloadImage } from "@/utils/images";
import { OverlayLines } from "@/app/new/Overlay.component";
import { clearInterval, clearTimeout } from "timers";
import { Weather } from "@/app/new/Weather.component";
import { Timer } from "@/app/new/Timer.component";
import { combineClasses } from "@/utils/css";
import { useRouter } from "next/navigation";
import { useSetMousePos } from "@/utils/mousePos";
import {
  BackgroundCover
} from "@/components/BackgroundCover/BackgroundCover.component";

export interface RendererProps {
  projects: ProjectListItemData[];
  weatherProps: {
    city: string;
    weather: string;
  }
}

export const Renderer = (props: RendererProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [transitionOut, setTransitionOut] = useState(false)
  const router = useRouter()
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


  const redirectTo = (url: string) => {
    setTransitionOut(true)
    setTimeout(() => router.push(url), 1200)
  }

  const childProps = {
    projects: props.projects,
    activeIndex,
    changeActiveIndex,
    setActiveIndex,
    hide: transitionOut
  }
  const activeProjectSlug = props.projects[activeIndex].slug;
  const allProjectCoverUrls = props.projects.map(({ cover }) => cover.url)
  const allProjectColors = props.projects.map(({ backgroundColor }) => backgroundColor.hex);

  const backgroundProps = {
    coverUrls: allProjectCoverUrls,
    colors: allProjectColors,
    hide: transitionOut,
    activeIndex,
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
