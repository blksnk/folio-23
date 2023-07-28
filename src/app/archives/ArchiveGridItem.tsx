import styles from "./page.module.sass"
import { GridItemWithPosition } from "@/utils/grid/types";
import { ArchiveListItem } from "@/api/queries/allArchives";
import Image from "next/image";
import {
  Breakpoint,
  cssCellHeight,
  cssCellWidth,
  cssUnit,
} from "@/utils/responsive";
import { combineClasses } from "@/utils/css";
import { archiveItemsSizes } from "@/utils/archives";
import { useMemo } from "react";

interface ArchiveGridItemProps {
  item: GridItemWithPosition<ArchiveListItem>;
  select: () => void;
  isSelected: boolean;
  index: number;
  selectedIndex: number | null;
  doPreview: boolean;
  breakpoint: Breakpoint;
  hide?: boolean;
}

const sizes = "(max-width: 650px) 80vw, 50vw"

const isBigImage = (item: GridItemWithPosition<ArchiveListItem>, b: Breakpoint) => {
  const breakpointSizes = Object.values(archiveItemsSizes[b])
  const biggestSizes = breakpointSizes.slice(breakpointSizes.length - 3)
  return biggestSizes.some((size) => item.height === size[0] && item.width === size[1]);
}

const itemPosition = (x: number, y: number, isSelected = true, b?: Breakpoint) =>  `translate(calc(${cssCellWidth(x, true, b)} + ${cssUnit(isSelected ? 0 : 1, b)}), calc(${cssCellHeight(y, true, b)} + ${cssUnit(isSelected ? 0 : 1, b)}))`

export const ArchiveGridItem = ({ item, select, isSelected, doPreview, selectedIndex, index, breakpoint, hide }: ArchiveGridItemProps) => {
  const priority = useMemo(() => isBigImage(item, breakpoint), [item, breakpoint])

  if(item.extraData === undefined) return null;

  const isDesktop = breakpoint === "default";
  const isMobile = breakpoint === "mobile";

  const selectedStyle = {
    height: `calc(${cssCellHeight(isDesktop ? 2 : 1, false, breakpoint)} - ${cssUnit(isSelected && !isMobile ? 0 : 2, breakpoint)})`,
    width: `calc(${cssCellWidth(isDesktop ? 1 : 2, false, breakpoint)} - ${cssUnit(isSelected && !isMobile ? 0 : 2, breakpoint)})`,
    transform: itemPosition(isMobile ? 8 : 0, 5 - ((selectedIndex ?? index) - index) * (isDesktop ? 2 : 1), isSelected && !isMobile, breakpoint)
  }

  const imageStyle = doPreview ? selectedStyle : {
    height: cssCellHeight(item.height, false, breakpoint),
    width: cssCellWidth(item.width, false, breakpoint),
    transform: itemPosition(item.x, item.y, true, breakpoint)
  }

  const imageBackgroundStyle = {
    opacity: doPreview ? 0 : 0.5,
    height: cssCellHeight(item.height + 2, false, breakpoint),
    width: cssCellWidth(item.width + 2, false, breakpoint),
    transform: itemPosition(item.x - 1, item.y - 1, true, breakpoint),
  }


  return (
    <>
      <div style={imageBackgroundStyle} className={combineClasses(styles.imageBackground, [styles.hide, hide])}>
        <Image priority={priority} sizes={sizes} src={item.extraData.media.asset.url}  fill alt={item.extraData.media.title ?? "Archived project"}/>
      </div>
      <div
        className={combineClasses(styles.image, [styles.imageSelected, isSelected], [styles.doPreview, doPreview], [styles.hide, hide])}
        style={imageStyle}
        onClick={select}
        data-index={index}
      >
        <Image priority={priority} sizes={sizes} src={item.extraData.media.asset.url} fill alt={item.extraData.media.title ?? "Archived project"}/>
      </div>
    </>
  )
}

const itemPreviewPosition = (x: number, y: number, isSelected = true, isMobile = false, b?: Breakpoint) =>  `translate(calc(${cssCellWidth(x, true, b)} + ${cssUnit(isSelected || isMobile ? 0 : 2)}), calc(${cssCellHeight(y, true, b)} + ${cssUnit(isSelected ? 0 : 1, b)}))`

export const ArchiveGridItemPreview = ({ item, select, isSelected, doPreview, selectedIndex, index, breakpoint, hide }: ArchiveGridItemProps) => {
  const priority = useMemo(() => isBigImage(item, breakpoint), [item, breakpoint])

  if(item.extraData === undefined) return null;

  const isDesktop = breakpoint === "default";
  const isMobile = breakpoint === "mobile";

  const previewStyle = {
    opacity: 1,
    height: `calc(${cssCellHeight(isDesktop ? 12 : isMobile ? 7 : 10, false, breakpoint)} - ${cssUnit(isSelected ? 0 : 2, breakpoint)})`,
    width: `calc(${cssCellWidth(isDesktop ? 6 : isMobile ? isSelected ? 8 : 6 : 7, false, breakpoint)} - ${cssUnit(isSelected || isMobile ? 0 : 4)})`,
    transform: itemPreviewPosition(isMobile ? isSelected ? 0 : 1 : 3, (isDesktop ? 0 : isMobile ? 2 : 1) - ((selectedIndex ?? index) - index) * (isDesktop ? 12 : isMobile ? 7 : 10), isSelected, isMobile, breakpoint)
  }

  const imageStyle = doPreview ? previewStyle : {
    opacity: 0,
    height: cssCellHeight(item.height, false, breakpoint),
    width: cssCellWidth(item.width, false, breakpoint),
    transform: itemPosition(item.x, item.y, true, breakpoint)
  }

  return (
    <div className={combineClasses(styles.imagePreview, [styles.selectedPreview, isSelected], [styles.doPreview, doPreview], [styles.hide, hide])} style={imageStyle} onClick={select}>
      <Image priority={priority} sizes={sizes} src={item.extraData.media.asset.url} fill alt={item.extraData.media.title ?? "Archived project"}/>
    </div>
  )
}