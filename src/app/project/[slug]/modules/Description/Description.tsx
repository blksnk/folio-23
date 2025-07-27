import { cn } from "@/utils/css";
import styles from "./Description.module.sass";
import { AnimatedTextStaggered } from "@/components/AnimatedText/AnimatedText";

interface DescriptionProps {
  description?: string;
}

const textProps = {
  fixedDuration: 600,
  delay: 1200,
  staggerDelay: 30,
};

export const Description = (props: DescriptionProps) => {
  if (!props.description) return null;

  return (
    <div className={cn(styles.descriptionContainer)}>
      <AnimatedTextStaggered {...textProps}>
        {props.description}
      </AnimatedTextStaggered>
    </div>
  );
};
