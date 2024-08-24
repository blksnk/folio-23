"use client";

import { useTransition } from "@/utils/transition";
import styles from "./Experience.module.sass";
import { cnl } from "@/utils/css";

type JobLineProps = {
  isYear?: boolean;
};
export const JobLine = ({ isYear }: JobLineProps) => {
  const { transitionOut } = useTransition();
  const l = cnl(styles.hideLine, transitionOut);

  return <div className={l(styles.lineJobBottom, [styles.lineYear, isYear])} />;
};
