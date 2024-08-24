"use client";

import styles from "./MediaSelector.module.sass";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { formatNumber } from "@/utils/number";
import { cnl } from "@/utils/css";
import { Arrow } from "@/components/Arrow.component";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTransition } from "@/utils/transition";
import type { FormattedProjectMedia } from "@/api/queries/oneProject";
import Image from "next/image";

export type MediaSelectorProps = {
  medias: FormattedProjectMedia[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
};

export function MediaSelector(props: MediaSelectorProps) {
  const { transitionOut } = useTransition();

  const c = cnl(styles.hide, transitionOut);

  const onButtonClick = useCallback(
    (index: number) => () => props.setActiveIndex(index),
    [props]
  );

  const animationLength = Math.max(props.medias.length - 1, 0);
  const appearTotalDuration = 900 + animationLength * 200;

  const prevDisabled = props.activeIndex === 0;
  const nextDisabled = props.activeIndex === props.medias.length - 1;
  return (
    <section className={styles.mediaSelector}>
      <button
        className={c(styles.arrowButton, styles.prev)}
        onClick={props.goToPrev}
        title="Previous Media"
        disabled={prevDisabled}
      >
        <Arrow disabled={prevDisabled} />
      </button>

      <aside className={styles.mediaButtons}>
        {props.medias.map((media, index) => {
          const key = `media-button-${index}-${media.id}`;
          const active = index === props.activeIndex;

          return (
            <MediaSelectorButton
              onClick={onButtonClick(index)}
              key={key}
              media={media}
              active={active}
              index={index}
            />
          );
        })}
      </aside>
      <button
        className={c(styles.arrowButton, styles.next)}
        onClick={props.goToNext}
        title="Next media"
        disabled={nextDisabled}
      >
        <Arrow disabled={nextDisabled} down />
      </button>
    </section>
  );
}

const ms = (n: number) => `${n}ms`;

type MediaSelectorButtonProps = {
  active?: boolean;
  media: FormattedProjectMedia;
  onClick: () => void;
  index: number;
};

const MediaSelectorButton = ({
  active,
  media,
  onClick,
  index,
}: MediaSelectorButtonProps) => {
  const { transitionOut } = useTransition();

  const scrollToEnabled = useRef<boolean>(false);

  const elementRef = useRef<HTMLButtonElement>(null);
  const alt = `Media preview (${media.displayTitle})${
    active ? " - Actve" : ""
  }`;

  const title = `View media ${media.displayTitle}`;
  const c = cnl(styles.hide, transitionOut);

  const src = media.isVideo ? media.videoThumbnailUrl : media.url;

  const imgStyle = {
    aspectRatio: media.imgRatio,
  };

  const animationDuration = transitionOut
    ? 600 - index * 50
    : 600 + index * 100;
  const animationDelay = transitionOut ? index * 75 : 300 + index * 100;
  const totalAnimationDuration = animationDuration + animationDelay;

  const style = {
    animationDuration: ms(animationDuration),
    animationDelay: ms(animationDelay),
  };

  const className = c(styles.mediaButton, [styles.active, active]);

  useEffect(() => {
    if (!scrollToEnabled.current) {
      const timeoutId = setTimeout(() => {
        scrollToEnabled.current = true;
      }, totalAnimationDuration);
      return () => clearTimeout(timeoutId);
    }
    if (active && elementRef.current && scrollToEnabled.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [active]);

  return (
    <button
      title={title}
      onClick={onClick}
      className={className}
      ref={elementRef}
      style={style}
    >
      {src && <Image style={imgStyle} src={src} alt={alt} fill priority />}
      <TextLine hovering={active}>{formatNumber(index + 1)}</TextLine>
    </button>
  );
};
