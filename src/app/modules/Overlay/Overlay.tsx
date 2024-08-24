"use client";

import styles from "./Overlay.module.sass";
import { LineGroup } from "@/components/Lines/LineGroup";
import { Logo } from "@/components/Logo.component";
import { cn, cnl } from "@/utils/css";
import { useTransition } from "@/utils/transition";
import Link from "next/link";

export const Overlay = () => {
  const { transitionOut } = useTransition();
  const l = cnl(styles.hideLine, transitionOut);
  return (
    <>
      <div className={l(styles.linesCenter)}>
        <LineGroup
          count={14}
          spacing={{ from: 12, to: 4 }}
          direction="vertical"
        />
      </div>
      <div className={l(styles.linesRight)}>
        <LineGroup
          count={14}
          spacing={{ from: 4, to: 12 }}
          direction="vertical"
        />
      </div>
      <div className={l(styles.lineLeft)} />
      <div className={l(styles.lineThird)} />
      <div className={l(styles.linesTop)} />
      <div className={l(styles.lineTop)} />
      <div className={l(styles.lineBottom)} />
      <div className={l(styles.lineAcross)} />
      <div className={l(styles.linesBottomLeft)}>
        <LineGroup count={10} spacing={14} direction="horizontal" />
      </div>
      <div className={l(styles.lineTopCenter)} />
      <div className={l(styles.lineBottomRight)} />
      <div className={l(styles.linesCenterLeft)}>
        <LineGroup count={3} spacing={6} direction="horizontal" />
      </div>
      <div className={l(styles.lineBannerLeft)} />
      <div className={l(styles.lineBannerRight)} />
      <div className={l(styles.lineBannerTop)} />
      <div className={l(styles.lineListEnd)} />
      <Link
        href="/"
        className={cn(styles.logoContainer, [styles.hide, transitionOut])}
      >
        <Logo />
      </Link>
    </>
  );
};
