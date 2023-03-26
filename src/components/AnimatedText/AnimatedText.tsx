import { AnimatedCharacter } from "@/components/AnimatedText/AnimatedCharacter";
import styles from './AnimatedText.module.sass'

interface TextProps {
  children: string;
  delay?: number;
  duration?: number;
  fixedDuration?: number;
  className?: string;
  staggerDelay?: number;
}

export default function AnimatedText(props: TextProps) {
  const klass = `${styles.text} ${props.className ?? ''}`
  return (
    <span className={klass}>
      {
        props.children.split('').map((char, index) =>
          <AnimatedCharacter
            delay={props.staggerDelay ? (props.delay ?? 0) + props.staggerDelay * index : props.delay}
            duration={props.duration}
            fixedDuration={props.fixedDuration}
            className={props.className}
            key={'char' + index}
          >
            {char}
          </AnimatedCharacter>
        )}
    </span>
  )
}