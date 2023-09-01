"use client"

import styles from './Gallery.module.sass';
import { breakpoints } from "@/utils/breakpoints";
import { useEffect, useState } from "react";
import { combineClasses } from "@/utils/css";
import { FormattedProjectMedia } from "@/api/queries/oneProject";
import { preloadImage } from "@/utils/images";
import Image from "next/image";
const preloadAllImages = async (coverUrls: string[]) => {
  await Promise.all(coverUrls.map(url => preloadImage(url)))
  return true
}

interface GalleryProps {
  medias: FormattedProjectMedia[];
  nonPortraitMediaCount: number;
  activeMediaId: string;
  hide?: boolean;
  walkGallery: () => void;
}

export function Gallery(props: GalleryProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [ isTablet, setIsTablet ] = useState(false)
  const [ isMobile, setIsMobile ] = useState(false)
  const [ isVertical, setIsVertical ] = useState(false);
  useEffect(() => {
    const computeBreakpoint = () => {
      setIsTablet(breakpoints.isTablet())
      setIsMobile(breakpoints.isMobile())
      setIsVertical(breakpoints.isVertical())
    }
    window.addEventListener("resize", computeBreakpoint)
    computeBreakpoint()

    return () => window.removeEventListener("resize", computeBreakpoint)
  }, [])
  useEffect(() => {
    if(!imagesLoaded) {
      preloadAllImages(props.medias.filter(({ isVideo }) => !isVideo).map(({ url }) => url)).then(() => setImagesLoaded(true))
    }
  }, [])
  // split landscape and portrait medias

  const mediaProps = (media: FormattedProjectMedia) => {

    const active = media.id === props.activeMediaId && imagesLoaded && !props.hide;
    const zIndex = active ? 1 : 2;
    const aspectRatio = String(media.imgRatio);
    const isPortrait = 1 > media.imgRatio
    return {
      active,
      zIndex,
      aspectRatio,
      isPortrait,
    }
  }
  const spacing = isMobile ? 6 : 12
  const columnCount = 10
  const rowCount = isTablet ? 7 : 9;
  const topPadding = isMobile ? "12px" : isTablet ? "24px" : "36px"
  const sidePadding = isMobile ? "9px" : isTablet ? "28px" : "44px"
  const containerWidth = `calc((100vw - (${sidePadding} * 2)) / 12 * ${columnCount})`
  const containerHeight = `calc((100vh - (${topPadding} * 2)) / 12 * ${rowCount})`

  const frameHeightLandscape = (i: number) => {
    return `calc(min(calc(${containerWidth} / ${props.medias[0].imgRatio}), ${containerHeight}) ${isVertical ? '-' : '-'} ${i * spacing}px)`
  }
  const frameHeightPortrait = (i: number) => {
    return `calc(min(calc(${containerWidth} / ${props.medias[props.medias.length - 1].imgRatio}), ${containerHeight}) - ${(i - props.nonPortraitMediaCount) * spacing}px)`
  }

  const frameWidthPortrait = (i: number) => {
    return `calc(min(calc(${containerHeight} * ${props.medias[props.medias.length - 1].imgRatio}), ${containerWidth}) + ${i * spacing}px)`
  }

  return (
    <div className={styles.framesContainer} onClick={props.walkGallery}>

      {props.medias.map((media, index) => {
        const { aspectRatio, zIndex, active, isPortrait } = mediaProps(media);
        const height = isPortrait ? frameHeightPortrait(index) : frameHeightLandscape(index)
        console.log(height)
        // const width = isPortrait ? frameWidthPortrait(props.medias.length - 1 - index) : undefined
        const animationDelay = props.hide ? 100 * index + "ms" : 300 + index * 200 + "ms";
        const style = {
          height,
          // width,
          aspectRatio,
          maxWidth: containerWidth,
          maxHeight: containerHeight,
          animationDelay,
          zIndex,
        }
        return (
          <div key={media.id} style={style} className={combineClasses(styles.frame, isPortrait ? styles.portrait : styles.landscape, [styles.visible, active], [styles.hide, props.hide])}>
            <GalleryMedia media={media} visible={active} priority={index === 0}/>
          </div>
        )
      })}
    </div>
  )
}

interface GalleryMediaProps {
  priority?: boolean;
  media: FormattedProjectMedia;
  visible?: boolean;
}

const GalleryMedia = (props: GalleryMediaProps) => {
  const klass = combineClasses(styles.galleryMedia, [styles.visible, props.visible])
  if (props.media.isVideo) {
    return (
      <video autoPlay muted loop className={combineClasses(klass, styles.galleryMediaVideo)}>
        <source src={props.media.url}/>
      </video>
    )
  }
  console.log('test')
  return (
    <Image fill src={props.media.url} alt={props.media.displayTitle} priority={props.priority} sizes="(max-width: 600px) 100vw, 80vw" className={klass}/>
  )
}