"use client";

import { PageLeft } from "@/app/ProjectsList.component";
import { ProjectListItemData } from "@/api/queries/allProjects";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackgroundCover,
  BackgroundProps,
} from "@/components/BackgroundCover/BackgroundCover.component";
import { useTransition } from "@/utils/transition";
import { ArrowDirection, useKeyboardInput } from "@/utils/keyboardInput";
import { Overlay, Explore } from "./modules";

const CAROUSEL_INTERVAL = 6000;

export interface RendererProps {
  projects: ProjectListItemData[];
}

const createProjectLink = (slug: string) => "/project/" + slug;

export const Renderer = (props: RendererProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutId = useRef<number>();
  const doCarousel = useRef(true);
  const { transitionOut, redirectTo } = useTransition();

  const changeActiveIndex = useCallback(
    (n: 1 | -1) => {
      const maxIndex = props.projects.length - 1;
      if (n === -1 && activeIndex <= 0) {
        return setActiveIndex(maxIndex);
      }
      if (n === 1 && activeIndex >= maxIndex) {
        return setActiveIndex(0);
      }
      return setActiveIndex(activeIndex + n);
    },
    [activeIndex, props.projects]
  );

  const activeProjectSlug = props.projects[activeIndex].slug;

  const allProjectCoverUrls = props.projects.map(({ cover }) => cover.url);
  const allProjectColors = props.projects.map(
    ({ backgroundColor }) => backgroundColor.hex
  );
  const onArrow = (dir: ArrowDirection) => {
    clearCarouselTimeout();
    doCarousel.current = false;
    switch (dir) {
      case "down":
      case "right":
        changeActiveIndex(1);
        break;
      case "up":
      case "left":
        changeActiveIndex(-1);
    }
  };

  const onKey = (key: string) => {
    console.log(key);
    if (key === "a") redirectTo("/archives");
    if (key === "p") redirectTo("/profile");
  };

  const clearCarouselTimeout = useCallback(() => {
    if (!timeoutId.current) return;
    clearTimeout(timeoutId.current);
  }, [timeoutId]);

  const redirectOnConfirm = () => {
    doCarousel.current = false;
    clearCarouselTimeout();
    const projectLink = createProjectLink(activeProjectSlug);
    redirectTo(projectLink);
  };

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
  };

  useKeyboardInput({
    onArrow,
    onConfirm: redirectOnConfirm,
    onKey,
  });

  useEffect(() => {
    if (timeoutId.current) {
      clearCarouselTimeout();
    }
    if (doCarousel.current) {
      timeoutId.current = setTimeout(
        () => changeActiveIndex(1),
        CAROUSEL_INTERVAL
      ) as unknown as number;
    }
  }, [activeIndex, doCarousel]);

  useEffect(
    () => () => {
      clearCarouselTimeout();
    },
    []
  );

  const backgroundProps: BackgroundProps = {
    coverUrls: allProjectCoverUrls,
    colors: allProjectColors,
    hide: transitionOut,
    activeIndex,
    blendMode: "color-burn",
    blobs: true,
  };

  return (
    <>
      <BackgroundCover {...backgroundProps} />
      <Explore slug={activeProjectSlug} />
      <PageLeft {...childProps} />
      <Overlay />
    </>
  );
};
