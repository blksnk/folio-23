import { combineClasses } from "@/utils/css";
import { inspect } from "util";
import styles from "@/app/new-project/[slug]/newProject.module.sass";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { AnimatedTextStaggered } from "@/components/AnimatedText/AnimatedText";

interface DescriptionProps {
  description?: string;
  hide?: boolean;
}

export const Description = (props: DescriptionProps) => {

  const textProps = {
      fixedDuration: 600,
      delay: props.hide ? 0 : 1200,
      staggerDelay: 30,
  }
  if(!props.description) return null;

  return (
    <div className={combineClasses(styles.descriptionContainer, [styles.hide, props.hide])}>
    <AnimatedTextStaggered {...textProps}>{props.description}</AnimatedTextStaggered>
    </div>
  )
}