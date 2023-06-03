import styles from "@/app/new/page.module.sass";
import { LineGroup } from "@/components/Lines/LineGroup";

const l = (lineClass: string) => `${styles.line} ${lineClass}`

export const OverlayLines = () => (
  <>
    <div className={l(styles.linesCenter)}>
      <LineGroup count={14} spacing={{from: 12, to: 4}} direction="vertical"/>
    </div>
    <div className={l(styles.linesRight)}>
      <LineGroup count={14} spacing={{from: 4, to: 12}} direction="vertical"/>
    </div>
    <div className={l(styles.lineLeft)}></div>
    <div className={l(styles.lineThird)}></div>
    <div className={l(styles.linesTop)}>
    </div>
    <div className={l(styles.lineTop)}></div>
    <div className={l(styles.lineBottom)}></div>
    <div className={l(styles.lineAcross)}></div>
    <div className={l(styles.linesBottomLeft)}>
      <LineGroup count={10} spacing={14} direction="horizontal"/>
    </div>
    <div className={l(styles.lineTopCenter)}></div>
    <div className={l(styles.lineBottomRight)}></div>
    <div className={l(styles.linesCenterLeft)}>
      <LineGroup count={3} spacing={6} direction="horizontal"/>
    </div>
  </>
)