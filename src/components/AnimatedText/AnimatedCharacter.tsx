"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./AnimatedText.module.sass";

export const characters = [
  " ",
  String.fromCharCode(160),
  "/",
  ".",
  ",",
  ";",
  ":",
  "%",
  "&",
  "@",
  "#",
  "*",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  '"',
  "'",
  "`",
  "-",
  "_",
  "À",
  "Â",
  "A",
  "B",
  "C",
  "D",
  "É",
  "È",
  "Ê",
  "Ë",
  "E",
  "F",
  "G",
  "H",
  "Î",
  "Ï",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "\n",
];

interface CharacterProps {
  children: string;
  delay?: number;
  duration?: number;
  fixedDuration?: number;
  className?: string;
}

export const AnimatedCharacter = ({
  children,
  delay,
  duration = 20,
  fixedDuration,
  className,
}: CharacterProps) => {
  const klass = `${styles.character} ${className ?? ""}`;

  const s = children[0].toUpperCase();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [delayElapsed, setDelayElapsed] = useState(false);

  const targetIndex = useMemo(() => characters.indexOf(s), [s]);
  const displayChar = useMemo(
    () => (s === "\n" ? "\n" : characters[currentIndex]),
    [currentIndex, s]
  );

  useEffect(() => {
    setDelayElapsed(false);
  }, [s]);

  useEffect(() => {
    if (delay && delay > 0 && !delayElapsed) {
      setTimeout(() => {
        setDelayElapsed(true);
      }, delay);
    } else {
      setDelayElapsed(true);
    }
  }, [delay, delayElapsed]);

  useEffect(() => {
    if (!delayElapsed || s === "\n") return;
    const offsetPolarity = targetIndex >= currentIndex ? 1 : -1;
    let count = 1;
    let diff = Math.abs(targetIndex - currentIndex);

    const intervalDuration = fixedDuration
      ? Math.round(fixedDuration / diff)
      : duration;
    if (targetIndex === currentIndex) return;
    let intervalId = setInterval(() => {
      if (count > diff) {
        clearInterval(intervalId);
      } else {
        setCurrentIndex(currentIndex + count * offsetPolarity);
        count++;
      }
    }, intervalDuration);
    return () => clearInterval(intervalId);
  }, [delayElapsed, duration, fixedDuration]);
  return <span className={klass}>{displayChar}</span>;
};
