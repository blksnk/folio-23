"use client"

import { landscapeRatios, portraitRatios, allRatios } from "@/components/Gallery/data";
import styles from './Gallery.module.sass';
import breakpoints from "@/utils/breakpoints";
import { useEffect, useState } from "react";
import { combineClasses } from "@/utils/css";


export function GalleryBackground() {
  const [ isTablet, setIsTablet ] = useState(false)
  useEffect(() => {
    const computeIsTablet = () => {
      setIsTablet(window.innerWidth <= breakpoints.tablet)
    }
    window.addEventListener("resize", computeIsTablet)

    return () => window.removeEventListener("resize", computeIsTablet)
  }, [])
  const sidePadding = isTablet ? "9px" : "44px"
  const columnCount = isTablet ? 8 : 10
  const topPadding = isTablet ? "9px" : "36px"
  const containerWidth = `calc((100vw - (${sidePadding} * 2)) / 12 * ${columnCount})`

  return (
    <div className={styles.framesContainer}>
      {landscapeRatios.map((ratio, index) => {

        const height = `calc(${containerWidth} / ${landscapeRatios[0]} + ${index * 12}px)`
        const aspectRatio = String(ratio)

        const style = {
          height,
          maxWidth: containerWidth,
          aspectRatio,
          animationDelay: index * 200 + "ms"
        }
        return (
          <div key={ratio} style={style} className={combineClasses(styles.frame, styles.landscape)}></div>
        )
      })}
      {portraitRatios.map((ratio, index) => {
        const height = `calc(100% - ${index * 12}px)`
        const aspectRatio = String(ratio)
        const style = {
          height,
          maxWidth: containerWidth,
          aspectRatio,
          animationDelay: index * 200 + "ms"
        }
        return (
          <div key={ratio} style={style} className={combineClasses(styles.frame, styles.portrait)}></div>
        )
      })}
    </div>
  )
}