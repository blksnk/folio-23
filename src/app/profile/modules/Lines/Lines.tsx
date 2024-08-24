"use client";

import { useTransition } from "@/utils/transition";
import styles from "./Lines.module.sass";
import { cnl } from "@/utils/css";
import { LineGroup } from "@/components/Lines/LineGroup";

export const Lines = () => {
  const { transitionOut } = useTransition();
  const l = cnl(styles.hideLine, transitionOut);
  return (
    <>
      <div className={l(styles.lineBannerLeft)} />
      <div className={l(styles.lineBannerTop)} />
      <div className={l(styles.lineBannerBottom)} />
      <div className={l(styles.lineBannerRight)} />

      <div className={l(styles.lineFarLeft)} />
      <div className={l(styles.lineLeft)} />

      <div className={l(styles.lineCenter)} />

      <div className={l(styles.linesRight)}>
        <LineGroup
          count={14}
          spacing={{ from: 4, to: 12 }}
          direction="vertical"
        />
      </div>
      <div className={l(styles.lineRight)} />
      <div className={l(styles.lineRightSmall)} />
      <div className={l(styles.lineFarRight)} />

      <div className={l(styles.lineBottom)} />
      <div className={l(styles.lineTop)} />

      <div className={l(styles.lineAcross)} />
    </>
  );
};
