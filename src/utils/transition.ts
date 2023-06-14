import { useState } from "react";
import { useRouter } from "next/navigation";

export const useTransition = () => {
  const [transitionOut, setTransitionOut] = useState(false)
  const router = useRouter()
  const redirectTo = (url: string) => {
    setTransitionOut(true)
    setTimeout(() => router.push(url), 1200)
  }

  return {
    transitionOut,
    redirectTo,
    setTransitionOut,
  }
}