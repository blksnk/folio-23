"use client";

import styles from "./page.module.sass"
import { ArchiveListItem } from "@/api/queries/allArchives";
import { GridLayoutData } from "@/utils/grid/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  rows,
  gridMarginY,
  Breakpoint, currentBreakPoint
} from "@/utils/responsive";
import { Vector2 } from "@/utils/gestures";
import { clamp, debounce } from "lodash";
import {
  ArchiveListItemWithColor,
  archivesToGridLayout, Color
} from "@/utils/archives";
import { SideController } from "@/app/archives/SideController.component";
import {
  BackgroundCover
} from "@/components/BackgroundCover/BackgroundCover.component";
import { useTransition } from "@/utils/transition";
import { BackgroundLines } from "@/app/archives/BackgroundLines.component";
import { preloadImage } from "@/utils/images";
import { ArchivesGrid } from "@/app/archives/ArchivesGrid";
import { onPointerMove } from "@/utils/mousePos";
import { ArrowDirection, useKeyboardInput } from "@/utils/keyboardInput";
import { SideNav } from "@/app/archives/SideNav.component";

interface ArchiveRendererProps {
  archives: ArchiveListItemWithColor[];
  gridLayout: GridLayoutData<ArchiveListItemWithColor>
  initialBreakpoint: Breakpoint;
  colors: Color[];
  coverUrls: string[];
}

export const cellHeight2 = () => (window.innerHeight - (gridMarginY() * 2)) / rows();

const preloadAllImages = async (coverUrls: string[]) => {
  await Promise.all(coverUrls.map(url => preloadImage(url)))
  return true
}

