"use client";

import AnimatedText, {
  AnimatedTextProps,
} from "@/components/AnimatedText/AnimatedText";
import styles from "./AnimatedText.module.sass";
import { cn, type ClassDef } from "@/utils/css";
import { useState } from "react";
import { useTransition } from "@/utils/transition";

export type TextLineProps = {
  children: string;
  active?: boolean;
  hovering?: boolean;
  className?: string;
  onClick?: () => void;
  onLeave?: () => void;
  onEnter?: () => void;
  animatedTextProps?: Omit<AnimatedTextProps, "children">;
  log?: boolean;
};

export const TextLine = (props: TextLineProps) => {
  const { transitionOut } = useTransition();
  const [animationEnd, setAnimationEnd] = useState(
    !(typeof props.animatedTextProps === "object")
  );
  const classDefs: ClassDef[] = [
    styles.textLine,
    [styles.textLineActive, props.active && animationEnd && !transitionOut],
    [styles.textLineHovering, props.hovering && animationEnd && !transitionOut],
    props.className ?? "",
  ];

  const klass = cn(...classDefs);

  if (typeof props.animatedTextProps === "object") {
    return (
      <span
        className={klass}
        onClick={props.onClick}
        onPointerEnter={props.onEnter}
        onPointerLeave={props.onLeave}
      >
        <AnimatedText
          onAnimationEnd={() => setAnimationEnd(true)}
          {...props.animatedTextProps}
          log={props.log}
        >
          {props.children}
        </AnimatedText>
      </span>
    );
  }

  return (
    <span
      className={klass}
      onClick={props.onClick}
      onPointerEnter={props.onEnter}
      onPointerLeave={props.onLeave}
    >
      {props.children}
    </span>
  );
};
