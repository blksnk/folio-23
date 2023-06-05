import styles from "@/app/new/page.module.sass";
import { LineGroup } from "@/components/Lines/LineGroup";

const l = (lineClass: string, hide?: boolean) => `${styles.line} ${hide ? styles.hideLine : ''} ${lineClass}`

interface OverlayLinesProps {
  hide?: boolean
}

export const OverlayLines = ({ hide }: OverlayLinesProps) => (
  <>
    <div className={l(styles.linesCenter, hide)}>
      <LineGroup count={14} spacing={{from: 12, to: 4}} direction="vertical"/>
    </div>
    <div className={l(styles.linesRight, hide)}>
      <LineGroup count={14} spacing={{from: 4, to: 12}} direction="vertical"/>
    </div>
    <div className={l(styles.lineLeft, hide)}></div>
    <div className={l(styles.lineThird, hide)}></div>
    <div className={l(styles.linesTop, hide)}>
    </div>
    <div className={l(styles.lineTop, hide)}></div>
    <div className={l(styles.lineBottom, hide)}></div>
    <div className={l(styles.lineAcross, hide)}></div>
    <div className={l(styles.linesBottomLeft, hide)}>
      <LineGroup count={10} spacing={14} direction="horizontal"/>
    </div>
    <div className={l(styles.lineTopCenter, hide)}></div>
    <div className={l(styles.lineBottomRight, hide)}></div>
    <div className={l(styles.linesCenterLeft, hide)}>
      <LineGroup count={3} spacing={6} direction="horizontal"/>
    </div>
  </>
)