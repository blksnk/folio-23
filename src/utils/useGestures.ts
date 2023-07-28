"use client"

import { useEffect, useRef } from "react";
import GestureHandler, { GestureHandlerOptions } from "@/utils/gestures";

export const useGestures = (options: GestureHandlerOptions) => {
  const gestureHandler = useRef<GestureHandler>()

  useEffect(() => {
    if(typeof window !== "undefined" && !gestureHandler.current) {
      console.log('runs')
      gestureHandler.current  = new GestureHandler(options);
    }
    return () => {
      if(gestureHandler.current) {
        gestureHandler.current?.destroy()
      }
    }
  }, [options])


  return gestureHandler.current;
}