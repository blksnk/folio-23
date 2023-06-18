import { preloadImage } from "@/utils/images";
import { useEffect, useState } from "react";
import { clearTimeout } from "timers";
import { combineClasses } from "@/utils/css";
import styles from "@/app/new/page.module.sass";
import ClientOnlyPortal from "@/components/ClientOnlyPortal.component";
import Image from "next/image";

const preloadAllImages = async (coverUrls: string[]) => {
  await Promise.all(coverUrls.map(url => preloadImage(url)))
  return true
}

interface BackgroundProps {
  coverUrls: string[];
  colors?: string[];
  singleColor?: string;
  activeIndex: number;
  hide?: boolean;
  overBlur?: boolean;
  blendMode: "color-burn" | "multiply";
}

const clearTimeoutSafe = (id: number) => {
  try {
    clearTimeout(id)
  }
  catch(e) {
    // fail silently
  }
}

const setHTMLBackgroundColor = (color: string) => {
  if(!document?.documentElement) return;

  document.documentElement.style.backgroundColor = color;
}

export const BackgroundCover = (props: BackgroundProps) => {
  const activeCover = props.coverUrls[props.activeIndex];
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [inTransition, setInTransition] = useState(false);
  const [oldCoverUrl, setOldCoverUrl] = useState(activeCover);
  const [coverUrl, setCoverUrl] = useState(activeCover);
  const [transitionTimeoutId, setTransitionTimeoutId] = useState<number>(0);
  const [backgroundTransitionTimeoutId, setBackgroundTransitionTimeoutId] = useState<number>(0);
  useEffect(() => {
    if(!imagesLoaded) {
      preloadAllImages(props.coverUrls).then(() => setImagesLoaded(true))
    }
  }, [])
  useEffect(() => {
    // trigger image animation when index changes
    if(inTransition) {
      clearTimeoutSafe(transitionTimeoutId)
      clearTimeoutSafe(backgroundTransitionTimeoutId)
    }
    setInTransition(true)
    setBackgroundTransitionTimeoutId(
      setTimeout(() => {
        setOldCoverUrl(props.coverUrls[props.activeIndex])
      }, 1200) as unknown as number
    )
    setTransitionTimeoutId(
      setTimeout(() => {
        setInTransition(false)
      }, 600) as unknown as number
    )
    setTimeout(() => {
      setCoverUrl(props.coverUrls[props.activeIndex])
    }, 400)
  }, [props.activeIndex])


  const backgroundKlass = combineClasses(styles.backgroundImageContainer, [styles.backgroundTransition, inTransition], [styles.backgroundLoading, !imagesLoaded || props.hide], [styles.overBlur, props.overBlur])
  const backgroundColorKlass = combineClasses(styles.background, [styles.backgroundLoading, !imagesLoaded || props.hide])
  const backgroundColor = ((props.colors ?? [])[props.activeIndex]) ?? props.singleColor ?? "transparent";

  return (
    <ClientOnlyPortal selector="#backgroundRoot">
      <>
        <div className={backgroundColorKlass} style={{ backgroundColor }}></div>
        <div className={backgroundKlass} style={{ mixBlendMode: props.blendMode }}>
          <Image fill src={coverUrl} priority alt="project cover" className={styles.backgroundImage}></Image>
          <Image fill src={oldCoverUrl} priority alt="project cover" className={styles.oldBackgroundImage}></Image>
        </div>
      </>
    </ClientOnlyPortal>
  )
}