export const ArchiveRenderer = (props: ArchiveRendererProps) => {
  // cache SSR props
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(props.initialBreakpoint)
  const breakpointRef = useRef(breakpoint);
  const [gridLayout, setGridLayout] = useState<GridLayoutData<ArchiveListItem>>(props.gridLayout)
  const [colors, setColors] = useState(props.colors)
  const [coverUrls, setCoverUrls] = useState(props.coverUrls);
  const { transitionOut, redirectTo} = useTransition()
  const mouseDown = useRef(false);
  const dragging = useRef(false);
  const listening = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedIndexRef = useRef(selectedIndex)
  const selectedId = useMemo(() => typeof selectedIndex === "number" && !isNaN(selectedIndex) ? gridLayout.items[selectedIndex]?.id || null : null
  , [gridLayout, selectedIndex]);
  const doPreview = useMemo(() => selectedId !== null, [selectedId]);
  const doPreviewRef = useRef(doPreview);
  const scrollY = useRef(0)
  const scrollYTarget = useRef(0);
  const prevScrollYTarget = useRef(0);
  const scrollLimit = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0.5)
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const currentMousePos = useRef<Vector2>({x: 0, y: 0})
  const dragStartMousePos = useRef<Vector2>({x: 0, y: 0})
  const dragEndMousePos = useRef<Vector2>({x: 0, y: 0})
  const indicatorProgress = useMemo(() => (doPreview && selectedIndex !== null ? (selectedIndex / Math.max(props.archives.length - 1)) : scrollProgress), [scrollProgress, doPreview, props.archives, selectedIndex])
  const animationId = useRef(0)

  useEffect(() => {
    if(!imagesLoaded) {
      preloadAllImages(props.coverUrls).then(() => setImagesLoaded(true))
    }
  }, [])

  const changeActiveIndex = useCallback((n: 1 | -1) => {
    const maxIndex = props.archives.length-1;
    const i = selectedIndexRef.current;
    if (i === null || isNaN(i)) return;
    return setSelectedIndex(clamp(i + n, 0, maxIndex))

  }, [selectedIndexRef, props.archives])

  useEffect(() => {
    if(!isNaN(selectedIndex ?? 0)) {
      selectedIndexRef.current = selectedIndex
    }
  }, [selectedIndex])

  const onArrow = (dir: ArrowDirection) => {
    switch(dir) {
      case "up":
        return changeActiveIndex(-1)
      case "down":
        return changeActiveIndex(1)
    }
  }
  const clearSelection = () => {
    setSelectedIndex(null)
    scrollLimit.current = Math.max(gridLayout.matrixSize.height * cellHeight2() - cellHeight2() * 10, 0)
    scrollYTarget.current = prevScrollYTarget.current;
    document.documentElement.style.setProperty('--scroll-y', -scrollY.current + "px")
  }

  const onBack = () => {
    if(doPreview) {
      clearSelection()
    } else {
      redirectTo('/')
    }
  }

  useEffect(() => {
    const animate = () => {
      const multiplier = breakpoint === "mobile" ? 0.15 : 0.09
      const value = scrollY.current + (scrollYTarget.current - scrollY.current) * multiplier
      const diff = scrollY.current - value;
      if (Math.abs(diff) > 0.00001) {
        console.debug(value, multiplier)
        scrollY.current = value;
        document.documentElement.style.setProperty('--scroll-y', -value + "px")
        if(scrollLimit.current !== 0) {
          document.documentElement.classList.toggle(styles.scrolling, true)
          setScrollProgress(value / Math.max(scrollLimit.current, 1))
        }
      }
      animationId.current = window.requestAnimationFrame(animate)
    }

    animationId.current = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(animationId.current)
  }, [breakpoint])

  useKeyboardInput({ onArrow, onBack })

  const onResize = useCallback(debounce(() => {
    const b = currentBreakPoint()
    if(b === breakpointRef.current) return;
    // exit preview mode
    breakpointRef.current = b;
    if (doPreviewRef.current) {
      clearSelection()
    }
    const layout = archivesToGridLayout(props.archives, b)
    const archiveUrls = layout.items.map(({ extraData }) => extraData?.media.asset.url ?? "");
    setColors(layout.items.map(({extraData}) => (extraData?.color ?? colors[0])))
    setCoverUrls(layout.items.map((item, index) => item.extraData?.media.asset.url ?? archiveUrls[index]))
    setGridLayout(layout);
    setBreakpoint(b)
  }, 500), [props.archives, colors, breakpointRef, doPreviewRef]);

  const changeActiveIndexOnScroll = useCallback(debounce((n: 1 | -1) => {
    changeActiveIndex(n)
  }, 100, {
    leading: true,
    trailing: false,
  }), [])

  const onScroll = useCallback(({ deltaY, ...e }: WheelEvent | { deltaY: number}) => {
    console.log(e, deltaY)

    scrollYTarget.current = clamp(scrollYTarget.current + deltaY, 0, scrollLimit.current)
    // document.documentElement.style.setProperty('--scroll-y', -scrollY.current + "px")
  if (scrollLimit.current === 0 && Math.abs(deltaY) > 20) {
    changeActiveIndexOnScroll(deltaY > 0 ?  1 : -1)
  }


  }, [scrollY, scrollLimit, changeActiveIndex])

  const onDragStart = useCallback((e: PointerEvent) => {
    const { clientX, clientY } = e
    const vec = { x: clientX, y: clientY };
    dragStartMousePos.current = vec;
    currentMousePos.current = vec;
    mouseDown.current = true;
  }, [])

  const onDragEnd = useCallback((e: PointerEvent) => {
    const { clientX, clientY } = e
    const vec = { x: clientX, y: clientY };
    dragEndMousePos.current = vec;
    currentMousePos.current = vec;
    if(doPreviewRef.current && dragging.current) {
      const deltaY = Math.round(dragStartMousePos.current.y - vec.y);
      const n = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY) as 1 | -1 | 0
      if(!isNaN(n) && n !== 0) {
        changeActiveIndex(n)
      }
    }
    mouseDown.current = false;
    dragging.current = false;
  }, [doPreviewRef, changeActiveIndex, dragStartMousePos])

  const onMove = useCallback((e: PointerEvent) => {
    const { clientX, clientY } = onPointerMove(e)
    const vec = { x: clientX, y: clientY };
    const deltaY = currentMousePos.current.y - vec.y
    if (mouseDown.current) {
      dragging.current = true;
    }
    if(dragging.current) {

      if(!doPreviewRef.current) {
        onScroll({ deltaY: deltaY * 1.5 })
      } else if (Math.abs(deltaY) > 40) {
        changeActiveIndexOnScroll(deltaY > 0 ?  1 : -1)
      }
    }

    currentMousePos.current = vec;
  }, [currentMousePos, doPreviewRef, dragging, onScroll])


  useEffect(() => {

    if(typeof window !== "undefined" && !listening.current) {
      const limit = Math.max(gridLayout.matrixSize.height * cellHeight2() - cellHeight2() * 10, 0)
      scrollLimit.current = limit
      breakpointRef.current = breakpoint
      if(limit !== 0) {
        setScrollProgress(0)
      }
      listening.current = true;
      window.addEventListener("wheel", onScroll,{ passive: true })
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDragStart, { passive: true })
      window.addEventListener('pointerup', onDragEnd, { passive: true })
      window.addEventListener("resize", onResize, { passive: true })
    }

  }, [listening, onResize, onScroll, onDragStart, onDragEnd, onMove, gridLayout, breakpoint])

  useEffect(() => {
    return () => {
      window.removeEventListener("wheel", onScroll)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDragStart)
      window.removeEventListener('pointerup', onDragEnd)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  useEffect(() => {
    doPreviewRef.current = doPreview
  }, [doPreview])

  const selectArchive = (index: number, force?: boolean) => {
    // document.documentElement.classList.toggle(styles.scrolling, false)
    const doSelect = force || !dragging.current
    if(!isNaN(index) && doSelect) {
      scrollLimit.current = 0;
      prevScrollYTarget.current = scrollYTarget.current;
      scrollYTarget.current = 0;
      console.log('------ select ------')
      document.documentElement.style.setProperty('--scroll-y', 0 + "px")
      setSelectedIndex(index);
    }
  }

  const selectFirst = () => {
    if(!doPreview) {
      selectArchive(0, true);
    }
  }

  const redirectToHome = () => redirectTo('/')

  return (
    <>
      <BackgroundCover
        coverUrls={ coverUrls }
        activeIndex={typeof selectedIndex === "number" ? selectedIndex : 0}
        blendMode="multiply"
        singleColor="#000"
        hide={selectedIndex === null || transitionOut}
        overBlur
        colors={colors.map(({rgb}) => rgb)}
      />
      <BackgroundLines breakpoint={breakpoint} hide={transitionOut}/>
      <ArchivesGrid
        gridLayout={gridLayout}
        breakpoint={breakpoint}
        doPreview={doPreview}
        selectedId={selectedId}
        selectedIndex={selectedIndex}
        hide={transitionOut || !imagesLoaded}
        selectArchive={selectArchive}
      />
      <SideController
        doPreview={doPreview}
        clearSelection={clearSelection}
        selectFirst={selectFirst}
        hide={transitionOut}
        breakpoint={breakpoint}
        progress={indicatorProgress}
      />
      <SideNav
        hide={transitionOut}
        breakpoint={breakpoint}
        doPreview={doPreview}
        redirectToHome={redirectToHome}
        totalCount={props.archives.length}
        selectedIndex={selectedIndex ?? 0}
      />
    </>
  )
}

