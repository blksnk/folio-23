"use client"

import { isTablet } from "@/utils/breakpoints";

const intersectionObserverOptions = {
  root: null,
  rootMargin: isTablet() ? "60px" : "0px",
  threshold: 0.1,
}

export const observe = (target: HTMLElement, onEnter: (e: IntersectionObserverEntry[], o: IntersectionObserver) => void) => {
  const observer = new IntersectionObserver(onEnter, intersectionObserverOptions)
  observer.observe(target);
  return observer.disconnect;
}