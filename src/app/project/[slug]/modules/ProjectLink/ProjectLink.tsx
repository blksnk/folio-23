"use client";

import styles from "./ProjectLink.module.sass";
import { cn } from "@/utils/css";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { useTransition } from "@/utils/transition";

interface ProjectLinkProps {
  link?: string;
}

const textProps = {
  fixedDuration: 600,
  delay: 1200,
  staggerDelay: 30,
};

const textPropsOut = {
  ...textProps,
  delay: 0,
  staggerDelay: 0,
};

export const ProjectLink = ({ link }: ProjectLinkProps) => {
  const { transitionOut } = useTransition();

  const text = transitionOut ? textPropsOut : textProps;

  if (!link) return null;

  return (
    <a
      href={link}
      className={cn(styles.projectLink)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TextLine
        hovering
        animatedTextProps={text}
        active
        className={styles.textLine}
      >
        Explore
      </TextLine>
    </a>
  );
};
