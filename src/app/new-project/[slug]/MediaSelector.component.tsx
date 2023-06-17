import styles from "@/app/new-project/[slug]/newProject.module.sass";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { formatNumber } from "@/utils/number";
import { combineClasses } from "@/utils/css";
import { Arrow } from "@/components/Arrow.component";
import { useState } from "react";

export interface MediaSelectorProps {
  colors: string[];
  activeIndex: number;
  setActiveIndex: (n: number) => void;
}

export function MediaSelector(props: MediaSelectorProps) {
  const [hoveringIndex, setHoveringIndex] = useState< number | undefined >(undefined)

  const onHover = (i: number) => () => setHoveringIndex(i);
  const onLeave = () => setHoveringIndex(undefined)
  const goToPrev = () => props.setActiveIndex(Math.max(0, props.activeIndex - 1))
  const goToNext = () => props.setActiveIndex(Math.min(props.colors.length - 1, props.activeIndex + 1))
  return (
    <div className={styles.mediaSelector}>
      <button className={styles.arrowContainer} onClick={goToPrev}>
        <Arrow disabled={props.activeIndex === 0}/>
      </button>
      {props.colors.map((color, index) => {
        const active = index === props.activeIndex;
        const hovering = index === hoveringIndex;
        const klass = combineClasses(styles.mediaSelectButton, [styles.active, active])
        const changeIndex = () => props.setActiveIndex(index);

        return (
          <button className={klass} onClick={changeIndex} key={index} onPointerLeave={onLeave} onPointerEnter={onHover(index)}>
            <TextLine hovering={hovering} active={active}>{formatNumber(index + 1)}</TextLine>
          </button>
        )
      })}
      <button className={styles.arrowContainer} onClick={goToNext}>
        <Arrow disabled={props.activeIndex === props.colors.length -1} down/>
      </button>
    </div>
  )
}