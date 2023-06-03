"use client"

import styles from "@/app/new/page.module.sass";
import { Explore } from "@/app/new/Explore.component";
import { PageLeft } from "@/app/new/ProjectsList.component";
import { ProjectListItemData } from "@/api/queries/allProjects";
import { useCallback, useEffect, useState } from "react";
import ClientOnlyPortal from "@/components/ClientOnlyPortal.component";
import { preloadImage } from "@/utils/images";

export interface RendererProps {
  projects: ProjectListItemData[];
  activeIndex: number;
}

export const Renderer = (props: Omit<RendererProps, "activeIndex">) => {
  const [activeIndex, setActiveIndex] = useState(0)

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

  const childProps = {
    projects: props.projects,
    activeIndex,
    changeActiveIndex,
    setActiveIndex,
  }

  return (
    <>
      <Background {...childProps}/>
      <section className={styles.explore}>
        <Explore/>
      </section>
      <PageLeft {...childProps}/>
    </>
  )
}

const preloadAllImages = async (projects: ProjectListItemData[]) => {
  await Promise.all(projects.map(({ cover }) => preloadImage(cover.url)))
  return true
}


const Background = (props: RendererProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [inTransition, setInTransition] = useState(false);
  const [oldCoverUrl, setOldCoverUrl] = useState("");
  const [transitionTimeoutId, setTransitionTimeoutId] = useState<NodeJS.Timeout | number>(0);
  const [backgroundTransitionTimeoutId, setBackgroundTransitionTimeoutId] = useState<NodeJS.Timeout | number>(0);
  const activeProject = props.projects[props.activeIndex]
  useEffect(() => {
    setOldCoverUrl(activeProject?.cover.url ?? "")
    if(!imagesLoaded) {
      preloadAllImages(props.projects).then(() => setImagesLoaded(true))
    }
  }, [])

  useEffect(() => {
    // trigger image animation when index changes
    if(inTransition) {
      clearTimeout(transitionTimeoutId)
      clearTimeout(backgroundTransitionTimeoutId)
    }
    console.log("start transition")
    setInTransition(true)
    setBackgroundTransitionTimeoutId(
      setTimeout(() => {
        setOldCoverUrl(props.projects[props.activeIndex].cover.url)
        console.log('end transition')
      }, 600)
    )
    setTransitionTimeoutId(
      setTimeout(() => {
        setInTransition(false)
      }, 800))
  }, [props.activeIndex])

  if(!activeProject || !imagesLoaded) return null

  const backgroundKlass = `${styles.backgroundImageContainer} ${inTransition ? styles.backgroundTransition : ""}`

  const backgroundColor = activeProject.backgroundColor.hex
  const coverUrl = activeProject.cover.url

  return (
    <ClientOnlyPortal selector="#backgroundRoot">
      <>
        <div className={styles.background} style={{ backgroundColor }}></div>
        <div className={backgroundKlass}>
          <img src={oldCoverUrl} alt={activeProject.title} className={styles.oldBackgroundImage}></img>
          <img src={coverUrl} alt={activeProject.title} className={styles.backgroundImage}></img>
        </div>
      </>
    </ClientOnlyPortal>
  )
}