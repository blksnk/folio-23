"use client";

import { TransitionContext, useTransitionContext } from "@/utils/transition";
import type { ReactNode } from "react";

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const ctx = useTransitionContext();
  return (
    <TransitionContext.Provider value={ctx}>
      {children}
    </TransitionContext.Provider>
  );
};

export default function Template({ children }: { children: ReactNode }) {
  return <TransitionProvider>{children}</TransitionProvider>;
}
