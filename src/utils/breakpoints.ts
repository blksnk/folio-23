"use client"

import variables from "@/app/variables.module.sass";

const tablet = Number(parseInt(variables.breakpointTablet))
const mobile = Number(parseInt(variables.breakpointMobile))

export default {
  tablet,
  mobile,
}

export const isServer = typeof window === "undefined"

const w = isServer ? { innerWidth: 1200, innerHeight: 1200 } : window;

export const isMobile = () => w.innerWidth <= mobile;
export const isTablet = () => w.innerWidth <= tablet;

export const isVertical = () => w.innerWidth < w.innerHeight;

export const breakpoints = {
  isMobile,
  isTablet,
  isVertical,
}