"use client"

import styles from './Gallery.module.sass';
import breakpoints from "@/utils/breakpoints";
import { useEffect, useMemo, useState } from "react";
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
  activeMediaId: string;
  hide?: boolean;
}


// TODO: wait for images to load before rendering
export function Gallery(props: GalleryProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [ isTablet, setIsTablet ] = useState(false)
  useEffect(() => {
    const computeIsTablet = () => {
      setIsTablet(window.innerWidth <= breakpoints.tablet)
    }
    window.addEventListener("resize", computeIsTablet)
    computeIsTablet()

    return () => window.removeEventListener("resize", computeIsTablet)
  }, [])
  useEffect(() => {
    if(!imagesLoaded) {
      preloadAllImages(props.medias.map(({ url }) => url)).then(() => setImagesLoaded(true))
    }
  }, [])
  // split landscape and portrait medias

  const [landscapeMedias, portraitMedias, squareMedias] = useMemo(() => {
    return props.medias
      .reduce((acc: [FormattedProjectMedia[], FormattedProjectMedia[], FormattedProjectMedia[]], media) => {
        const landscape = acc[0];
        const portrait = acc[1];
        const square = acc[2];
        if (media.closestRatio > 1) {
          landscape.push(media);
        } else if (media.closestRatio < 1) {
          portrait.push(media)
        } else {
          square.push(media)
        }
        return [ landscape, portrait, square ]
      }, [[], [], []])
      .map((medias) => medias.sort((a, b) => {
        const comp = 1
        return a.imgRatio > b.imgRatio ? -comp : comp;
      }))
  }, [props.medias])

  const mediaProps = (media: FormattedProjectMedia) => {

    const active = media.id === props.activeMediaId && imagesLoaded && !props.hide;
    const zIndex = active ? 1 : 2;
    const aspectRatio = String(media.imgRatio);
    return {
      active,
      zIndex,
      aspectRatio,
    }
  }
  const sidePadding = isTablet ? "9px" : "44px"
  const spacing = isTablet ? 6 : 12
  const columnCount = 10
  const rowCount = isTablet ? 7 : 9;
  const topPadding = isTablet ? "9px" : "36px"
  const containerWidth = `calc((100vw - (${sidePadding} * 2)) / 12 * ${columnCount})`
  const containerHeight = `calc((100vh - (${topPadding} * 2)) / 12 * ${rowCount})`
  const frameHeightLandscape = (i: number) => {
    return `calc(min(calc(${containerWidth} / ${landscapeMedias[0].imgRatio}), ${containerHeight}) - ${i * spacing}px)`
  }
  const frameHeightPortrait = (i: number) => {
    return `calc(min(calc(${containerWidth} / ${portraitMedias[0].imgRatio}), ${containerHeight}) - ${i * spacing}px)`
  }

  return (
    <div className={styles.framesContainer}>

      {[...landscapeMedias, ...squareMedias].map((media, index) => {

        const height = frameHeightLandscape(index)
        const { aspectRatio, zIndex, active } = mediaProps(media);
        const style = {
          height,
          maxHeight: containerHeight,
          aspectRatio,
          animationDelay: 300 + index * 200 + "ms",
          zIndex,
        }
        return (
          <div key={media.id} style={style} className={combineClasses(styles.frame, styles.landscape, [styles.visible, active])}>
            <GalleryMedia media={media} visible={active}/>
          </div>
        )
      })}
      {portraitMedias.map((media, index) => {
        const i = index + landscapeMedias.length + squareMedias.length;
        const height = frameHeightPortrait(i)
        const { aspectRatio, zIndex, active } = mediaProps(media);
        const style = {
          height,
          aspectRatio,
          animationDelay: 300 + i * 200 + "ms",
          zIndex,
        }
        return (
          <div key={media.id} style={style} className={combineClasses(styles.frame, styles.portrait, [styles.visible, active])}>
            <GalleryMedia media={media} visible={active}/>
          </div>
        )
      })}
    </div>
  )
}

interface GalleryMediaProps {
  media: FormattedProjectMedia;
  visible?: boolean;
}

const GalleryMedia = (props: GalleryMediaProps) => {
  const klass = combineClasses(styles.galleryMedia, [styles.visible, props.visible])
  return (
    <Image fill src={props.media.url} alt={props.media.displayTitle} sizes="(max-width: 600px) 100vw, 80vw" className={klass}/>
  )
}