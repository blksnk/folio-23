"use client";

import { cnl } from "@/utils/css";
import { useTransition } from "@/utils/transition";
import s from "./Overlay.module.sass";
import { LineGroup } from "@/components/Lines/LineGroup";

export const Overlay = () => {
  const { transitionOut } = useTransition();
  const l = cnl(s.hideLine, transitionOut);
  return (
    <>
      <div className={l(s.lineTop)} />
      <div className={l(s.lineBottom)} />
      <div className={l(s.lineAcrossLeft)} />
      <div className={l(s.lineAcrossRight)} />
      <div className={l(s.leftContentLeftLine)}></div>
      <div className={l(s.leftContentRightLine)}></div>
      <div className={l(s.leftVerticalLines)}>
        <LineGroup
          count={10}
          direction="horizontal"
          spacing={{ from: 12, to: 6 }}
        />
      </div>
      <div className={l(s.lineRight)} />
      <div className={l(s.lineFarRight)} />
      <div className={l(s.lineBottomRight)} />
    </>
  );
};
