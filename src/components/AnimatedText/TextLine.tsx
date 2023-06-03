"use client"

import AnimatedText, { AnimatedTextProps } from "@/components/AnimatedText/AnimatedText";
import styles from './AnimatedText.module.sass'

interface TextLineProps {
  children: string;
  active?: boolean;
  hovering?: boolean;
  className?: string;
  onClick?: () => void;
  onLeave?: () => void;
  onEnter?: () => void;
  animatedTextProps?: Omit<AnimatedTextProps, "children">;
}

export const TextLine = (props: TextLineProps) => {
  const klass = `${styles.textLine} ${props.active ? styles.textLineActive : ""} ${props.hovering ? styles.textLineHovering : ""} ${props.className ?? ''}`

  if(typeof props.animatedTextProps === "object") {
    return (
      <span className={klass} onClick={props.onClick} onPointerEnter={props.onEnter} onPointerLeave={props.onLeave}>
        <AnimatedText {...props.animatedTextProps}>{props.children}</AnimatedText>
      </span>
    )
  }

  return (
    <span className={klass} onClick={props.onClick} onPointerEnter={props.onEnter} onPointerLeave={props.onLeave} >{props.children}</span>
  )
}