"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import type { AnimatedTextProps } from "@/components/AnimatedText/AnimatedText";

export type TransitionData = {
  transitionOut: boolean;
  redirectTo: (url: string) => void;
};

export const useTransitionContext = () => {
  const [transitionOut, setTransitionOut] = useState(false);
  const router = useRouter();
  const redirectTo = (url: string) => {
    setTransitionOut(true);
    setTimeout(() => router.push(url), 1200);
  };

  return {
    transitionOut,
    redirectTo,
  };
};

export const TransitionContext = createContext<TransitionData>({
  transitionOut: false,
  redirectTo: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const textAnimation = (
  hide = false,
  duration = 600,
  delay = 1200,
  staggerDelay?: number
): Omit<AnimatedTextProps, "children"> => ({
  fixedDuration: hide ? 300 : duration,
  staggerDelay: hide ? 0 : staggerDelay,
  delay: hide ? 0 : delay,
});

export type TransitionProps = {
  hide?: boolean;
};
