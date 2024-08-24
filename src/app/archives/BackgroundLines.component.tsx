import styles from "./page.module.sass";
import { LineGroup } from "@/components/Lines/LineGroup";
import { Breakpoint, cssCellWidth } from "@/utils/responsive";
import { cn } from "@/utils/css";

interface BackgroundLinesProps {
  breakpoint: Breakpoint;
  hide: boolean;
}

export const BackgroundLines = ({ breakpoint, hide }: BackgroundLinesProps) => {
  const lineCount = breakpoint === "default" ? 11 : 12;
  const spacing = `calc(${cssCellWidth(1, false, breakpoint)} - 1px)`;
  return (
    <div className={cn(styles.backgroundLines, [styles.hideLine, hide])}>
      <LineGroup count={lineCount} spacing={spacing} direction="vertical" />
    </div>
  );
};
