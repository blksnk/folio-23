import { ReactNode } from "react";
import styles from "@/layouts/GridLayout.module.sass";

interface GridProps {
  className?: string;
  children: ReactNode;
}

export default function GridLayout(props: GridProps) {
  const klass = `${styles.grid} ${props.className ?? ''}`

  return (
    <section className={klass}>
      {props.children}
    </section>
  )
}

interface GridItemProps {
  className?: string;
  children?: ReactNode;
}

export const GridItemCenter = (props: GridItemProps) => {
  const klass = `${styles.gridItemCenterContainer} ${props.className ?? ''}`
  return (
    <div className={klass}>
      {props.children}
    </div>
  )
}