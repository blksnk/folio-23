import GridLayout from "@/layouts/GridLayout";
import { AnimatedCharacter } from "@/components/AnimatedText/AnimatedCharacter";
import styles from "./TitleGrid.module.sass"
import { titleCharKlass } from "@/app/fonts";
interface TitleGridProps {
  title: string;
  className?: string;
  fixedDuration?: number;
  delay?: number;
}

// TODO: fix padding and letter spacing

const getGridPos = (index: number) => {
  let col = index + 1
  let row = 1
  if(col <= 5) return [row, col]
  while (col > 5) {
    col -= 5
    row++
  }
  return [row, col]
}

export default function TitleGrid(props: TitleGridProps) {
  return (
    <GridLayout className={props.className}>
      {props.title.split('').map((char, index) => {
        const pos = getGridPos(index);
        const style = {
          gridRowStart: pos[0],
          gridColumnStart: pos[1],
        }
        return (
          <div className={ styles.titleCharContainer }
               key={ 'titleChar' + index }
               style={ style }>
            <AnimatedCharacter
              className={ titleCharKlass() }
              fixedDuration={ props.fixedDuration ?? 1200 }
              delay={props.delay}
            >{ char }</AnimatedCharacter>
          </div>
        )
      })}
    </GridLayout>
  )
}