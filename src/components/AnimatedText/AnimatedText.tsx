"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatedCharacter,
  characters,
} from "@/components/AnimatedText/AnimatedCharacter";
import styles from "./AnimatedText.module.sass";
import { observe } from "@/utils/intersectionObserver";
import { useTextTransition } from "./AnimatedText.utils";

export interface AnimatedTextProps {
  children: string;
  delay?: number;
  duration?: number;
  fixedDuration?: number;
  className?: string;
  staggerDelay?: number;
  whenVisible?: boolean;
  onAnimationEnd?: () => void;
  log?: boolean;
}

export default function AnimatedText(props: AnimatedTextProps) {
  const {
    children,
    delay,
    duration = 20,
    fixedDuration,
    className,
    whenVisible,
    onAnimationEnd,
  } = useTextTransition(props);

  const klass = `${styles.text} ${className ?? ""}`;
  const charKlass = `${styles.character} ${className ?? ""}`;

  const s = useMemo(() => children.toUpperCase(), [children]);

  const chars = useMemo(() => s.split(""), [s]);
  const element = useRef<HTMLSpanElement | null>(null);
  const [currentIndexes, setCurrentIndexes] = useState(Array(s.length).fill(0));
  const [delayElapsed, setDelayElapsed] = useState(false);

  const targetIndexes = useMemo(
    () => chars.map((c) => characters.indexOf(c)),
    [chars]
  );
  const displayChars = useMemo(
    () => currentIndexes.map((i) => characters[i]),
    [currentIndexes]
  );

  useEffect(() => {
    if (s.length !== currentIndexes.length) {
      if (s.length < currentIndexes.length) {
        setCurrentIndexes(currentIndexes.slice(0, s.length));
      } else {
        setCurrentIndexes(
          Array(s.length)
            .fill(0)
            .map((space, index) => currentIndexes[index] ?? space)
        );
      }
    }

    setDelayElapsed(false);
  }, [s, props.children]);

  useEffect(() => {
    const startTimeout = (noDelay?: boolean) => {
      if (delay && delay > 0 && !delayElapsed && !noDelay) {
        setTimeout(() => {
          setDelayElapsed(true);
        }, delay);
      } else {
        setDelayElapsed(true);
      }
    };

    const startWhenVisible = (entries: IntersectionObserverEntry[]) => {
      if (entries.every((entry) => entry.isIntersecting)) {
        startTimeout(true);
      }
    };

    if (whenVisible && element.current) {
      observe(element.current as HTMLSpanElement, startWhenVisible);
    } else {
      startTimeout();
    }
  }, [delay, delayElapsed, whenVisible, element]);

  useEffect(() => {
    if (!delayElapsed || s === "\n") return;

    const diffsAndOffsetPolarities = currentIndexes.map((currentIndex, i) => {
      const targetIndex = targetIndexes[i];
      const offsetPolarity = targetIndex >= currentIndex ? 1 : -1;
      return [Math.abs(targetIndexes[i] - currentIndex), offsetPolarity];
    });
    const maxDiff = diffsAndOffsetPolarities.reduce(
      (acc, [diff]) => Math.max(acc, diff),
      0
    );
    let count = 1;

    const intervalDuration = fixedDuration
      ? Math.round(fixedDuration / maxDiff)
      : duration ?? 20;
    // break early if all indexes match
    if (
      currentIndexes.every(
        (currentIndex, index) => currentIndex === targetIndexes[index]
      )
    ) {
      return;
    }
    const intervalId = setInterval(() => {
      if (count > maxDiff) {
        if (onAnimationEnd) onAnimationEnd();
        clearInterval(intervalId);
      } else {
        const newIndexes = currentIndexes.map((currentIndex, index) => {
          const targetIndex = targetIndexes[index];
          const [diff, offsetPolarity] = diffsAndOffsetPolarities[index];
          return count > diff
            ? targetIndex
            : currentIndex + count * offsetPolarity;
        });
        setCurrentIndexes(newIndexes);
        count++;
      }
    }, intervalDuration);
    return () => clearInterval(intervalId);
  }, [delayElapsed, duration, fixedDuration, targetIndexes]);

  return (
    <span className={klass} ref={element}>
      {chars.map((_, index) => (
        <span className={charKlass} key={"char" + index}>
          {displayChars[index]}
        </span>
      ))}
    </span>
  );
}

export function AnimatedTextStaggered(props: AnimatedTextProps) {
  const klass = `${styles.text} ${props.className ?? ""}`;

  const p = useTextTransition(props);

  return (
    <span className={klass}>
      {p.children.split("").map((char, index) => (
        <AnimatedCharacter
          delay={
            p.staggerDelay ? (p.delay ?? 0) + p.staggerDelay * index : p.delay
          }
          duration={p.duration}
          fixedDuration={p.fixedDuration}
          className={p.className}
          key={"char" + index}
        >
          {char}
        </AnimatedCharacter>
      ))}
    </span>
  );
}
