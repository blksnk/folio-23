import { useCallback, useEffect } from "react";

export type ArrowDirection = "up" | "down" | "left" | "right";

interface Listeners {
  onArrow?: (dir: ArrowDirection) => void;
  onBack?: () => void;
  onConfirm?: () => void;
  onKey?: (key: string) => void;
}

export const useKeyboardInput = ({
  onArrow,
  onConfirm,
  onBack,
  onKey,
}: Listeners = {}) => {
  const onKeyInput = useCallback(
    (e: KeyboardEvent) => {
      onKey && onKey(e.key.toLowerCase());
      switch (e.code) {
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
        case "ArrowUp":
          const dir = e.key.slice(5).toLowerCase() as ArrowDirection;
          onArrow && onArrow(dir);
          break;
        case "Space":
        case "Enter":
          onConfirm && onConfirm();
          break;
        case "Backspace":
        case "Escape":
          onBack && onBack();
      }
    },
    [onArrow, onConfirm, onBack, onKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyInput);

    return () => window.removeEventListener("keydown", onKeyInput);
  }, [onKeyInput]);
};
