import styles from "@/app/project/[slug]/newProject.module.sass";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { formatNumber } from "@/utils/number";
import { combineClasses } from "@/utils/css";
import { Arrow } from "@/components/Arrow.component";
import { useState } from "react";

export interface MediaSelectorProps {
  colors: any[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  hide?: boolean;
}

export function MediaSelector(props: MediaSelectorProps) {
  const [hoveringIndex, setHoveringIndex] = useState< number | undefined >(undefined)

  const onHover = (i: number) => () => setHoveringIndex(i);
  const onLeave = () => setHoveringIndex(undefined)
  return (
    <div className={styles.mediaSelector}>
      <button className={combineClasses(styles.arrowContainer, [styles.hide, props.hide])} onClick={props.goToPrev} title="Previous Media">
        <Arrow disabled={props.activeIndex === 0}/>
      </button>
      {props.colors.map((color, index) => {
        const active = index === props.activeIndex;
        const hovering = index === hoveringIndex;
        const klass = combineClasses(styles.mediaSelectButton, [styles.active, active], [styles.hide, props.hide])
        const changeIndex = () => props.setActiveIndex(index);

        const title = `Media n°${index + 1}${active ? " - Active" : ""}`

        return (
          <button className={klass} onClick={changeIndex} key={index} onPointerLeave={onLeave} onPointerEnter={onHover(index)} title={title}>
            <TextLine hovering={hovering} active={active}>{formatNumber(index + 1)}</TextLine>
          </button>
        )
      })}
      <button className={combineClasses(styles.arrowContainer, [styles.hide, props.hide])} onClick={props.goToNext} title="Next media">
        <Arrow disabled={props.activeIndex === props.colors.length -1} down/>
      </button>
    </div>
  )
}