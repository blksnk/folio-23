import { useImagePreload } from "@/utils/images";
import { useEffect, useRef, useState } from "react";
import { clearTimeout } from "timers";
import { cn } from "@/utils/css";
import styles from "./BackgroundCover.module.sass";
import ClientOnlyPortal from "@/components/ClientOnlyPortal.component";
import Image from "next/image";
import { Blobs } from "../Blobs/Blobs.component";
import { isMobile } from "@/utils/breakpoints";
import { useTransition } from "@/utils/transition";
import { useSetMousePos } from "@/utils/mousePos";

export interface BackgroundProps {
  coverUrls: string[];
  colors?: string[];
  singleColor?: string;
  activeIndex: number;
  hide?: boolean;
  overBlur?: boolean;
  blendMode: "color-burn" | "multiply";
  blobs?: boolean;
}

const clearTimeoutSafe = (id: number) => {
  try {
    clearTimeout(id);
  } catch (e) {
    // fail silently
  }
};

export const BackgroundCover = (props: BackgroundProps) => {
  useSetMousePos();
  const { transitionOut } = useTransition();
  const activeCover = props.coverUrls[props.activeIndex];
  const { allLoaded, onLoad } = useImagePreload(props.coverUrls, () =>
    console.warn("all images loaded")
  );

  const [inTransition, setInTransition] = useState(false);
  const [transitionTimeoutId, setTransitionTimeoutId] = useState<number>(0);
  useEffect(() => {
    if (inTransition) {
      clearTimeoutSafe(transitionTimeoutId);
    }
    setInTransition(true);
    setTransitionTimeoutId(
      setTimeout(() => {
        setInTransition(false);
      }, 900) as unknown as number
    );
  }, [props.activeIndex]);

  const backgroundKlass = cn(
    styles.backgroundImageContainer,
    [styles.backgroundTransition, inTransition],
    [styles.backgroundLoading, !allLoaded || props.hide || transitionOut],
    [styles.overBlur, props.overBlur || !allLoaded]
  );
  const backgroundColorKlass = cn(styles.backgroundColor, [
    styles.backgroundLoading,
    !allLoaded || props.hide || transitionOut,
  ]);
  const backgroundColor =
    (props.colors ?? [])[props.activeIndex] ??
    props.singleColor ??
    "transparent";

  return (
    <ClientOnlyPortal selector="#backgroundRoot">
      {activeCover && (
        <>
          <div className={backgroundColorKlass} style={{ backgroundColor }} />

          {props.blobs && <OverlayBlobs />}
          <div
            className={backgroundKlass}
            style={{ mixBlendMode: props.blendMode }}
          >
            {props.coverUrls.map((coverUrl, index) => {
              const isActive = index === props.activeIndex;
              const className = cn(styles.backgroundImage, [
                styles.backgroundImageActive,
                isActive,
              ]);
              const key = [coverUrl, index].map(String).join("");
              return (
                <Image
                  key={key}
                  fill
                  src={coverUrl}
                  priority={isActive}
                  alt="project cover"
                  className={className}
                  onLoad={onLoad}
                />
              );
            })}
          </div>
        </>
      )}
    </ClientOnlyPortal>
  );
};

const OverlayBlobs = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const size = () => {
    if (isMobile()) return 0;
    return 96;
  };

  return (
    <div className={styles.overlayBlobs} ref={containerRef}>
      <Blobs
        className={styles.overlayBlobsBlobs}
        count={5}
        size={size}
        mixBlendMode="overlay"
      />
    </div>
  );
};
