import { useCallback, useEffect } from "react";

export type ArrowDirection = "up" | "down" | "left" | "right";


interface Listeners {
  onArrow?: (dir: ArrowDirection) => void;
  onBack?: () => void;
  onConfirm?: () => void;
}

export const useKeyboardInput = ({ onArrow, onConfirm, onBack }: Listeners = {}) => {
  const onKey = useCallback((e: KeyboardEvent) => {
    switch(e.code) {
      case "ArrowRight":
      case "ArrowLeft":
      case "ArrowDown":
      case "ArrowUp":
        const dir = e.key.slice(5).toLowerCase() as ArrowDirection
        console.log(dir)
        onArrow && onArrow(dir);
        break
      case "Space":
      case "Enter":
        onConfirm && onConfirm();
        break
      case "Backspace":
      case "Escape":
        onBack && onBack();
    }
  }, [onArrow, onConfirm, onBack])

  useEffect(() => {
    window.addEventListener("keydown", onKey)

    return () => window.removeEventListener("keydown", onKey)
  }, [ onKey ])
}