import { combineClasses, replaceWithSpacesWhenHidden } from "@/utils/css";
import styles from "@/app/project/[slug]/newProject.module.sass";
import { AnimatedTextStaggered } from "@/components/AnimatedText/AnimatedText";

interface DescriptionProps {
  description?: string;
  hide?: boolean;
}

export const Description = (props: DescriptionProps) => {

  const textProps = {
      fixedDuration: props.hide ? 300 : 600,
      delay: props.hide ? 300 : 1200,
      staggerDelay: 30,
  }
  if(!props.description) return null;

  return (
    <div className={combineClasses(styles.descriptionContainer, [styles.hide, props.hide])}>
    <AnimatedTextStaggered {...textProps}>{replaceWithSpacesWhenHidden(props.description, props.hide)}</AnimatedTextStaggered>
    </div>
  )
}