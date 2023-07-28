
import styles from "./page.module.sass"
import { combineClasses } from "@/utils/css";
import { TextLine } from "@/components/AnimatedText/TextLine";
import fontRepo from "@/app/fonts";
import { Breakpoint } from "@/utils/responsive";

interface SideControllerProps {
  doPreview: boolean;
  clearSelection: () => void;
  selectFirst: () => void;
  hide?: boolean;
  progress?: number;
  breakpoint: Breakpoint
}

const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

export const SideController = ({ hide, doPreview, selectFirst, clearSelection, breakpoint }: SideControllerProps) => {
  const hideIndicator = hide || (doPreview && breakpoint === "mobile")

  return (
    <section className={combineClasses(styles.sideController, [styles.hide, hide])}>
      <button
        className={combineClasses(fontRepo.button.className, styles.controllerButton, styles.gridButton, [styles.active, !doPreview])}
        onClick={clearSelection}
      >
        <span>Grid</span>
      </button>

      <div className={combineClasses(styles.indicator, [styles.hide, hideIndicator])}></div>

      <button
        className={combineClasses(fontRepo.button.className, styles.controllerButton, styles.listButton, [styles.active, doPreview])}
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