import styles from "./page.module.sass"
import { LineGroup } from "@/components/Lines/LineGroup";
import { Breakpoint, cssCellWidth } from "@/utils/responsive";

interface BackgroundLinesProps {
  breakpoint: Breakpoint
}

export const BackgroundLines = ({ breakpoint }: BackgroundLinesProps) => {
  const lineCount = breakpoint === "default" ? 11 : 12
  const spacing = `calc(${cssCellWidth(1, false, breakpoint)} - 1px)`
  return (
    <div className={styles.backgroundLines}>
      <LineGroup count={lineCount} spacing={spacing} direction="vertical"/>
    </div>
  )
}