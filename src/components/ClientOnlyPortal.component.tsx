"use client"

import React, {
  useRef,
  useEffect,
  useState,
  ReactNode
} from 'react'
import { createPortal } from 'react-dom'

interface ClientOnlyPortalProps {
  children: ReactNode
  selector: string;
}

export default function ClientOnlyPortal({ children, selector }: ClientOnlyPortalProps ) {
  const ref = useRef<Element | null>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}