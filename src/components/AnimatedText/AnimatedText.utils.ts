"use client";

import { useTransition } from "@/utils/transition";
import type { AnimatedTextProps } from "./AnimatedText";
import { useMemo } from "react";
import { replaceWithSpacesWhenHidden } from "@/utils/css";

export const useTextTransition = (
  props: AnimatedTextProps
): AnimatedTextProps => {
  const { transitionOut } = useTransition();
  return useMemo(
    () => ({
      ...props,
      fixedDuration: transitionOut ? 300 : props.fixedDuration,
      staggerDelay: transitionOut ? 0 : props.staggerDelay,
      delay: transitionOut ? 0 : props.delay,
      children: replaceWithSpacesWhenHidden(props.children, transitionOut),
    }),
    [props, transitionOut]
  );
};
