"use client";

import { cnl } from "@/utils/css";
import styles from "./Skills.module.sass";
import { useTransition } from "@/utils/transition";

export const SkillLine = () => {
  const { transitionOut } = useTransition();
  const l = cnl(styles.hideLine, transitionOut);

  return <div className={l(styles.lineSkillBottom)} />;
};
