"use client";

import { lerp } from "@/utils/math";
import { useCallback, useEffect, useRef } from "react";

const LERP_COEF = 0.05;

export function onPointerMove(e: PointerEvent) {
  const { clientX, clientY } = e;
  setPointerCssVars(clientX, clientY);

  return { clientX, clientY };
}

function setPointerCssVars(x: number, y: number) {
  if (!document?.documentElement || !window) return; // guard again server side usage

  document.documentElement.style.setProperty("--mouse-x", `${x}px`);
  document.documentElement.style.setProperty("--mouse-y", `${y}px`);
  const { innerWidth, innerHeight } = window;
  const normalizedX = (x / innerWidth) * 2 - 1;
  const normalizedY = (y / innerHeight) * 2 - 1;
  document.documentElement.style.setProperty(
    "--mouse-normalized-x",
    String(normalizedX)
  );
  document.documentElement.style.setProperty(
    "--mouse-normalized-y",
    String(normalizedY)
  );
}

export const useSetMousePos = () => {
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const frameId = useRef<number>(0);

  const updateTargetPos = useCallback((e: PointerEvent) => {
    const { clientX, clientY } = e;
    targetPos.current = { x: clientX, y: clientY };
  }, []);

  const onFrame = useCallback<FrameRequestCallback>((time) => {
    const x = lerp(currentPos.current.x, targetPos.current.x, LERP_COEF);
    const y = lerp(currentPos.current.y, targetPos.current.y, LERP_COEF);
    currentPos.current = { x, y };
    setPointerCssVars(currentPos.current.x, currentPos.current.y);
    frameId.current = window.requestAnimationFrame(onFrame);
  }, []);

  useEffect(() => {
    if (!window) return;
    frameId.current = window.requestAnimationFrame(onFrame);

    return () => window.cancelAnimationFrame(frameId.current);
  }, []);

  useEffect(() => {
    if (!window) return;
    window.addEventListener("pointermove", updateTargetPos);

    return () => window.removeEventListener("pointermove", updateTargetPos);
  }, []);
};
