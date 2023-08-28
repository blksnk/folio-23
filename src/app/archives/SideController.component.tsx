import styles from "./page.module.sass"
import { combineClasses } from "@/utils/css";
import { TextLine } from "@/components/AnimatedText/TextLine";
import fontRepo from "@/app/fonts";
import { Breakpoint, cellHeight } from "@/utils/responsive";
import { useEffect, useMemo, useState } from "react";
import { clamp } from "lodash";

interface SideControllerProps {
  doPreview: boolean;
  clearSelection: () => void;
  selectFirst: () => void;
  hide?: boolean;
  progress: number;
  breakpoint: Breakpoint
}

const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

export const SideController = ({ hide, doPreview, selectFirst, clearSelection, breakpoint, progress }: SideControllerProps) => {

  return (
    <section className={combineClasses(styles.sideController, [styles.hide, hide])}>
      <button
        className={combineClasses(fontRepo.button.className, styles.controllerButton, styles.gridButton, [styles.active, !doPreview], [styles.hide, hide])}
        onClick={clearSelection}
      >
        <span>Grid</span>
      </button>

      <Indicator {...{ doPreview, hide, progress, breakpoint }}/>

      <button
        className={combineClasses(fontRepo.button.className, styles.controllerButton, styles.listButton, [styles.active, doPreview], [styles.hide, hide])}
        onClick={selectFirst}
      >
        <span>List</span>
      </button>
      <TextLine className={styles.spacer}>01</TextLine>

      <div className={l(styles.linesVertical, hide)}></div>
      {/*<div className={l(styles.linesVerticalBottom, hide)}></div>*/}
      <div className={l(styles.linesTop, hide)}></div>
      <div className={l(styles.linesBottom, hide)}></div>
    </section>
  )
}

function easeInOutQuad (t: number, b: number, c: number, d: number): number {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

type IndicatorProps = Pick<SideControllerProps, "doPreview" | "hide" | "progress" | "breakpoint">

const Indicator = ({ hide, doPreview, progress, breakpoint }: IndicatorProps) => {
  const [count, setCount] = useState(Math.round(cellHeight(breakpoint) * (breakpoint === "mobile" ? 9 : 10) / (breakpoint === "mobile" ? 13 : 17)))
  useEffect(() => {
    const onResize = () => {
      setCount(Math.round(cellHeight(breakpoint) * (breakpoint === "mobile" ? 9 : 10) / (breakpoint === "mobile" ? 13 : 17)))
    }
    window.addEventListener("resize", onResize)
    onResize()

    return () => window.removeEventListener("resize", onResize)
  }, [breakpoint])
  const hideIndicator = hide
  const minPercent = 0.2
  const spread = doPreview ? 3 : breakpoint === "mobile" ? 5 : 7
  const minWidth = minPercent * 100 + "%"
  const maxWidth = "100%";
  const middleIndex = clamp(count * progress, 0, count)
  const lineWidths = useMemo(() => Array(count + spread).fill('').map((_, index) => {
    const absoluteDiff = Math.abs(middleIndex - (index - 1) + (spread / 4))
    if(absoluteDiff > spread) return minWidth
    if(absoluteDiff === 0) return maxWidth
    const widthCoef = (spread - absoluteDiff) / spread
    const widthEased = easeInOutQuad(widthCoef, minPercent, 1 - minPercent, 1)
    return widthEased * 100 + "%"
  }), [count, spread, middleIndex, minWidth, maxWidth])

  return (
    <div className={combineClasses(styles.indicator, [styles.hide, hideIndicator], [styles.doPreview, doPreview])}>
      {lineWidths.map((width, index) =>
        <div style={{ width }} key={"line" + index} className={l(styles.indicatorLine, hide)}></div>
      )}
    </div>
  )
}