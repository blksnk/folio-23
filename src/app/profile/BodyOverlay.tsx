"use client";
import { cnl } from "@/utils/css";
import { useTransition } from "@/utils/transition";
import styles from "./page.module.sass";
import { useEffect } from "react";

export const BodyOverlay = () => {
  const { transitionOut } = useTransition();

  useEffect(() => {
    if (!transitionOut) return;
    const main =
      document.querySelector(`main${styles.main}`) ??
      document.querySelector("main");
    if (!main) return;
    main.classList.add(styles.hide);
  }, [transitionOut]);

  const c = cnl(styles.hide, transitionOut);

  return <div className={c(styles.bodyOverlay)} />;
};
