import { useEffect } from "react";

export function onPointerMove(e: PointerEvent) {
  const { clientX, clientY } = e;
  setPointerCssVars(clientX, clientY)
}

function setPointerCssVars(x: number, y: number) {
  if(!document?.documentElement) return; // guard again server side usage
  document.documentElement.style.setProperty('--mouse-x', x + "px")
  document.documentElement.style.setProperty('--mouse-y', y + "px")
}

function showPointer() {
  if(!document?.documentElement) return; // guard again server side usage
  document.documentElement.classList.add('show-pointer')
}

export const useSetMousePos = () => {
  useEffect(() => {
    if(!window) return
    window.addEventListener('pointermove', onPointerMove)

    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])
}